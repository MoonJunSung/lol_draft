// LCK Legends Draft - Main Script

// ===== 다국어 지원 =====
let currentLang = localStorage.getItem('lang') || 'ko';

const translations = {
    ko: {
        eyebrow: 'LOL DRAFT - 2026년 최신 롤 선수 데이터',
        title: 'LOL 드림팀 만들기',
        subtitle: '페이커, 쵸비, 기인 등 프로스타 선수들로 나만의 드림팀을 완성하세요',
        saveToCollection: '💾 컬렉션에 저장',
        confirm: '확정',
        placeToRoster: '로스터에 배치',
        noCards: '저장된 카드가 없습니다',
        noCardsDesc: '선수를 뽑고 "컬렉션에 저장"을 눌러보세요!',
        noRosters: '저장된 로스터가 없습니다',
        noRostersDesc: '로스터를 완성하고 저장해보세요!',
        myCollection: '내 컬렉션',
        cards: '카드',
        rosters: '로스터',
        allPositions: '전체',
        saveCurrentRoster: '현재 로스터 저장',
        load: '불러오기',
        delete: '삭제',
        selectPosition: '배치할 포지션 선택',
        cancel: '취소',
        saved: '✓ 저장됨!',
        placed: '을(를) {pos}에 배치했습니다!',
        selected: '선택 완료!',
        resetConfirm: '로스터를 초기화할까요?',
        enterRosterName: '로스터 이름을 입력하세요:',
        dreamTeam: '드림팀',
        noPlayersInRoster: '로스터에 선수가 없습니다!',
        top: '탑',
        jungle: '정글',
        mid: '미드',
        adc: 'ADC',
        support: '서포터',
        collectionTooltip: '내 컬렉션',
        resetTooltip: '로스터 초기화',
        rosterReset: '로스터가 초기화되었습니다',
        selectPlayer: '선수 선택',
        searchPlayer: '선수 검색...',
        footer1: '© 2026 LOL DRAFT | 최신 업데이트: 2026년 1월 | 선수 정보는 부정확할 수 있습니다.',
        footer2: 'LCK, LPL, LEC, LCS 프로게이머 로스터 드래프트 | 페이커, T1, Gen.G, DRX 등',
        deleteRosterConfirm: '이 로스터를 삭제하시겠습니까?',
        randomDreamTeam: '🎲 랜덤 드림팀 완성!',
        noPositionData: '해당 포지션 데이터가 없습니다',
        cardNotFound: '카드를 찾을 수 없습니다',
        dataLoaded: '데이터 로드 완료',
        dataLoadFailed: '데이터 로드 실패',
        allSeasonLoaded: '전체 시즌 데이터 로드 완료',
        allSeasonFailed: '전체 시즌 데이터 로드 실패',
        noSeasonData: '해당 시즌 데이터가 없습니다',
        noPlayerData: '선수 데이터가 없습니다',
        invalidPosition: '유효하지 않은 포지션입니다',
        selectPlayerFirst: '⚠️ 먼저 선수를 선택해주세요!',
        copiedToClipboard: '📋 클립보드에 복사되었습니다!',
        copyFailed: '⚠️ 복사에 실패했습니다',
        shareDreamTeam: '🏆 나의 LCK 드림팀 🏆',
        totalWorldsWins: '🌍 총 월즈 우승: {count}회'
    },
    en: {
        eyebrow: 'LOL DRAFT - 2026 Latest Pro Player Data',
        title: 'Build Your Dream Team',
        subtitle: 'Create your ultimate roster with Faker, Chovy, Kiin and other ProStar players',
        saveToCollection: '💾 Save to Collection',
        confirm: 'Confirm',
        placeToRoster: 'Add to Roster',
        noCards: 'No saved cards',
        noCardsDesc: 'Draw players and click "Save to Collection"!',
        noRosters: 'No saved rosters',
        noRostersDesc: 'Complete a roster and save it!',
        myCollection: 'My Collection',
        cards: 'Cards',
        rosters: 'Rosters',
        allPositions: 'All',
        saveCurrentRoster: 'Save Current Roster',
        load: 'Load',
        delete: 'Delete',
        selectPosition: 'Select Position',
        cancel: 'Cancel',
        saved: '✓ Saved!',
        placed: ' placed at {pos}!',
        selected: 'Selected!',
        resetConfirm: 'Reset roster?',
        enterRosterName: 'Enter roster name:',
        dreamTeam: 'Dream Team',
        noPlayersInRoster: 'No players in roster!',
        top: 'Top',
        jungle: 'Jungle',
        mid: 'Mid',
        adc: 'ADC',
        support: 'Support',
        collectionTooltip: 'My Collection',
        resetTooltip: 'Reset Roster',
        rosterReset: 'Roster has been reset',
        selectPlayer: 'Select Player',
        searchPlayer: 'Search player...',
        footer1: '© 2026 LOL DRAFT | Last update: Jan 2026 | Player info may be inaccurate.',
        footer2: 'LCK, LPL, LEC, LCS Pro Roster Draft | Faker, T1, Gen.G, DRX etc.',
        deleteRosterConfirm: 'Delete this roster?',
        randomDreamTeam: '🎲 Random Dream Team Complete!',
        noPositionData: 'No data for this position',
        cardNotFound: 'Card not found',
        dataLoaded: 'Data loaded',
        dataLoadFailed: 'Failed to load data',
        allSeasonLoaded: 'All season data loaded',
        allSeasonFailed: 'Failed to load all season data',
        noSeasonData: 'No data for this season',
        noPlayerData: 'No player data available',
        invalidPosition: 'Invalid position',
        selectPlayerFirst: '⚠️ Please select players first!',
        copiedToClipboard: '📋 Copied to clipboard!',
        copyFailed: '⚠️ Copy failed',
        shareDreamTeam: '🏆 My LCK Dream Team 🏆',
        totalWorldsWins: '🌍 Total Worlds Wins: {count}'
    }
};

function t(key) {
    return translations[currentLang][key] || translations['ko'][key] || key;
}

function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('lang', currentLang);
    updateLanguageUI();
}

function updateLanguageUI() {
    // 버튼 텍스트 업데이트
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ko' ? 'EN' : '한국어';
    }
    
    // data-i18n 요소들 업데이트
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });
    
    // data-title-i18n (title 속성) 업데이트
    document.querySelectorAll('[data-title-i18n]').forEach(el => {
        const key = el.dataset.titleI18n;
        el.title = t(key);
    });
    
    // data-placeholder-i18n (placeholder 속성) 업데이트
    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
        const key = el.dataset.placeholderI18n;
        el.placeholder = t(key);
    });
    
    // 동적 컨텐츠 다시 렌더링
    if (typeof renderCollectionGrid === 'function' && document.getElementById('collectionModal')?.classList.contains('active')) {
        renderCollectionGrid();
        renderSavedRosters();
    }
    
    // HTML lang 속성 변경
    document.documentElement.lang = currentLang;
}

// 페이지 로드 시 언어 적용
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
});

// =====

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
        showToast(`${year} ${t('dataLoaded')}`);
    } catch (error) {
        console.error(error);
        showToast(`${year} ${t('dataLoadFailed')}`);
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
        showToast(t('allSeasonLoaded'));
    } catch (error) {
        console.error(error);
        showToast(t('allSeasonFailed'));
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
        // LCK 15배, LCK CL 2배, LPL 3배, LEC/LCS 2배, 나머지 1배
        let leagueBoost = 1;
        if (league === 'LCK CL' || league === 'LCKCL' || league === 'LCK CHALLENGERS') {
            leagueBoost = 2;
        } else if (league === 'LCK') {
            leagueBoost = 15;
        } else if (league === 'LPL') {
            leagueBoost = 3;
        } else if (league === 'LEC' || league === 'LCS') {
            leagueBoost = 2;
        }
        return worldsBoost * leagueBoost;
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
        showToast(`${season} ${t('noSeasonData')}`);
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
        showToast(t('noPlayerData'));
        return;
    }
    const positionPlayers = players[position];
    if (!positionPlayers || !positionPlayers.length) {
        showToast(t('noPositionData'));
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
    showToast(`${pendingRevealPick.name} ${t('selected')}`);
    closeReveal();
}

// 모달 열기
function openModal(position) {
    currentPosition = position;
    const modal = document.getElementById('playerModal');
    const modalTitle = document.getElementById('modalTitle');
    const playerGrid = document.getElementById('playerGrid');
    const searchInput = document.getElementById('searchInput');
    
    modalTitle.textContent = `${t(position)} ${t('selectPlayer')}`;
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
    showToast(`${player.name} ${t('selected')}`);
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
        showToast(t('noPlayerData'));
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
                showToast(t('randomDreamTeam'));
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
    showToast(`🔄 ${t('rosterReset')}`);
}

// 로스터 공유
function shareRoster() {
    const filledPositions = Object.entries(currentRoster).filter(([_, p]) => p !== null);
    
    if (filledPositions.length === 0) {
        showToast(t('selectPlayerFirst'));
        return;
    }
    
    let shareText = t('shareDreamTeam') + '\n\n';
    
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    positions.forEach(pos => {
        const player = currentRoster[pos];
        if (player) {
            shareText += `${t(pos)}: ${player.name} (${player.team})\n`;
        }
    });
    
    // 월즈 우승 횟수 합계
    const totalWorldsWins = filledPositions.reduce((sum, [_, p]) => sum + p.worldsWins, 0);
    shareText += '\n' + t('totalWorldsWins').replace('{count}', totalWorldsWins);
    
    // 클립보드에 복사
    navigator.clipboard.writeText(shareText).then(() => {
        showToast(t('copiedToClipboard'));
    }).catch(() => {
        showToast(t('copyFailed'));
    });
}

// 토스트 알림
function showToast(message) {
    // Toast disabled
}

// ============================================
// 컬렉션 시스템
// ============================================

// 컬렉션 데이터 (localStorage)
let cardCollection = [];
let savedRosters = [];

// 컬렉션 로드
function loadCollection() {
    try {
        const saved = localStorage.getItem('lolDraftCollection');
        cardCollection = saved ? JSON.parse(saved) : [];
    } catch {
        cardCollection = [];
    }
    try {
        const savedR = localStorage.getItem('lolDraftRosters');
        savedRosters = savedR ? JSON.parse(savedR) : [];
    } catch {
        savedRosters = [];
    }
}

// 컬렉션 저장
function saveCollectionToStorage() {
    localStorage.setItem('lolDraftCollection', JSON.stringify(cardCollection));
}

function saveRostersToStorage() {
    localStorage.setItem('lolDraftRosters', JSON.stringify(savedRosters));
}

// 카드를 컬렉션에 저장
function saveToCollection() {
    if (!pendingRevealPick) return;
    
    const card = {
        id: Date.now(),
        ...pendingRevealPick,
        savedAt: new Date().toISOString()
    };
    
    cardCollection.push(card);
    saveCollectionToStorage();
    
    // 저장 피드백
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.textContent = t('saved');
        saveBtn.style.background = '#22c55e';
        setTimeout(() => {
            saveBtn.textContent = t('saveToCollection');
            saveBtn.style.background = '';
        }, 1500);
    }
}

// 컬렉션 모달 열기
function openCollection() {
    loadCollection();
    renderCollectionGrid();
    renderSavedRosters();
    document.getElementById('collectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 컬렉션 모달 닫기
function closeCollection() {
    document.getElementById('collectionModal').classList.remove('active');
    document.body.style.overflow = '';
}

// 탭 전환
function switchCollectionTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName + 'Tab');
    });
}

// 컬렉션 그리드 렌더링
function renderCollectionGrid() {
    const grid = document.getElementById('collectionGrid');
    const filter = document.getElementById('collectionPosFilter').value;
    
    let filtered = cardCollection;
    if (filter !== 'all') {
        filtered = cardCollection.filter(c => c.position === filter);
    }
    
    document.getElementById('collectionCount').textContent = `${filtered.length}`;
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-collection" style="grid-column: 1/-1;">
                <div class="empty-icon">🃏</div>
                <p>${t('noCards')}</p>
                <p style="font-size:0.85rem;margin-top:8px;">${t('noCardsDesc')}</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map((card, index) => {
        const teamName = cleanTeamName(card.team) || card.team || '-';
        const year = resolveCardYear(card) || '????';
        return `
            <div class="collection-card" data-index="${index}">
                <span class="card-pos">${(card.position || '').toUpperCase()}</span>
                <div class="card-name">${card.name}</div>
                <div class="card-team">${teamName}</div>
                <div class="card-year">${year}</div>
                <button type="button" class="use-btn">${t('placeToRoster')}</button>
            </div>
        `;
    }).join('');
}

// 이벤트 위임으로 버튼 클릭 처리
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.use-btn');
    if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.collection-card');
        if (card) {
            const index = parseInt(card.dataset.index, 10);
            placeCardToRoster(index);
        }
    }
});

// 인덱스로 카드를 로스터에 배치
function placeCardToRoster(index) {
    const filter = document.getElementById('collectionPosFilter')?.value || 'all';
    let filtered = cardCollection;
    if (filter !== 'all') {
        filtered = cardCollection.filter(c => c.position === filter);
    }
    
    const card = filtered[index];
    if (!card) {
        showToast(t('cardNotFound'));
        return;
    }
    
    let position = card.position;
    
    if (!position) {
        showPositionSelectForCard(index);
        return;
    }
    
    const validPositions = ['top', 'jungle', 'mid', 'adc', 'support'];
    if (!validPositions.includes(position)) {
        showPositionSelectForCard(index);
        return;
    }
    
    currentRoster[position] = card;
    updateSlotDisplay(position, card);
    closeCollection();
    const posName = t(position);
    showToast(`${card.name}${t('placed').replace('{pos}', posName)}`);
}

// 컬렉션 필터
function filterCollection() {
    renderCollectionGrid();
}

// 컬렉션에서 카드 삭제
function deleteFromCollection(id, event) {
    event.stopPropagation();
    cardCollection = cardCollection.filter(c => c.id !== id);
    saveCollectionToStorage();
    renderCollectionGrid();
}

// 컬렉션에서 카드를 로스터에 배치
function useCardFromCollection(id, selectedPosition = null) {
    const card = cardCollection.find(c => c.id === id);
    if (!card) {
        showToast(t('cardNotFound'));
        return;
    }
    
    let position = selectedPosition || card.position;
    
    // position이 없으면 포지션 선택 모달 표시
    if (!position) {
        showPositionSelectForCard(id);
        return;
    }
    
    // position이 유효한지 확인
    const validPositions = ['top', 'jungle', 'mid', 'adc', 'support'];
    if (!validPositions.includes(position)) {
        showToast(t('invalidPosition'));
        return;
    }
    
    currentRoster[position] = card;
    updateSlotDisplay(position, card);
    closeCollection();
    const posName = t(position);
    showToast(`${card.name}${t('placed').replace('{pos}', posName)}`);
}

// 포지션 선택 모달 표시
function showPositionSelectForCard(index) {
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    const html = `
        <div class="position-select-popup">
            <h3>${t('selectPosition')}</h3>
            <div class="position-select-btns">
                ${positions.map(pos => `
                    <button onclick="placeCardWithPosition(${index}, '${pos}')">${t(pos)}</button>
                `).join('')}
            </div>
            <button class="cancel-btn" onclick="this.closest('.position-select-popup').remove()">${t('cancel')}</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// 선택된 포지션으로 카드 배치
function placeCardWithPosition(index, position) {
    const filter = document.getElementById('collectionPosFilter').value;
    let filtered = cardCollection;
    if (filter !== 'all') {
        filtered = cardCollection.filter(c => c.position === filter);
    }
    
    const card = filtered[index];
    if (!card) return;
    
    document.querySelector('.position-select-popup')?.remove();
    
    currentRoster[position] = card;
    updateSlotDisplay(position, card);
    closeCollection();
    const posName = t(position);
    showToast(`${card.name}${t('placed').replace('{pos}', posName)}`);
}

// 현재 로스터 저장
function saveCurrentRoster() {
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    const filledCount = positions.filter(p => currentRoster[p]).length;
    
    if (filledCount === 0) {
        alert(t('noPlayersInRoster'));
        return;
    }
    
    const rosterName = prompt(t('enterRosterName'), `${t('dreamTeam')} ${savedRosters.length + 1}`);
    if (!rosterName) return;
    
    const roster = {
        id: Date.now(),
        name: rosterName,
        players: { ...currentRoster },
        savedAt: new Date().toISOString()
    };
    
    savedRosters.push(roster);
    saveRostersToStorage();
    renderSavedRosters();
}

// 저장된 로스터 렌더링
function renderSavedRosters() {
    const container = document.getElementById('savedRosters');
    
    if (savedRosters.length === 0) {
        container.innerHTML = `
            <div class="empty-collection">
                <div class="empty-icon">📋</div>
                <p>${t('noRosters')}</p>
                <p style="font-size:0.85rem;margin-top:8px;">${t('noRostersDesc')}</p>
            </div>
        `;
        return;
    }
    
    const dateLocale = currentLang === 'ko' ? 'ko-KR' : 'en-US';
    container.innerHTML = savedRosters.map(roster => {
        const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
        const playerTags = positions
            .filter(p => roster.players[p])
            .map(p => `<span class="roster-player-tag">${roster.players[p].name}</span>`)
            .join('');
        
        const date = new Date(roster.savedAt).toLocaleDateString(dateLocale);
        
        return `
            <div class="roster-item">
                <div class="roster-item-header">
                    <span class="roster-item-name">${roster.name}</span>
                    <span class="roster-item-date">${date}</span>
                </div>
                <div class="roster-item-players">${playerTags || '<span style="color:var(--muted)">-</span>'}</div>
                <div class="roster-item-actions">
                    <button class="roster-load-btn" onclick="loadRoster(${roster.id})">${t('load')}</button>
                    <button class="roster-delete-btn" onclick="deleteRoster(${roster.id})">${t('delete')}</button>
                </div>
            </div>
        `;
    }).join('');
}

// 로스터 불러오기
function loadRoster(id) {
    const roster = savedRosters.find(r => r.id === id);
    if (!roster) return;
    
    const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
    positions.forEach(pos => {
        currentRoster[pos] = roster.players[pos] || null;
        updateSlotDisplay(pos, currentRoster[pos]);
    });
    
    closeCollection();
}

// 로스터 삭제
function deleteRoster(id) {
    if (!confirm(t('deleteRosterConfirm'))) return;
    savedRosters = savedRosters.filter(r => r.id !== id);
    saveRostersToStorage();
    renderSavedRosters();
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCollection();
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

    loadCollection();
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
    
    // 컬렉션 모달 외부 클릭 닫기
    const collectionModal = document.getElementById('collectionModal');
    if (collectionModal) {
        collectionModal.addEventListener('click', (e) => {
            if (e.target.id === 'collectionModal') {
                closeCollection();
            }
        });
    }
});
