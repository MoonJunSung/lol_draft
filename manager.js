// ===== LOL DRAFT · 감독 모드 (리그 시즌 시뮬레이터) =====
// 연도별 선수 데이터로 리그 팀을 구성하고, 정규시즌 + 플레이오프를 자동 시뮬레이션한다.

'use strict';

const POSITIONS = ['top', 'jungle', 'mid', 'adc', 'support'];
const AVAILABLE_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

// 메이저 리그 우선 노출
const MAJOR_LEAGUES = ['LCK', 'LPL', 'LEC', 'LCS'];
const LEAGUE_BASE = { LCK: 12, LPL: 11, LEC: 6, LCS: 4, PCS: 2, VCS: 1 };

// ---- 상태 ----
const state = {
    year: null,
    league: null,
    teams: [],          // {name, league, roster, rating}
    matches: [],        // 평면 일정: [{round, home, away, played, hs, as, sets}]
    totalRounds: 0,
    cursor: 0,          // 다음에 진행할 정규시즌 경기 index
    phase: 'setup',     // setup | regular | playoffs | done
    playoffs: null,     // {rounds:[[match,...]], roundIdx}
    rawData: {},        // 연도별 로드 캐시
};

// ---- 유틸 ----
function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
}
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function loadYear(year) {
    if (state.rawData[year]) return state.rawData[year];
    const res = await fetch(`players_${year}_final.json`);
    if (!res.ok) throw new Error(`데이터 로드 실패: ${year}`);
    const data = await res.json();
    state.rawData[year] = data;
    return data;
}

// ---- 팀 구성 ----
// 각 포지션마다 대표 선수(월즈 우승 많은 순, 동률이면 첫 등장)를 1명 선택.
function buildTeams(data, league) {
    const teamMap = new Map();
    POSITIONS.forEach((pos) => {
        (data[pos] || []).forEach((p) => {
            if (p.league !== league) return;
            if (!teamMap.has(p.team)) teamMap.set(p.team, { name: p.team, league, roster: {} });
            const team = teamMap.get(p.team);
            const cur = team.roster[pos];
            if (!cur || (p.worldsWins || 0) > (cur.worldsWins || 0)) team.roster[pos] = p;
        });
    });

    const teams = [];
    teamMap.forEach((team) => {
        const filled = POSITIONS.filter((pos) => team.roster[pos]).length;
        if (filled < 3) return; // 최소 3포지션 이상 채워진 팀만
        team.rating = computeRating(team);
        teams.push(team);
    });
    return teams;
}

// 팀 전력: 리그 기본치 + 팀 고유 편차(이름 해시로 안정적) + 로스터 월즈 우승 보너스 + 완성도
function computeRating(team) {
    const base = 46 + (LEAGUE_BASE[team.league] || 0);
    const seed = hashStr(team.name + '|' + state.year) % 23; // 0~22, 같은 팀/연도면 동일
    let worldsBonus = 0, filled = 0;
    POSITIONS.forEach((pos) => {
        const p = team.roster[pos];
        if (!p) return;
        filled++;
        worldsBonus += Math.min((p.worldsWins || 0) * 6, 18);
    });
    const completeness = (filled / POSITIONS.length) * 6;
    return Math.round(clamp(base + seed + worldsBonus / 2 + completeness, 30, 99));
}

function teamByName(name) {
    return state.teams.find((t) => t.name === name);
}

// ---- 경기 시뮬 ----
function gameWinProb(a, b) {
    return 1 / (1 + Math.pow(10, (b - a) / 22));
}

// Bo3(정규) / Bo5(플옵). 결과 {hs, as, sets}
function simMatch(home, away, bestOf) {
    const need = bestOf === 5 ? 3 : 2;
    const hForm = home.rating + rand(-9, 9) + 1.5; // 살짝의 홈 어드밴티지
    const aForm = away.rating + rand(-9, 9);
    let hs = 0, as = 0;
    const sets = [];
    while (hs < need && as < need) {
        const p = gameWinProb(hForm + rand(-4, 4), aForm + rand(-4, 4));
        if (Math.random() < p) { hs++; sets.push('H'); }
        else { as++; sets.push('A'); }
    }
    return { hs, as, sets };
}

// ---- 일정 (싱글 라운드로빈, 라운드 번호 부여한 평면 배열) ----
function buildSchedule(teams) {
    const list = teams.map((t) => t.name);
    if (list.length % 2 === 1) list.push(null); // bye
    const n = list.length;
    const half = n / 2;
    const matches = [];
    let arr = list.slice();
    for (let r = 0; r < n - 1; r++) {
        for (let i = 0; i < half; i++) {
            const a = arr[i], b = arr[n - 1 - i];
            if (a !== null && b !== null) {
                matches.push({ round: r, home: a, away: b, played: false, hs: 0, as: 0, sets: [] });
            }
        }
        arr = [arr[0], arr[n - 1], ...arr.slice(1, n - 1)]; // 첫 요소 고정 회전
    }
    state.totalRounds = n - 1;
    return matches;
}

// ---- 순위 ----
function computeStandings() {
    const table = new Map();
    state.teams.forEach((t) => table.set(t.name, { name: t.name, w: 0, l: 0, sw: 0, sl: 0, rating: t.rating }));
    state.matches.forEach((m) => {
        if (!m.played) return;
        const H = table.get(m.home), A = table.get(m.away);
        H.sw += m.hs; H.sl += m.as; A.sw += m.as; A.sl += m.hs;
        if (m.hs > m.as) { H.w++; A.l++; } else { A.w++; H.l++; }
    });
    const rows = [...table.values()];
    rows.sort((a, b) => (b.w - a.w) || ((b.sw - b.sl) - (a.sw - a.sl)) || (b.rating - a.rating));
    return rows;
}

function playoffSlots() {
    const n = state.teams.length;
    if (n >= 8) return 6;
    if (n >= 4) return 4;
    return Math.max(2, n);
}

// ===== 렌더링 =====
function renderTeamPreview() {
    const wrap = $('teamPreview');
    if (!state.teams.length) {
        wrap.innerHTML = '<p class="setup-hint">이 리그에는 시뮬 가능한 팀이 없습니다. 다른 리그/연도를 골라보세요.</p>';
        return;
    }
    const sorted = [...state.teams].sort((a, b) => b.rating - a.rating);
    wrap.innerHTML = `<h3 class="section-h">참가 팀 · ${state.teams.length}팀</h3>` +
        '<div class="preview-grid">' +
        sorted.map((t) => `
            <div class="preview-team">
                <div class="pt-head">
                    <span class="pt-name">${escapeHtml(t.name)}</span>
                    <span class="pt-rating">${t.rating}</span>
                </div>
                <div class="pt-roster">${renderRosterLine(t)}</div>
            </div>`).join('') +
        '</div>';
}

function renderRosterLine(team) {
    return POSITIONS.map((pos) => {
        const p = team.roster[pos];
        return `<span class="pt-slot"><b>${pos.toUpperCase().slice(0, 3)}</b> ${p ? escapeHtml(p.name) : '—'}</span>`;
    }).join('');
}

function renderStandings() {
    const rows = computeStandings();
    const maxR = Math.max(...state.teams.map((t) => t.rating));
    const cutoff = playoffSlots();
    $('standingsBody').innerHTML = rows.map((r, i) => {
        const pct = Math.round((r.rating / maxR) * 100);
        return `<tr class="${i < cutoff ? 'po-line' : ''}">
            <td class="rank">${i + 1}</td>
            <td class="ta-l team-cell">${escapeHtml(r.name)}${i < cutoff ? '<span class="po-tag">PO</span>' : ''}</td>
            <td>${r.w}</td>
            <td>${r.l}</td>
            <td class="muted">${r.sw}-${r.sl}</td>
            <td><span class="rbar"><span class="rbar-fill" style="width:${pct}%"></span></span>${r.rating}</td>
        </tr>`;
    }).join('');
}

function pushFeed(match, bestOf) {
    const feed = $('matchFeed');
    const homeWin = match.hs > match.as;
    const setStr = match.sets.map((s) => (s === 'H' ? '🔵' : '🔴')).join('');
    const el = document.createElement('div');
    el.className = 'feed-item just-in';
    el.innerHTML = `
        <div class="feed-teams">
            <span class="ft ${homeWin ? 'win' : ''}">${escapeHtml(match.home)}</span>
            <span class="ft-score">${match.hs} : ${match.as}</span>
            <span class="ft ${!homeWin ? 'win' : ''}">${escapeHtml(match.away)}</span>
        </div>
        <div class="feed-sub">${bestOf === 5 ? 'Bo5' : 'Bo3'} · ${setStr}</div>`;
    feed.insertBefore(el, feed.firstChild);
    while (feed.children.length > 40) feed.removeChild(feed.lastChild);
    requestAnimationFrame(() => el.classList.remove('just-in'));
}

function updateProgress() {
    if (state.phase === 'regular') {
        $('phaseLabel').textContent = '정규시즌';
        const cur = state.cursor < state.matches.length ? state.matches[state.cursor].round + 1 : state.totalRounds;
        $('progressLabel').textContent = `라운드 ${cur} / ${state.totalRounds}`;
    } else if (state.phase === 'playoffs') {
        $('phaseLabel').textContent = '플레이오프';
        const total = state.playoffs.rounds.length;
        $('progressLabel').textContent = `플옵 라운드 ${state.playoffs.roundIdx + 1} / 진행 중`;
    } else if (state.phase === 'done') {
        $('phaseLabel').textContent = '시즌 종료';
    }
}

// ===== 진행 로직 =====

// 정규시즌 경기 1개 진행. 없으면 false
function playNextRegularMatch() {
    if (state.cursor >= state.matches.length) return false;
    const m = state.matches[state.cursor];
    Object.assign(m, simMatch(teamByName(m.home), teamByName(m.away), 3), { played: true });
    state.cursor++;
    pushFeed(m, 3);
    renderStandings();
    updateProgress();
    return true;
}

// ---- 플레이오프 ----
function startPlayoffs() {
    state.phase = 'playoffs';
    const rows = computeStandings();
    const seeds = rows.slice(0, playoffSlots()).map((r) => r.name);
    let bracketSize = 1;
    while (bracketSize < seeds.length) bracketSize *= 2;
    const pattern = seedPattern(bracketSize);
    const firstRound = [];
    for (let i = 0; i < pattern.length; i += 2) {
        const a = pattern[i] <= seeds.length ? seeds[pattern[i] - 1] : null;
        const b = pattern[i + 1] <= seeds.length ? seeds[pattern[i + 1] - 1] : null;
        firstRound.push({ home: a, away: b, played: false, hs: 0, as: 0, sets: [], bye: (a === null || b === null) });
    }
    state.playoffs = { rounds: [firstRound], roundIdx: 0 };
    resolveByes(firstRound);
    $('playoffsWrap').hidden = false;
    updateProgress();
    renderBracket();
}

function resolveByes(round) {
    round.forEach((m) => {
        if (m.bye && !m.played) { m.winner = m.home || m.away; m.played = true; }
    });
}

// 표준 토너먼트 시드 순서 (1-based, size는 2^n)
function seedPattern(size) {
    let cur = [1, 2];
    while (cur.length < size) {
        const sum = cur.length * 2 + 1;
        const expanded = [];
        for (let i = 0; i < cur.length; i++) {
            expanded.push(cur[i], sum - cur[i]);
        }
        cur = expanded;
    }
    return cur;
}

// 플옵 한 스텝: 'played' | 'advanced' | 'done'
function stepPlayoffs() {
    const po = state.playoffs;
    const round = po.rounds[po.roundIdx];
    const m = round.find((x) => !x.played);
    if (m) {
        Object.assign(m, simMatch(teamByName(m.home), teamByName(m.away), 5));
        m.played = true;
        m.winner = m.hs > m.as ? m.home : m.away;
        pushFeed(m, 5);
        renderBracket();
        updateProgress();
        return 'played';
    }
    // 라운드 종료
    const winners = round.map((x) => x.winner);
    if (winners.length === 1) { finishSeason(winners[0]); return 'done'; }
    const next = [];
    for (let i = 0; i < winners.length; i += 2) {
        next.push({ home: winners[i], away: winners[i + 1], played: false, hs: 0, as: 0, sets: [] });
    }
    po.rounds.push(next);
    po.roundIdx++;
    resolveByes(next);
    renderBracket();
    updateProgress();
    return 'advanced';
}

function renderBracket() {
    const po = state.playoffs;
    const total = po.rounds.length;
    $('bracket').innerHTML = po.rounds.map((round, ri) => {
        const remain = total - ri;
        const title = remain === 1 ? '결승' : (remain === 2 ? '4강' : `${Math.pow(2, remain)}강`);
        return `<div class="br-col">
            <div class="br-title">${title}</div>
            ${round.map((m) => renderBracketMatch(m)).join('')}
        </div>`;
    }).join('');
}

function renderBracketMatch(m) {
    if (m.bye) {
        return `<div class="br-match bye"><span class="brm-team win">${escapeHtml(m.winner || '?')}</span><span class="brm-team dim">부전승</span></div>`;
    }
    const done = m.played;
    const hw = done && m.winner === m.home;
    const aw = done && m.winner === m.away;
    return `<div class="br-match">
        <span class="brm-team ${hw ? 'win' : ''}">${escapeHtml(m.home || '?')} <b>${done ? m.hs : ''}</b></span>
        <span class="brm-team ${aw ? 'win' : ''}">${escapeHtml(m.away || '?')} <b>${done ? m.as : ''}</b></span>
    </div>`;
}

function finishSeason(champName) {
    state.phase = 'done';
    const team = teamByName(champName);
    $('champEyebrow').textContent = `${state.league} ${state.year} 시즌 우승`;
    $('champName').textContent = champName;
    $('champRoster').innerHTML = POSITIONS.map((pos) => {
        const p = team && team.roster[pos];
        return `<div class="cr-slot"><span class="cr-pos">${pos.toUpperCase().slice(0, 3)}</span><span class="cr-player">${p ? escapeHtml(p.name) : '—'}</span></div>`;
    }).join('');
    $('champOverlay').hidden = false;
    updateProgress();
    updateControls();
}

// ---- 컨트롤 ----
function updateControls() {
    const done = state.phase === 'done';
    ['nextMatchBtn', 'nextRoundBtn', 'simAllBtn'].forEach((id) => { $(id).disabled = done; });
    if (done) $('nextMatchBtn').textContent = '시즌 종료';
}

// 경기 1개
function onNextMatch() {
    if (state.phase === 'regular') {
        if (!playNextRegularMatch()) { startPlayoffs(); onNextMatch(); }
    } else if (state.phase === 'playoffs') {
        let r;
        do { r = stepPlayoffs(); } while (r === 'advanced'); // 라운드 넘어가면 바로 첫 경기까지
    }
    updateControls();
}

// 현재 라운드 전부
function onNextRound() {
    if (state.phase === 'regular') {
        if (state.cursor >= state.matches.length) { startPlayoffs(); updateControls(); return; }
        const target = state.matches[state.cursor].round;
        while (state.cursor < state.matches.length && state.matches[state.cursor].round === target) {
            playNextRegularMatch();
        }
        if (state.cursor >= state.matches.length) startPlayoffs();
    } else if (state.phase === 'playoffs') {
        const target = state.playoffs.roundIdx;
        let r;
        do { r = stepPlayoffs(); } while (r === 'played' && state.playoffs.roundIdx === target);
    }
    updateControls();
}

// 끝까지
function onSimAll() {
    let guard = 0;
    while (state.phase !== 'done' && guard++ < 5000) {
        if (state.phase === 'regular') {
            if (!playNextRegularMatch()) startPlayoffs();
        } else if (state.phase === 'playoffs') {
            stepPlayoffs();
        }
    }
    updateControls();
}

// ===== 시즌 시작/재시작 =====
async function startSeason() {
    const year = Number($('yearSelect').value);
    const league = $('leagueSelect').value;
    if (!league) return;
    state.year = year;
    state.league = league;
    const data = await loadYear(year);
    state.teams = buildTeams(data, league);
    if (state.teams.length < 4) {
        $('setupHint').textContent = '이 리그는 팀이 부족해 시뮬할 수 없습니다. 다른 리그/연도를 골라주세요.';
        renderTeamPreview();
        return;
    }
    state.matches = buildSchedule(state.teams);
    state.cursor = 0;
    state.phase = 'regular';
    state.playoffs = null;

    $('setupPanel').hidden = true;
    $('seasonPanel').hidden = false;
    $('playoffsWrap').hidden = true;
    $('matchFeed').innerHTML = '';
    $('champOverlay').hidden = true;
    $('seasonBadge').textContent = `${league} ${year}`;
    $('nextMatchBtn').textContent = '▶ 다음 경기';
    renderStandings();
    updateProgress();
    updateControls();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restart() {
    state.phase = 'setup';
    $('champOverlay').hidden = true;
    $('seasonPanel').hidden = true;
    $('setupPanel').hidden = false;
    populateLeagues();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 셋업 UI =====
async function populateLeagues() {
    const year = Number($('yearSelect').value);
    const sel = $('leagueSelect');
    sel.innerHTML = '<option value="">불러오는 중…</option>';
    try {
        const data = await loadYear(year);
        const counts = {};
        POSITIONS.forEach((pos) => {
            (data[pos] || []).forEach((p) => {
                (counts[p.league] = counts[p.league] || new Set()).add(p.team);
            });
        });
        const leagues = Object.keys(counts).filter((lg) => counts[lg].size >= 4);
        leagues.sort((a, b) => {
            const ia = MAJOR_LEAGUES.indexOf(a), ib = MAJOR_LEAGUES.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
        });
        if (!leagues.length) {
            sel.innerHTML = '<option value="">가능한 리그 없음</option>';
            $('setupHint').textContent = '이 연도에는 시뮬 가능한 리그가 없습니다.';
            $('teamPreview').innerHTML = '';
            return;
        }
        sel.innerHTML = leagues.map((lg) => `<option value="${lg}">${lg} · ${counts[lg].size}팀</option>`).join('');
        $('setupHint').textContent = '리그를 고르고 "시즌 시작"을 누르세요. 전력은 데이터 기반 + 랜덤 보정입니다.';
        previewSelected();
    } catch (e) {
        sel.innerHTML = '<option value="">로드 실패</option>';
        $('setupHint').textContent = '데이터를 불러오지 못했습니다. 로컬 서버로 열었는지 확인하세요.';
    }
}

async function previewSelected() {
    const year = Number($('yearSelect').value);
    const league = $('leagueSelect').value;
    if (!league) return;
    const data = await loadYear(year);
    state.year = year;
    state.teams = buildTeams(data, league);
    renderTeamPreview();
}

// ===== 초기화 =====
function init() {
    const ySel = $('yearSelect');
    ySel.innerHTML = AVAILABLE_YEARS.map((y) => `<option value="${y}">${y}</option>`).join('');
    ySel.value = 2025;

    ySel.addEventListener('change', populateLeagues);
    $('leagueSelect').addEventListener('change', previewSelected);
    $('startSeasonBtn').addEventListener('click', startSeason);
    $('nextMatchBtn').addEventListener('click', onNextMatch);
    $('nextRoundBtn').addEventListener('click', onNextRound);
    $('simAllBtn').addEventListener('click', onSimAll);
    $('restartBtn').addEventListener('click', restart);
    $('champRestartBtn').addEventListener('click', restart);

    populateLeagues();
}

document.addEventListener('DOMContentLoaded', init);
