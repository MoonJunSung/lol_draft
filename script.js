// LCK Legends Draft - Main Script

let players = {
    top: [],
    jungle: [],
    mid: [],
    adc: [],
    support: []
};
let currentYear = null;
const availableYears = [
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
];

const teamColors = {
    'T1': '#e10600',
    'SKT T1': '#e10600',
    'Gen.G': '#b4995a',
    'GENG': '#b4995a',
    'DAMWON Gaming': '#1a51ff',
    'DWG KIA': '#1a51ff',
    'KT Rolster': '#e01b22',
    'Hanwha Life': '#f37021',
    'HLE': '#f37021',
    'DRX': '#1a4cff',
    'Samsung Galaxy': '#0f5fbf',
    'ROX Tigers': '#ffcc00',
    'Fnatic': '#f5a100',
    'G2 Esports': '#c0392b',
    'Cloud9': '#36a9ff',
    'TSM': '#000000',
    'Team Liquid': '#0a74da',
    'Evil Geniuses': '#1c1c1c',
    'MAD Lions': '#f59e0b',
    'Rogue': '#1c64f2',
    'EDward Gaming': '#0f172a',
    'EDG': '#0f172a',
    'RNG': '#b91c1c',
    'Royal Never Give Up': '#b91c1c',
    'LGD': '#d97706',
    'IG': '#111827',
    'Invictus Gaming': '#111827',
    'JDG': '#fbbf24',
    'LNG': '#10b981',
    'Weibo Gaming': '#ef4444'
};

// 현재 선택된 로스터
let currentRoster = {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null
};

// 현재 선택 중인 포지션
let currentPosition = null;

// 포지션 한글명
const positionNames = {
    top: '탑',
    jungle: '정글',
    mid: '미드',
    adc: 'ADC',
    support: '서포터'
};

// 시즌 뽑기 상태
let currentSeason = 'S12';

// 국가/리그 표시용 매핑
const countryMap = {
    KR: { name: 'South Korea', flag: '🇰🇷' },
    CN: { name: 'China', flag: '🇨🇳' },
    DK: { name: 'Denmark', flag: '🇩🇰' },
    US: { name: 'United States', flag: '🇺🇸' },
    EU: { name: 'Europe', flag: '🇪🇺' },
    JP: { name: 'Japan', flag: '🇯🇵' },
    TW: { name: 'Taiwan', flag: '🇹🇼' },
    VN: { name: 'Vietnam', flag: '🇻🇳' },
    BR: { name: 'Brazil', flag: '🇧🇷' },
    TR: { name: 'Türkiye', flag: '🇹🇷' },
    AU: { name: 'Australia', flag: '🇦🇺' },
    RU: { name: 'Russia', flag: '🇷🇺' }
};

const nationalityAliases = {
    'KOREA': 'KR',
    'SOUTH KOREA': 'KR',
    'KOREA, REPUBLIC OF': 'KR',
    'CHINA': 'CN',
    'PEOPLE\'S REPUBLIC OF CHINA': 'CN',
    'DENMARK': 'DK',
    'UNITED STATES': 'US',
    'USA': 'US',
    'JAPAN': 'JP',
    'TAIWAN': 'TW',
    'VIETNAM': 'VN',
    'BRAZIL': 'BR',
    'TURKEY': 'TR',
    'TÜRKIYE': 'TR',
    'AUSTRALIA': 'AU',
    'RUSSIA': 'RU',
    'EUROPE': 'EU'
};

const leagueMap = {
    LCK: 'LCK',
    LPL: 'LPL',
    LEC: 'LEC',
    LCS: 'LCS',
    'KR SoloQ': 'KR SOLOQ',
    'EU LCS': 'EU LCS',
    'NA LCS': 'NA LCS'
};

const leagueRegionMap = {
    LCK: 'KR',
    LPL: 'CN',
    LEC: 'EU',
    'EU LCS': 'EU',
    LCS: 'US',
    'NA LCS': 'US',
    LJL: 'JP',
    VCS: 'VN',
    CBLOL: 'BR',
    TCL: 'TR',
    LCO: 'AU',
    PCS: 'TW',
    LMS: 'TW'
};

// 리빌 시퀀스 제어
let revealTimers = [];
let revealActive = false;
let pendingRevealPick = null;

// 시즌별 플레이어 집계
function getPlayersBySeason(seasonKey) {
    return Object.entries(players).flatMap(([pos, list]) =>
        list
            .filter(p => Array.isArray(p.seasons) && p.seasons.includes(seasonKey))
            .map(p => ({ ...p, position: pos }))
    );
}

async function loadPlayersForYear(year) {
    try {
        const response = await fetch(`players_${year}_final.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        players = {
            top: data.top || [],
            jungle: data.jungle || [],
            mid: data.mid || [],
            adc: data.adc || [],
            support: data.support || []
        };
        currentYear = year;
        resetRoster();
        showToast(`${year} 데이터 로드 완료`);
    } catch (error) {
        console.error(error);
        showToast(`${year} 데이터 로드 실패`);
    }
}

async function loadAllPlayers() {
    try {
        const results = await Promise.all(
            availableYears.map(async (year) => {
                try {
                    const response = await fetch(`players_${year}_final.json`);
                    if (!response.ok) return null;
                    const data = await response.json();
                    return data;
                } catch {
                    return null;
                }
            })
        );

        players = {
            top: [],
            jungle: [],
            mid: [],
            adc: [],
            support: []
        };

        results.filter(Boolean).forEach((data) => {
            players.top.push(...(data.top || []));
            players.jungle.push(...(data.jungle || []));
            players.mid.push(...(data.mid || []));
            players.adc.push(...(data.adc || []));
            players.support.push(...(data.support || []));
        });

        currentYear = null;
        resetRoster();
        showToast('전체 시즌 데이터 로드 완료');
    } catch (error) {
        console.error(error);
        showToast('전체 시즌 데이터 로드 실패');
    }
}

function seasonKeyToYear(seasonKey) {
    if (!seasonKey) return '';
    const match = seasonKey.match(/S(\d+)/i);
    if (!match) return '';
    const seasonNum = Number(match[1]);
    if (Number.isNaN(seasonNum)) return '';
    return String(2010 + seasonNum);
}

function resolveCardYear(player) {
    if (!player) return '';
    if (Array.isArray(player.seasons) && player.seasons.length) {
        const fromSeason = seasonKeyToYear(player.seasons[player.seasons.length - 1]);
        if (fromSeason) return fromSeason;
    }
    if (player.years) {
        const match = String(player.years).match(/(19|20)\d{2}/);
        if (match) return match[0];
    }
    const combined = `${player.seasonTeam || ''} ${player.team || ''}`;
    const match = combined.match(/(19|20)\d{2}/);
    if (match) return match[0];
    return currentYear ? String(currentYear) : '';
}

function cleanTeamName(teamName) {
    if (!teamName) return '';
    return teamName.replace(/\s*\((S\d+|\d{4})\)\s*/gi, '').trim();
}

function normalizeNationality(value) {
    if (!value) return { name: '-', flag: '🏳️' };
    const raw = String(value).trim();
    const upper = raw.toUpperCase();
    const alias = nationalityAliases[upper];
    const code = alias || (upper.length <= 3 ? upper : null);
    if (code && countryMap[code]) return countryMap[code];
    return { name: raw, flag: '🏳️' };
}

function resolveNationality(player) {
    if (!player) return { name: '-', flag: '🏳️' };
    if (player.nationality) {
        const normalized = normalizeNationality(player.nationality);
        if (normalized.name !== '-') return normalized;
    }
    const leagueCode = leagueRegionMap[player.league];
    if (leagueCode && countryMap[leagueCode]) return countryMap[leagueCode];
    return { name: '-', flag: '🏳️' };
}

function normalizeTeamKey(name) {
    return cleanTeamName(name || '');
}

function hashColor(input) {
    let hash = 0;
    const value = input || '';
    for (let i = 0; i < value.length; i += 1) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 45%)`;
}

function getTeamColor(teamName) {
    const key = normalizeTeamKey(teamName);
    return teamColors[key] || hashColor(key);
}

function weightedPick(list) {
    const weights = list.map((item) => {
        const worldsBoost = Number(item.worldsWins || 0) > 0 ? 3 : 1;
        const league = (item.league || '').toUpperCase();
        const lckBoost = league === 'LCK' ? 3 : 1;
        return worldsBoost * lckBoost;
    });
    const total = weights.reduce((sum, w) => sum + w, 0);
    let roll = Math.random() * total;
    for (let i = 0; i < list.length; i += 1) {
        roll -= weights[i];
        if (roll <= 0) return list[i];
    }
    return list[list.length - 1];
}

// 시즌 랜덤 뽑기
function openSeasonPack(seasonKey) {
    if (seasonKey) currentSeason = seasonKey;
    const season = currentSeason;
    const pool = getPlayersBySeason(season);

    if (!pool.length) {
        showToast(`${season} 시즌 데이터가 없습니다`);
        renderPackResult(null);
        return;
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    renderPackResult(pick);
    startReveal(pick);
}

// 시즌 선택 변경 핸들러
function onSeasonChange(event) {
    const selected = event.target.value;
    currentSeason = selected;
    openSeasonPack();
}

// 시즌 뽑기 결과 렌더링
function renderPackResult(player) {
    const container = document.getElementById('packResult');
    if (!player) {
        container.innerHTML = '<p class="pack-empty">시즌을 선택하고 뽑기를 눌러주세요.</p>';
        return;
    }

    const nation = player.nationality || '-';
    const league = player.league || '-';
    const season = player.seasons ? player.seasons.join(', ') : '-';
    const seasonTeam = player.seasonTeam || player.team || '-';

    container.innerHTML = `
        <div class="pack-card">
            <img class="pack-avatar" src="${player.image}" alt="${player.name}" onerror="this.src='https://via.placeholder.com/120x120/1a1f2e/c9aa71?text=${player.name}'">
            <div>
                <h4 style="margin-bottom:6px; font-size:1.1rem;">${player.name} <span style="color:rgba(255,255,255,0.7); font-weight:400;">(${player.position.toUpperCase()})</span></h4>
                <div class="pack-meta">
                    <div class="meta-item"><span class="meta-label">국적</span><span class="meta-value">${nation}</span></div>
                    <div class="meta-item"><span class="meta-label">리그</span><span class="meta-value">${league}</span></div>
                    <div class="meta-item"><span class="meta-label">시즌</span><span class="meta-value">${season}</span></div>
                    <div class="meta-item"><span class="meta-label">당시 팀</span><span class="meta-value">${seasonTeam}</span></div>
                </div>
            </div>
        </div>
    `;
}

// 리빌 오버레이 데이터 설정
function setRevealContent(player) {
    const nation = resolveNationality(player);
    const league = leagueMap[player.league] || player.league || '-';
    const teamRaw = player.seasonTeam || player.team || '-';
    const team = cleanTeamName(teamRaw) || teamRaw;
    const seasonYear = resolveCardYear(player);
    const teamColor = getTeamColor(team);
    const worldsWins = Number(player.worldsWins || 0);

    document.getElementById('revealFlag').textContent = nation.flag;
    document.getElementById('revealCountryName').textContent = nation.name.toUpperCase();
    document.getElementById('revealLeagueName').textContent = league;
    const revealTeamLogo = document.getElementById('revealTeamLogo');
    if (revealTeamLogo) {
        revealTeamLogo.textContent = cleanTeamName(player.team || '').split(' ')[0] || team;
        revealTeamLogo.style.color = teamColor;
    }
    document.getElementById('revealTeamName').textContent = team;

    const cardElement = document.getElementById('finalCardElement');
    if (cardElement) {
        cardElement.style.setProperty('--team-color', teamColor);
    }
    const cardTeam = document.getElementById('cardTeam');
    if (cardTeam) {
        cardTeam.style.color = teamColor;
    }

    document.getElementById('cardSeason').textContent = seasonYear || '????';
    document.getElementById('cardName').textContent = player.name.toUpperCase();
    document.getElementById('cardLeague').textContent = league;
    document.getElementById('cardTeam').textContent = team;
    document.getElementById('cardFlagSmall').textContent = nation.flag;
    document.getElementById('cardCountry').textContent = nation.name;
    document.getElementById('cardPos').textContent = player.position.toUpperCase();

    const badge = document.getElementById('cardWorldsBadge');
    if (badge) {
        if (worldsWins > 0) {
            badge.textContent = '🏆 월즈 우승자';
            badge.classList.add('show');
            badge.setAttribute('aria-hidden', 'false');
        } else {
            badge.textContent = '';
            badge.classList.remove('show');
            badge.setAttribute('aria-hidden', 'true');
        }
    }

    const trophy = document.getElementById('cardTrophy');
    if (trophy) {
        trophy.style.display = worldsWins > 0 ? 'block' : 'none';
    }
}

function clearRevealTimers() {
    revealTimers.forEach(timer => clearTimeout(timer));
    revealTimers = [];
}

function showRevealStep(stepId) {
    document.querySelectorAll('.reveal-step').forEach(step => step.classList.remove('active'));
    const step = document.getElementById(stepId);
    if (step) step.classList.add('active');
}

// 리빌 시퀀스 시작
function startReveal(player) {
    if (!player) return;
    const overlay = document.getElementById('revealOverlay');
    if (!overlay) return;

    clearRevealTimers();
    setRevealContent(player);
    overlay.classList.add('active');
    revealActive = true;

    showRevealStep('stepCountry');
    revealTimers.push(setTimeout(() => showRevealStep('stepLeague'), 1400));
    revealTimers.push(setTimeout(() => showRevealStep('stepTeam'), 2800));
    revealTimers.push(setTimeout(() => showRevealStep('stepCard'), 4200));
}

// 리빌 닫기
function closeReveal() {
    const overlay = document.getElementById('revealOverlay');
    if (!overlay) return;
    clearRevealTimers();
    overlay.classList.remove('active');
    revealActive = false;
    pendingRevealPick = null;
}

// 포지션별 랜덤 소환
function summonForPosition(position) {
    if (!players[position] || players[position].length === 0) {
        showToast('선수 데이터가 없습니다');
        return;
    }
    const positionPlayers = players[position];
    if (!positionPlayers || !positionPlayers.length) {
        showToast('해당 포지션 데이터가 없습니다');
        return;
    }

    const pick = weightedPick(positionPlayers);
    pendingRevealPick = { ...pick, position };
    startReveal(pendingRevealPick);
}

// 리빌 결과 확정
function confirmRevealPick() {
    if (!pendingRevealPick) {
        closeReveal();
        return;
    }

    const { position } = pendingRevealPick;
    currentRoster[position] = pendingRevealPick;
    updateSlotDisplay(position, pendingRevealPick);
    updateTeamStats();
    showToast(`${pendingRevealPick.name} 선택 완료!`);
    closeReveal();
}

// 모달 열기
function openModal(position) {
    currentPosition = position;
    const modal = document.getElementById('playerModal');
    const modalTitle = document.getElementById('modalTitle');
    const playerGrid = document.getElementById('playerGrid');
    const searchInput = document.getElementById('searchInput');
    
    modalTitle.textContent = `${positionNames[position]} 선수 선택`;
    searchInput.value = '';
    
    // 해당 포지션의 선수 목록 표시
    renderPlayerGrid(players[position]);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('playerModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentPosition = null;
}

// 선수 그리드 렌더링
function renderPlayerGrid(playerList) {
    const playerGrid = document.getElementById('playerGrid');
    playerGrid.innerHTML = '';
    
    playerList.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.onclick = () => selectPlayer(player);
        
        card.innerHTML = `
            <img src="${player.image}" alt="${player.name}" onerror="this.src='https://via.placeholder.com/80x80/1a1f2e/c9aa71?text=${player.name}'">
            <div class="name">${player.name}</div>
            <div class="team">${player.team}</div>
            <div class="championships">🏆 ${player.championships} | 🌍 ${player.worldsWins}</div>
        `;
        
        playerGrid.appendChild(card);
    });
}

// 선수 필터링
function filterPlayers() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase();
    
    if (!currentPosition) return;
    
    const filteredPlayers = players[currentPosition].filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.realName.includes(query) ||
        player.team.toLowerCase().includes(query)
    );
    
    renderPlayerGrid(filteredPlayers);
}

// 선수 선택
function selectPlayer(player) {
    if (!currentPosition) return;
    
    currentRoster[currentPosition] = player;
    updateSlotDisplay(currentPosition, player);
    closeModal();
    updateTeamStats();
    showToast(`${player.name} 선택 완료!`);
}

// 슬롯 디스플레이 업데이트
function updateSlotDisplay(position, player) {
    const slot = document.querySelector(`.position-slot[data-position="${position}"]`);
    const playerDisplay = slot.querySelector('.player-display');
    const assignBtn = slot.querySelector('.assign-btn');
    
    if (player) {
        slot.classList.add('filled');
        const seasonYear = resolveCardYear(player);
        const teamName = cleanTeamName(player.team) || player.team;
        const teamColor = getTeamColor(teamName);
        slot.style.setProperty('--team-color', teamColor);
        playerDisplay.innerHTML = `
            <div class="slot-season">${seasonYear || ''}</div>
            <div class="slot-name">${player.name}</div>
            <div class="slot-team">${teamName}</div>
        `;
        assignBtn.style.display = 'none';
        
        // 선택 애니메이션
        slot.classList.add('selecting');
        setTimeout(() => slot.classList.remove('selecting'), 500);
    } else {
        slot.classList.remove('filled');
        slot.style.removeProperty('--team-color');
        playerDisplay.innerHTML = '';
        assignBtn.textContent = '+';
        assignBtn.style.display = '';
    }
}

// 팀 통계 업데이트
function updateTeamStats() {
    const totalEl = document.getElementById('totalChampionships');
    const avgEl = document.getElementById('avgCareer');
    const tierEl = document.getElementById('legendTier');
    if (!totalEl || !avgEl || !tierEl) {
        return;
    }

    const filledPositions = Object.values(currentRoster).filter(p => p !== null);
    
    if (filledPositions.length === 0) {
        totalEl.textContent = '0';
        avgEl.textContent = '0년';
        tierEl.textContent = '-';
        return;
    }
    
    // 총 우승 횟수
    const totalChamps = filledPositions.reduce((sum, p) => sum + p.championships, 0);
    totalEl.textContent = totalChamps;
    
    // 총 월즈 우승
    const totalWorldsWins = filledPositions.reduce((sum, p) => sum + p.worldsWins, 0);
    
    // 레전드 등급 계산
    let tier = '-';
    if (filledPositions.length === 5) {
        if (totalWorldsWins >= 10) tier = 'SSS+';
        else if (totalWorldsWins >= 7) tier = 'SSS';
        else if (totalWorldsWins >= 5) tier = 'SS';
        else if (totalWorldsWins >= 3) tier = 'S';
        else if (totalWorldsWins >= 1) tier = 'A';
        else tier = 'B';
    }
    
    tierEl.textContent = tier;
    
    // 평균 경력 (대략적 계산)
    const avgYears = Math.round(filledPositions.length * 5); // 평균 5년으로 가정
    avgEl.textContent = `약 ${avgYears}년`;
}

// 랜덤 드래프트
function randomDraft() {
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    const hasAny = positions.some(pos => players[pos] && players[pos].length);
    if (!hasAny) {
        showToast('선수 데이터가 없습니다');
        return;
    }
    
    positions.forEach((position, index) => {
        setTimeout(() => {
            const positionPlayers = players[position];
            const randomPlayer = weightedPick(positionPlayers);
            currentRoster[position] = randomPlayer;
            updateSlotDisplay(position, randomPlayer);

            if (index === positions.length - 1) {
                updateTeamStats();
                showToast('🎲 랜덤 드림팀 완성!');
                startReveal({ ...randomPlayer, position });
            }
        }, index * 300);
    });
}

// 로스터 초기화
function resetRoster() {
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    
    positions.forEach(position => {
        currentRoster[position] = null;
        updateSlotDisplay(position, null);
    });
    
    updateTeamStats();
    showToast('🔄 로스터가 초기화되었습니다');
}

// 로스터 공유
function shareRoster() {
    const filledPositions = Object.entries(currentRoster).filter(([_, p]) => p !== null);
    
    if (filledPositions.length === 0) {
        showToast('⚠️ 먼저 선수를 선택해주세요!');
        return;
    }
    
    let shareText = '🏆 나의 LCK 드림팀 🏆\n\n';
    
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    positions.forEach(pos => {
        const player = currentRoster[pos];
        if (player) {
            shareText += `${positionNames[pos]}: ${player.name} (${player.team})\n`;
        }
    });
    
    // 월즈 우승 횟수 합계
    const totalWorldsWins = filledPositions.reduce((sum, [_, p]) => sum + p.worldsWins, 0);
    shareText += `\n🌍 총 월즈 우승: ${totalWorldsWins}회`;
    
    // 클립보드에 복사
    navigator.clipboard.writeText(shareText).then(() => {
        showToast('📋 클립보드에 복사되었습니다!');
    }).catch(() => {
        showToast('⚠️ 복사에 실패했습니다');
    });
}

// 토스트 알림
function showToast(message) {
    // Toast disabled
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 모달 외부 클릭 시 닫기
document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target.id === 'playerModal') {
        closeModal();
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('LCK Legends Draft loaded!');
    console.log(`Total players: ${Object.values(players).flat().length}`);

    loadAllPlayers();

    document.querySelectorAll('.position-slot').forEach((slot) => {
        slot.addEventListener('click', (event) => {
            if (revealActive) return;
            const position = slot.getAttribute('data-position');
            if (!position || slot.classList.contains('filled')) return;
            summonForPosition(position);
        });
    });

    const signBtn = document.querySelector('.sign-btn');
    if (signBtn) {
        signBtn.addEventListener('click', (event) => {
            event.preventDefault();
            confirmRevealPick();
        });
        signBtn.addEventListener('touchstart', (event) => {
            event.preventDefault();
            confirmRevealPick();
        }, { passive: false });
    }
});
