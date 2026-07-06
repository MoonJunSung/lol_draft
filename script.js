// LOL DRAFT - Main Script

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
        footer1: '© 2026 LOL DRAFT | 최신 업데이트: 2026년 7월 | 선수 정보는 부정확할 수 있습니다. | 이 페이지는 오직 생성형 AI로 제작,배포하였습니다.',
        footer2: 'LCK, LPL, LEC, LCS 프로게이머 로스터 드래프트 | 페이커, T1, Gen.G, DRX 등',
        deleteRosterConfirm: '이 로스터를 삭제하시겠습니까?',
        deleteCardConfirm: '이 카드를 삭제할까요?',
        randomDreamTeam: '🎲 랜덤 드림팀 완성!',
        cardNotFound: '카드를 찾을 수 없습니다',
        allSeasonLoaded: '전체 시즌 데이터 로드 완료',
        allSeasonFailed: '데이터 로드에 실패했습니다. 새로고침 해주세요.',
        noPlayerData: '선수 데이터가 없습니다',
        selectPlayerFirst: '⚠️ 먼저 선수를 선택해주세요!',
        copiedToClipboard: '📋 클립보드에 복사되었습니다!',
        copyFailed: '⚠️ 복사에 실패했습니다',
        shareDreamTeam: '🏆 나의 LOL 드림팀 🏆',
        totalWorldsWins: '🌍 총 월즈 우승: {count}회',
        alreadySaved: '이미 컬렉션에 있는 카드입니다',
        worldsChampBadge: '🏆 월즈 우승자',
        statWorlds: '월즈 우승',
        statTier: '팀 등급',
        randomFill: '🎲 랜덤 완성',
        share: '📋 로스터 공유',
        closeTooltip: '닫기',
        musicTitle: '🎵 월즈 주제가',
        musicTooltip: '월즈 주제가 듣기',
        stopMusic: '⏹ 정지',
        playerInfo: '선수 정보',
        careerHistory: '커리어 / 이적 이력',
        careerSpan: '활동 시즌',
        teamsPlayed: '거쳐간 팀',
        worldsTitles: '월즈 우승',
        statusActive: '현역 (활동 중)',
        statusRetired: '은퇴/비활동 추정',
        lastSeen: '최근 기록 {year}',
        oneClub: '한 팀에서만 활동한 원 클럽 선수',
        transferCount: '총 {count}개 팀에서 활동',
        noCareerData: '커리어 데이터가 없습니다',
        detailHint: '카드를 눌러 선수 정보를 볼 수 있어요'
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
        footer1: '© 2026 LOL DRAFT | Last update: Jul 2026 | Player info may be inaccurate. | Built and deployed entirely with generative AI.',
        footer2: 'LCK, LPL, LEC, LCS Pro Roster Draft | Faker, T1, Gen.G, DRX etc.',
        deleteRosterConfirm: 'Delete this roster?',
        deleteCardConfirm: 'Delete this card?',
        randomDreamTeam: '🎲 Random Dream Team Complete!',
        cardNotFound: 'Card not found',
        allSeasonLoaded: 'All season data loaded',
        allSeasonFailed: 'Failed to load data. Please refresh.',
        noPlayerData: 'No player data available',
        selectPlayerFirst: '⚠️ Please select players first!',
        copiedToClipboard: '📋 Copied to clipboard!',
        copyFailed: '⚠️ Copy failed',
        shareDreamTeam: '🏆 My LOL Dream Team 🏆',
        totalWorldsWins: '🌍 Total Worlds Wins: {count}',
        alreadySaved: 'This card is already in your collection',
        worldsChampBadge: '🏆 Worlds Champion',
        statWorlds: 'Worlds Wins',
        statTier: 'Team Tier',
        randomFill: '🎲 Random Fill',
        share: '📋 Share Roster',
        closeTooltip: 'Close',
        musicTitle: '🎵 Worlds Anthems',
        musicTooltip: 'Play Worlds Anthems',
        stopMusic: '⏹ Stop',
        playerInfo: 'Player Info',
        careerHistory: 'Career / Transfer History',
        careerSpan: 'Active Seasons',
        teamsPlayed: 'Teams',
        worldsTitles: 'Worlds Wins',
        statusActive: 'Active',
        statusRetired: 'Likely Retired/Inactive',
        lastSeen: 'last seen {year}',
        oneClub: 'One-club player',
        transferCount: 'Played for {count} teams',
        noCareerData: 'No career data available',
        detailHint: 'Tap the card to view player info'
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
    if (document.getElementById('collectionModal')?.classList.contains('active')) {
        renderCollectionGrid();
        renderSavedRosters();
    }
    updateTeamStats();

    // HTML lang 속성 변경
    document.documentElement.lang = currentLang;
}

// ===== 상태 =====

const POSITIONS = ['top', 'jungle', 'mid', 'adc', 'support'];

let players = {
    top: [],
    jungle: [],
    mid: [],
    adc: [],
    support: []
};

const availableYears = [
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
];

const teamColors = {
    // LCK
    'T1': '#e2012d',
    'SK Telecom T1': '#e2012d',
    'SKT T1': '#e2012d',
    'Gen.G': '#aa8a00',
    'GENG': '#aa8a00',
    'KSV eSports': '#aa8a00',
    'Samsung Galaxy': '#0f5fbf',
    'DAMWON Gaming': '#1a51ff',
    'DWG KIA': '#1a51ff',
    'Dplus KIA': '#00c8b3',
    'KT Rolster': '#e01b22',
    'Hanwha Life Esports': '#f37021',
    'Hanwha Life': '#f37021',
    'HLE': '#f37021',
    'DRX': '#1a4cff',
    'Kiwoom DRX': '#1a4cff',
    'Kingzone DragonX': '#5b2d8e',
    'Longzhu Gaming': '#7c3aed',
    'Nongshim RedForce': '#de2027',
    'KWANGDONG FREECS': '#e12639',
    'Afreeca Freecs': '#1e63b2',
    'DN FREECS': '#e12639',
    'DN SOOPers': '#0a6dff',
    'BNK FEARX': '#ffc900',
    'Liiv SANDBOX': '#ffc61a',
    'BRION': '#00854a',
    'OKSavingsBank BRION': '#00854a',
    'HANJIN BRION': '#00854a',
    'Griffin': '#0f2d5c',
    'Jin Air Green Wings': '#a6ce39',
    'ROX Tigers': '#ffcc00',
    'MVP': '#dc0d15',
    'CJ Entus': '#1358a4',
    // LPL
    'EDward Gaming': '#0f172a',
    'EDG': '#0f172a',
    'Royal Never Give Up': '#b91c1c',
    'RNG': '#b91c1c',
    'JD Gaming': '#e4022b',
    'JDG': '#e4022b',
    'Top Esports': '#ff4018',
    'FunPlus Phoenix': '#f74c48',
    'Bilibili Gaming': '#00a1d6',
    'LNG Esports': '#10b981',
    'LNG': '#10b981',
    'Invictus Gaming': '#111827',
    'IG': '#111827',
    'Team WE': '#d61c22',
    'Suning': '#f8b500',
    'Weibo Gaming': '#ef4444',
    'Oh My God': '#2d2d2d',
    'Rare Atom': '#7f3f98',
    'Victory Five': '#ff5c00',
    'Ultra Prime': '#00a0e9',
    "Anyone's Legend": '#d22630',
    'LGD Gaming': '#d97706',
    'LGD': '#d97706',
    'Vici Gaming': '#ffd200',
    // LEC
    'Fnatic': '#ff5900',
    'G2 Esports': '#c0392b',
    'MAD Lions': '#f9b902',
    'MAD Lions KOI': '#f9b902',
    'Rogue': '#1c64f2',
    'Misfits Gaming': '#de2027',
    'Team Vitality': '#ffee00',
    'Splyce': '#ffe400',
    'Unicorns of Love': '#ff0090',
    'FC Schalke 04 Esports': '#004a9d',
    'Team BDS': '#fa1e50',
    'Team Heretics': '#d4af37',
    'KOI': '#019df4',
    'Movistar KOI': '#019df4',
    'Karmine Corp': '#00ccff',
    'Astralis': '#ee1c25',
    'Natus Vincere': '#ffee00',
    'Ninjas in Pyjamas': '#d4ff27',
    'SK Gaming': '#e6003c',
    // LCS
    'Cloud9': '#00aeef',
    'Team Liquid': '#0a74da',
    'TSM': '#000000',
    '100 Thieves': '#ea0a2a',
    'Evil Geniuses': '#1c1c1c',
    'FlyQuest': '#00b577',
    'Counter Logic Gaming': '#0c223f',
    'Immortals': '#02b3e4',
    'Golden Guardians': '#b4975a',
    'Dignitas': '#ffd502',
    'Echo Fox': '#ff6b00',
    'OpTic Gaming': '#92c83e',
    'NRG Kia': '#ff1837',
    // 기타 지역
    'Flash Wolves': '#ffcd00',
    'ahq eSports Club': '#dd0f31',
    'J Team': '#e60012',
    'GAM Esports': '#f6c414',
    'Taipei Assassins': '#0b8ec6',
    'CTBC Flying Oyster': '#ffcd00',
    'TALON': '#e0002d',
    'DetonatioN FocusMe': '#0d47a1',
    'Saigon Buffalo': '#f7a600',
    'Phong Vũ Buffalo': '#d31145'
};

const teamAbbreviations = {
    // LCK
    'T1': 'T1',
    'SK Telecom T1': 'SKT',
    'SKT T1': 'SKT',
    'Gen.G': 'GEN',
    'KSV eSports': 'KSV',
    'Samsung Galaxy': 'SSG',
    'DAMWON Gaming': 'DWG',
    'DWG KIA': 'DK',
    'Dplus KIA': 'DK',
    'KT Rolster': 'KT',
    'Hanwha Life Esports': 'HLE',
    'DRX': 'DRX',
    'Kiwoom DRX': 'DRX',
    'Kingzone DragonX': 'KZ',
    'Longzhu Gaming': 'LZ',
    'Nongshim RedForce': 'NS',
    'KWANGDONG FREECS': 'KDF',
    'Afreeca Freecs': 'AF',
    'DN FREECS': 'DNF',
    'DN SOOPers': 'DNS',
    'BNK FEARX': 'BFX',
    'Liiv SANDBOX': 'LSB',
    'BRION': 'BRO',
    'OKSavingsBank BRION': 'BRO',
    'HANJIN BRION': 'BRO',
    'Griffin': 'GRF',
    'Jin Air Green Wings': 'JAG',
    'ROX Tigers': 'ROX',
    'MVP': 'MVP',
    'CJ Entus': 'CJ',
    'NaJin e-mFire': 'NJE',
    'Kongdoo Monster': 'KDM',
    'ESC Ever': 'ESC',
    'bbq Olivers': 'BBQ',
    'Ever8 Winners': 'EEW',
    'Incredible Miracle': 'IM',
    'SeolHaeOne Prince': 'SP',
    'Seorabeol Gaming': 'SRB',
    'Team Dynamics': 'DYN',
    // LPL
    'EDward Gaming': 'EDG',
    'Royal Never Give Up': 'RNG',
    'Royal Club': 'RYL',
    'JD Gaming': 'JDG',
    'Top Esports': 'TES',
    'FunPlus Phoenix': 'FPX',
    'Bilibili Gaming': 'BLG',
    'LNG Esports': 'LNG',
    'Invictus Gaming': 'IG',
    'Team WE': 'WE',
    'Suning': 'SN',
    'Weibo Gaming': 'WBG',
    'Oh My God': 'OMG',
    'Rare Atom': 'RA',
    'Victory Five': 'V5',
    'Ultra Prime': 'UP',
    "Anyone's Legend": 'AL',
    'LGD Gaming': 'LGD',
    'Vici Gaming': 'VG',
    'ThunderTalk Gaming': 'TT',
    'Rogue Warriors': 'RW',
    'Snake Esports': 'SS',
    'eStar': 'ES',
    'SinoDragon Gaming': 'SDG',
    'I May': 'IM',
    'Newbee': 'NB',
    'QG Reapers': 'QG',
    'Young Miracles': 'YM',
    // LEC
    'Fnatic': 'FNC',
    'G2 Esports': 'G2',
    'Gamers2': 'G2',
    'MAD Lions': 'MAD',
    'MAD Lions KOI': 'MDK',
    'Rogue': 'RGE',
    'Misfits Gaming': 'MSF',
    'Excel Esports': 'XL',
    'SK Gaming': 'SK',
    'Team Vitality': 'VIT',
    'Origen': 'OG',
    'Splyce': 'SPY',
    'H2k-Gaming': 'H2K',
    'Unicorns of Love': 'UOL',
    'FC Schalke 04 Esports': 'S04',
    'Team BDS': 'BDS',
    'Team Heretics': 'TH',
    'KOI': 'KOI',
    'Movistar KOI': 'MKOI',
    'GiantX': 'GX',
    'Karmine Corp': 'KC',
    'Astralis': 'AST',
    'Natus Vincere': 'NAVI',
    'Ninjas in Pyjamas': 'NIP',
    'Team ROCCAT': 'ROC',
    'Giants Gaming': 'GIA',
    'Elements': 'EL',
    'Gambit Gaming': 'GMB',
    'Alliance': 'ALL',
    'Copenhagen Wolves': 'CW',
    'Team EnVyUs': 'NV',
    'Los Ratones': 'LR',
    // LCS
    'Cloud9': 'C9',
    'Team Liquid': 'TL',
    'TSM': 'TSM',
    '100 Thieves': '100T',
    'Evil Geniuses': 'EG',
    'FlyQuest': 'FLY',
    'Counter Logic Gaming': 'CLG',
    'Immortals': 'IMT',
    'Golden Guardians': 'GG',
    'Dignitas': 'DIG',
    'Echo Fox': 'FOX',
    'Clutch Gaming': 'CG',
    'OpTic Gaming': 'OPT',
    'Phoenix1': 'P1',
    'Team Impulse': 'TIP',
    'Gravity': 'GV',
    'Team Coast': 'CST',
    'Winterfox': 'WFX',
    'NRG Kia': 'NRG',
    'Shopify Rebellion': 'SR',
    'Team 8': 'T8',
    'Team Curse': 'CRS',
    'compLexity Gaming': 'COL',
    'Enemy': 'NME',
    'Team Dragon Knights': 'TDK',
    'Renegades': 'REN',
    'Apex Gaming': 'APX',
    'Sentinels': 'SEN',
    // 기타 지역
    'Flash Wolves': 'FW',
    'ahq eSports Club': 'AHQ',
    'J Team': 'JT',
    'GAM Esports': 'GAM',
    'Taipei Assassins': 'TPA',
    'Hong Kong Attitude': 'HKA',
    'Hong Kong Esports': 'HKE',
    'CTBC Flying Oyster': 'CFO',
    'TALON': 'TLN',
    'Beyond Gaming': 'BYG',
    'Saigon Buffalo': 'SGB',
    'Phong Vũ Buffalo': 'PVB',
    'EVOS Esports': 'EVS',
    'Team Flash': 'FL',
    'Team Secret': 'TS',
    'DetonatioN FocusMe': 'DFM',
    'Fukuoka SoftBank HAWKS gaming': 'SHG',
    'V3 Esports': 'V3',
    'Team Whales': 'TW'
};

// 대소문자 차이('Dplus KIA' vs 'Dplus Kia')를 흡수하기 위한 대문자 키 룩업 맵
function buildUpperKeyMap(map) {
    const result = {};
    Object.keys(map).forEach((key) => {
        result[key.toUpperCase()] = map[key];
    });
    return result;
}

const teamColorsUpper = buildUpperKeyMap(teamColors);
const teamAbbreviationsUpper = buildUpperKeyMap(teamAbbreviations);

// 현재 선택된 로스터
let currentRoster = {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null
};

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

// HTML 이스케이프 (innerHTML에 들어가는 모든 데이터 값에 사용)
function esc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ===== 데이터 로드 =====

async function loadAllPlayers() {
    try {
        const results = await Promise.all(
            availableYears.map(async (year) => {
                try {
                    const response = await fetch(`players_${year}_final.json`);
                    if (!response.ok) return null;
                    return await response.json();
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
            POSITIONS.forEach((pos) => {
                players[pos].push(...(data[pos] || []));
            });
        });

        const total = Object.values(players).flat().length;
        if (total === 0) {
            showToast(t('allSeasonFailed'));
            return;
        }
        resetRoster();
        showToast(t('allSeasonLoaded'));
    } catch (error) {
        console.error(error);
        showToast(t('allSeasonFailed'));
    }
}

// ===== 카드 표시용 헬퍼 =====

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
    return '';
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
    return teamColorsUpper[key.toUpperCase()] || hashColor(key);
}

function getTeamAbbreviation(teamName) {
    const key = normalizeTeamKey(teamName);
    if (!key) return '';
    const mapped = teamAbbreviationsUpper[key.toUpperCase()];
    if (mapped) return mapped;
    const words = key.split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return words.map((w) => w[0]).join('').slice(0, 4).toUpperCase();
}

// ===== 역대 팀명 보정 =====
// 일부 데이터가 현재 팀명으로 통일돼 과거 명칭이 사라진 경우, 연도별 실제 팀명으로 되돌린다.
// 계보(lineage)별로 "해당 연도까지는 이 이름"을 정의. 새 조직은 아래 두 맵에 추가하면 된다.
const TEAM_LINEAGES = {
    // DAMWON → DWG KIA → Dplus Kia
    dplus: [
        { until: 2020, name: 'DAMWON Gaming' },
        { until: 2022, name: 'DWG KIA' },
        { until: 9999, name: 'Dplus Kia' }
    ]
};
// 데이터에 등장할 수 있는 여러 표기(대문자 키)를 계보 키로 매핑
const TEAM_LINEAGE_KEYS = {
    'DAMWON GAMING': 'dplus',
    'DAMWON': 'dplus',
    'DWG KIA': 'dplus',
    'DWG': 'dplus',
    'DPLUS KIA': 'dplus',
    'DPLUS': 'dplus',
    'DK': 'dplus'
};

function resolveHistoricalTeamName(teamName, year) {
    const clean = cleanTeamName(teamName);
    if (!clean) return clean;
    const lineageKey = TEAM_LINEAGE_KEYS[clean.toUpperCase()];
    const y = Number(year);
    if (lineageKey && TEAM_LINEAGES[lineageKey] && y) {
        for (const era of TEAM_LINEAGES[lineageKey]) {
            if (y <= era.until) return era.name;
        }
    }
    return clean;
}

// ===== 가중치 뽑기 =====

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

// ===== 리빌 시퀀스 =====

function setRevealContent(player) {
    const nation = resolveNationality(player);
    const league = leagueMap[player.league] || player.league || '-';
    const teamRaw = player.seasonTeam || player.team || '-';
    const seasonYear = resolveCardYear(player);
    const team = resolveHistoricalTeamName(teamRaw, seasonYear) || cleanTeamName(teamRaw) || teamRaw;
    const teamColor = getTeamColor(team);
    const worldsWins = Number(player.worldsWins || 0);

    document.getElementById('revealFlag').textContent = nation.flag;
    document.getElementById('revealCountryName').textContent = nation.name.toUpperCase();
    document.getElementById('revealLeagueName').textContent = league;
    const revealTeamLogo = document.getElementById('revealTeamLogo');
    if (revealTeamLogo) {
        revealTeamLogo.textContent = getTeamAbbreviation(team) || team;
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
            badge.textContent = worldsWins > 1 ? `${t('worldsChampBadge')} ×${worldsWins}` : t('worldsChampBadge');
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

function closeReveal() {
    const overlay = document.getElementById('revealOverlay');
    if (!overlay) return;
    clearRevealTimers();
    overlay.classList.remove('active');
    revealActive = false;
    pendingRevealPick = null;
}

// ===== 선수 상세 정보 (커리어 / 이적 이력) =====

// 같은 선수를 여러 연도 데이터에서 묶기 위한 기준 키 (id에서 _YYYY 제거)
function playerBaseId(p) {
    if (p && p.id) {
        const m = String(p.id).match(/^(.*)_\d{4}$/);
        return (m ? m[1] : String(p.id)).toLowerCase();
    }
    return (p && p.name ? String(p.name) : '').toLowerCase();
}

// 모든 연도 데이터를 훑어 해당 선수의 연도별 커리어 타임라인을 만든다.
function buildCareerTimeline(player) {
    const baseId = playerBaseId(player);
    const byYear = new Map();
    POSITIONS.forEach((pos) => {
        (players[pos] || []).forEach((p) => {
            if (playerBaseId(p) !== baseId) return;
            const year = Number(resolveCardYear(p));
            if (!year) return;
            const teamName = resolveHistoricalTeamName(p.seasonTeam || p.team, year)
                || cleanTeamName(p.team) || p.team || '-';
            if (!byYear.has(year)) {
                byYear.set(year, { year, teams: new Set(), leagues: new Set(), positions: new Set(), worldsWins: 0 });
            }
            const e = byYear.get(year);
            if (teamName) e.teams.add(teamName);
            if (p.league) e.leagues.add(p.league);
            e.positions.add(pos);
            e.worldsWins = Math.max(e.worldsWins, Number(p.worldsWins || 0));
        });
    });
    return [...byYear.values()].sort((a, b) => a.year - b.year);
}

const POSITION_LABEL = { top: 'TOP', jungle: 'JGL', mid: 'MID', adc: 'ADC', support: 'SUP' };

function openPlayerDetail(player) {
    if (!player) return;
    const modal = document.getElementById('playerDetailModal');
    const body = document.getElementById('playerDetailBody');
    if (!modal || !body) return;

    const timeline = buildCareerTimeline(player);
    const nation = resolveNationality(player);
    const currentYear = Number(resolveCardYear(player));
    const currentTeam = resolveHistoricalTeamName(player.seasonTeam || player.team, currentYear)
        || cleanTeamName(player.team) || player.team || '-';
    const teamColor = getTeamColor(currentTeam);

    // 커리어 요약
    const years = timeline.map((e) => e.year);
    const firstYear = years.length ? years[0] : currentYear;
    const lastYear = years.length ? years[years.length - 1] : currentYear;
    const allTeams = [];
    timeline.forEach((e) => e.teams.forEach((tn) => { if (!allTeams.includes(tn)) allTeams.push(tn); }));
    const maxWorlds = timeline.reduce((m, e) => Math.max(m, e.worldsWins), Number(player.worldsWins || 0));

    // 현역 / 은퇴 추정 (데이터 최신 시즌 대비)
    const latestData = availableYears[availableYears.length - 1];
    const active = lastYear >= latestData - 1;
    const statusText = active
        ? t('statusActive')
        : `${t('statusRetired')} · ${t('lastSeen').replace('{year}', lastYear)}`;

    const teamsCount = allTeams.length;
    const transferNote = teamsCount <= 1
        ? t('oneClub')
        : t('transferCount').replace('{count}', teamsCount);

    const timelineHtml = timeline.length
        ? timeline.map((e) => {
            const teamsStr = [...e.teams].join(', ');
            const league = [...e.leagues][0] || '';
            const posStr = [...e.positions].map((p) => POSITION_LABEL[p] || p.toUpperCase()).join('/');
            const trophy = e.worldsWins > 0 ? ' 🏆' : '';
            const col = getTeamColor([...e.teams][0] || teamsStr);
            return `
                <li class="career-item">
                    <span class="career-year">${e.year}</span>
                    <span class="career-dot" style="background:${col}"></span>
                    <span class="career-info">
                        <span class="career-team">${esc(teamsStr)}${trophy}</span>
                        <span class="career-meta">${esc(league)}${posStr ? ' · ' + esc(posStr) : ''}</span>
                    </span>
                </li>`;
        }).join('')
        : `<li class="career-item"><span class="career-info"><span class="career-team">${t('noCareerData')}</span></span></li>`;

    const imgHtml = player.image
        ? `<img src="${esc(player.image)}" alt="${esc(player.name)}" class="detail-avatar" loading="lazy" onerror="this.style.display='none'">`
        : '';

    body.innerHTML = `
        <div class="detail-top" style="--team-color:${teamColor}">
            ${imgHtml}
            <div class="detail-head">
                <div class="detail-name">${esc(player.name)}</div>
                <div class="detail-sub">
                    <span class="detail-flag">${nation.flag}</span>
                    <span>${esc(nation.name)}</span>
                    <span class="detail-pos-chip">${esc(POSITION_LABEL[player.position] || (player.position || '').toUpperCase())}</span>
                </div>
                <div class="detail-current" style="color:${teamColor}">${esc(currentTeam)}${currentYear ? ` · ${currentYear}` : ''}</div>
            </div>
        </div>
        <div class="detail-stats-row">
            <div class="detail-stat"><span class="ds-label">${t('careerSpan')}</span><span class="ds-value">${firstYear}${lastYear !== firstYear ? '–' + lastYear : ''}</span></div>
            <div class="detail-stat"><span class="ds-label">${t('teamsPlayed')}</span><span class="ds-value">${teamsCount}</span></div>
            <div class="detail-stat"><span class="ds-label">${t('worldsTitles')}</span><span class="ds-value">${maxWorlds}${maxWorlds > 0 ? ' 🏆' : ''}</span></div>
        </div>
        <div class="detail-status ${active ? 'is-active' : 'is-retired'}">${statusText}</div>
        <div class="detail-transfer-note">${transferNote}</div>
        <h3 class="detail-section-title">${t('careerHistory')}</h3>
        <ul class="career-timeline">${timelineHtml}</ul>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePlayerDetail() {
    const modal = document.getElementById('playerDetailModal');
    if (modal) modal.classList.remove('active');
    // 리빌 오버레이가 열려있으면 스크롤 잠금 유지
    if (!revealActive && !document.getElementById('collectionModal').classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// ===== 뽑기 / 확정 =====

function summonForPosition(position) {
    if (!players[position] || players[position].length === 0) {
        showToast(t('noPlayerData'));
        return;
    }

    const pick = weightedPick(players[position]);
    pendingRevealPick = { ...pick, position };
    startReveal(pendingRevealPick);
}

function confirmRevealPick() {
    if (!pendingRevealPick) {
        closeReveal();
        return;
    }

    const pick = pendingRevealPick;
    currentRoster[pick.position] = pick;
    updateSlotDisplay(pick.position, pick);
    updateTeamStats();
    showToast(`${pick.name} ${t('selected')}`);
    closeReveal();
}

// ===== 로스터 슬롯 / 통계 =====

function updateSlotDisplay(position, player) {
    const slot = document.querySelector(`.position-slot[data-position="${position}"]`);
    const playerDisplay = slot.querySelector('.player-display');
    const assignBtn = slot.querySelector('.assign-btn');

    if (player) {
        slot.classList.add('filled');
        const seasonYear = resolveCardYear(player);
        const teamName = resolveHistoricalTeamName(player.seasonTeam || player.team, seasonYear) || cleanTeamName(player.team) || player.team;
        const teamColor = getTeamColor(teamName);
        slot.style.setProperty('--team-color', teamColor);
        playerDisplay.innerHTML = `
            <div class="slot-season">${esc(seasonYear)}</div>
            <div class="slot-name">${esc(player.name)}</div>
            <div class="slot-team">${esc(teamName)}</div>
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

function updateTeamStats() {
    const worldsEl = document.getElementById('statWorlds');
    const tierEl = document.getElementById('statTier');
    if (!worldsEl || !tierEl) return;

    const filledPositions = Object.values(currentRoster).filter(p => p !== null);
    const totalWorldsWins = filledPositions.reduce((sum, p) => sum + Number(p.worldsWins || 0), 0);
    worldsEl.textContent = String(totalWorldsWins);

    // 팀 등급은 5명이 모두 찼을 때만 계산
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
}

// ===== 랜덤 드래프트 / 초기화 / 공유 =====

function randomDraft() {
    const hasAny = POSITIONS.some(pos => players[pos] && players[pos].length);
    if (!hasAny) {
        showToast(t('noPlayerData'));
        return;
    }

    POSITIONS.forEach((position, index) => {
        setTimeout(() => {
            if (!players[position] || !players[position].length) return;
            const randomPlayer = { ...weightedPick(players[position]), position };
            currentRoster[position] = randomPlayer;
            updateSlotDisplay(position, randomPlayer);

            if (index === POSITIONS.length - 1) {
                updateTeamStats();
                showToast(t('randomDreamTeam'));
            }
        }, index * 250);
    });
}

function resetRoster() {
    POSITIONS.forEach(position => {
        currentRoster[position] = null;
        updateSlotDisplay(position, null);
    });
    updateTeamStats();
}

// 상단 초기화 버튼용 (확인 후 초기화)
function confirmResetRoster() {
    const hasAny = Object.values(currentRoster).some(p => p !== null);
    if (hasAny && !confirm(t('resetConfirm'))) return;
    resetRoster();
    showToast(`🔄 ${t('rosterReset')}`);
}

function shareRoster() {
    const filledPositions = Object.entries(currentRoster).filter(([, p]) => p !== null);

    if (filledPositions.length === 0) {
        showToast(t('selectPlayerFirst'));
        return;
    }

    let shareText = t('shareDreamTeam') + '\n\n';

    POSITIONS.forEach(pos => {
        const player = currentRoster[pos];
        if (player) {
            const teamName = resolveHistoricalTeamName(player.seasonTeam || player.team, resolveCardYear(player)) || cleanTeamName(player.team) || player.team;
            shareText += `${t(pos)}: ${player.name} (${teamName})\n`;
        }
    });

    const totalWorldsWins = filledPositions.reduce((sum, [, p]) => sum + Number(p.worldsWins || 0), 0);
    shareText += '\n' + t('totalWorldsWins').replace('{count}', totalWorldsWins);
    shareText += '\nhttps://loldraft.site/';

    navigator.clipboard.writeText(shareText).then(() => {
        showToast(t('copiedToClipboard'));
    }).catch(() => {
        showToast(t('copyFailed'));
    });
}

// ===== 토스트 알림 =====

let toastTimer = null;

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ============================================
// 월즈 주제가 플레이어 (Riot 공식 유튜브 임베드)
// ============================================

const WORLDS_ANTHEMS = [
    { year: 2014, title: 'Warriors', artist: 'Imagine Dragons', videoId: 'fmI_Ndrxy14' },
    { year: 2015, title: 'Worlds Collide', artist: 'Nicki Taylor', videoId: '4Twd965VzX4' },
    { year: 2016, title: 'Ignite', artist: 'Zedd', videoId: 'Zasx9hjo4WY' },
    { year: 2017, title: 'Legends Never Die', artist: 'Against The Current', videoId: 'r6zIGXun57U' },
    { year: 2018, title: 'RISE', artist: 'The Glitch Mob, Mako, The Word Alive', videoId: 'fB8TyLTD7EE' },
    { year: 2019, title: 'Phoenix', artist: 'Cailin Russo, Chrissy Costanza', videoId: 'i1IKnWDecwA' },
    { year: 2020, title: 'Take Over', artist: 'Jeremy McKinnon, MAX, Henry', videoId: 'KbNL9ZyB49c' },
    { year: 2021, title: 'Burn It All Down', artist: 'PVRIS', videoId: '1Z6CHioIn3s' },
    { year: 2022, title: "STAR WALKIN'", artist: 'Lil Nas X', videoId: 'HYsz1hP0BFo' },
    { year: 2023, title: 'GODS', artist: 'NewJeans', videoId: 'C3GouGa0noM' },
    { year: 2024, title: 'Heavy Is The Crown', artist: 'Linkin Park', videoId: '5FrhtahQiRc' },
    { year: 2025, title: 'Sacrifice', artist: 'G.E.M.', videoId: 'pzt6SmvGpXk' }
];

let currentAnthemId = null;

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    if (!panel) return;
    panel.classList.toggle('active');
}

function renderMusicList() {
    const list = document.getElementById('musicList');
    if (!list) return;
    list.innerHTML = WORLDS_ANTHEMS.map(song => `
        <li class="music-item${song.videoId === currentAnthemId ? ' playing' : ''}" data-video-id="${song.videoId}">
            <span class="music-year">${song.year}</span>
            <span class="music-info">
                <span class="music-song-title">${esc(song.title)}</span>
                <span class="music-artist">${esc(song.artist)}</span>
            </span>
            <span class="music-eq" aria-hidden="true">${song.videoId === currentAnthemId ? '♪' : '▶'}</span>
        </li>
    `).join('');

    const stopBtn = document.getElementById('musicStopBtn');
    if (stopBtn) stopBtn.style.display = currentAnthemId ? '' : 'none';

    const toggleBtn = document.getElementById('musicToggleBtn');
    if (toggleBtn) toggleBtn.classList.toggle('music-playing', !!currentAnthemId);
}

function playAnthem(videoId) {
    const wrap = document.getElementById('musicPlayerWrap');
    if (!wrap) return;
    const song = WORLDS_ANTHEMS.find(s => s.videoId === videoId);
    if (!song) return;

    currentAnthemId = videoId;
    // 같은 곡을 무한 반복 재생 (loop는 playlist 파라미터가 필요)
    wrap.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&playsinline=1"
            title="${esc(song.title)}"
            allow="autoplay; encrypted-media"
            allowfullscreen
        ></iframe>
    `;
    renderMusicList();
}

function stopAnthem() {
    const wrap = document.getElementById('musicPlayerWrap');
    if (wrap) wrap.innerHTML = '';
    currentAnthemId = null;
    renderMusicList();
}

let cardCollection = [];
let savedRosters = [];

// 카드 고유 키 (선수 id + 포지션)
function collectionKey(card) {
    return `${card.id}|${card.position}`;
}

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

function saveCollectionToStorage() {
    localStorage.setItem('lolDraftCollection', JSON.stringify(cardCollection));
}

function saveRostersToStorage() {
    localStorage.setItem('lolDraftRosters', JSON.stringify(savedRosters));
}

function saveToCollection() {
    if (!pendingRevealPick) return;

    const card = {
        ...pendingRevealPick,
        savedAt: new Date().toISOString()
    };

    // 같은 선수(id+포지션) 중복 저장 방지
    if (cardCollection.some(c => collectionKey(c) === collectionKey(card))) {
        showToast(t('alreadySaved'));
        return;
    }

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

function openCollection() {
    loadCollection();
    renderCollectionGrid();
    renderSavedRosters();
    document.getElementById('collectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCollection() {
    document.getElementById('collectionModal').classList.remove('active');
    document.body.style.overflow = '';
}

function switchCollectionTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName + 'Tab');
    });
}

function getFilteredCollection() {
    const filter = document.getElementById('collectionPosFilter')?.value || 'all';
    if (filter === 'all') return cardCollection;
    return cardCollection.filter(c => c.position === filter);
}

function renderCollectionGrid() {
    const grid = document.getElementById('collectionGrid');
    const filtered = getFilteredCollection();

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

    grid.innerHTML = filtered.map((card) => {
        const teamName = cleanTeamName(card.team) || card.team || '-';
        const year = resolveCardYear(card) || '????';
        const worldsWins = Number(card.worldsWins || 0);
        return `
            <div class="collection-card" data-key="${esc(collectionKey(card))}">
                <button type="button" class="card-delete-btn" aria-label="${esc(t('delete'))}" title="${esc(t('delete'))}">&times;</button>
                <span class="card-pos">${esc((card.position || '').toUpperCase())}</span>
                <div class="card-name">${worldsWins > 0 ? '🏆 ' : ''}${esc(card.name)}</div>
                <div class="card-team">${esc(teamName)}</div>
                <div class="card-year">${esc(year)}</div>
                <button type="button" class="use-btn">${t('placeToRoster')}</button>
            </div>
        `;
    }).join('');
}

// 이벤트 위임으로 컬렉션 카드 버튼 클릭 처리
document.addEventListener('click', function (e) {
    const useBtn = e.target.closest('.use-btn');
    if (useBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = useBtn.closest('.collection-card');
        if (card) placeCardByKey(card.dataset.key);
        return;
    }

    const deleteBtn = e.target.closest('.card-delete-btn');
    if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = deleteBtn.closest('.collection-card');
        if (card) deleteFromCollection(card.dataset.key);
        return;
    }

    const musicItem = e.target.closest('.music-item');
    if (musicItem) {
        playAnthem(musicItem.dataset.videoId);
    }
});

function placeCardByKey(key) {
    const card = cardCollection.find(c => collectionKey(c) === key);
    if (!card) {
        showToast(t('cardNotFound'));
        return;
    }

    if (!POSITIONS.includes(card.position)) {
        showPositionSelectForCard(key);
        return;
    }

    currentRoster[card.position] = card;
    updateSlotDisplay(card.position, card);
    updateTeamStats();
    closeCollection();
    showToast(`${card.name}${t('placed').replace('{pos}', t(card.position))}`);
}

function deleteFromCollection(key) {
    if (!confirm(t('deleteCardConfirm'))) return;
    cardCollection = cardCollection.filter(c => collectionKey(c) !== key);
    saveCollectionToStorage();
    renderCollectionGrid();
}

function filterCollection() {
    renderCollectionGrid();
}

// 포지션 정보가 없는 (옛 버전에 저장된) 카드용 포지션 선택 팝업
function showPositionSelectForCard(key) {
    const html = `
        <div class="position-select-popup">
            <h3>${t('selectPosition')}</h3>
            <div class="position-select-btns">
                ${POSITIONS.map(pos => `
                    <button onclick="placeCardWithPosition('${esc(key)}', '${pos}')">${t(pos)}</button>
                `).join('')}
            </div>
            <button class="cancel-btn" onclick="this.closest('.position-select-popup').remove()">${t('cancel')}</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

function placeCardWithPosition(key, position) {
    const card = cardCollection.find(c => collectionKey(c) === key);
    document.querySelector('.position-select-popup')?.remove();
    if (!card || !POSITIONS.includes(position)) return;

    const placedCard = { ...card, position };
    currentRoster[position] = placedCard;
    updateSlotDisplay(position, placedCard);
    updateTeamStats();
    closeCollection();
    showToast(`${card.name}${t('placed').replace('{pos}', t(position))}`);
}

// ===== 저장된 로스터 =====

function saveCurrentRoster() {
    const filledCount = POSITIONS.filter(p => currentRoster[p]).length;

    if (filledCount === 0) {
        showToast(t('noPlayersInRoster'));
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
        const playerTags = POSITIONS
            .filter(p => roster.players[p])
            .map(p => `<span class="roster-player-tag">${esc(roster.players[p].name)}</span>`)
            .join('');

        const date = new Date(roster.savedAt).toLocaleDateString(dateLocale);

        return `
            <div class="roster-item">
                <div class="roster-item-header">
                    <span class="roster-item-name">${esc(roster.name)}</span>
                    <span class="roster-item-date">${esc(date)}</span>
                </div>
                <div class="roster-item-players">${playerTags || '<span style="color:var(--muted)">-</span>'}</div>
                <div class="roster-item-actions">
                    <button class="roster-load-btn" onclick="loadRoster(${Number(roster.id)})">${t('load')}</button>
                    <button class="roster-delete-btn" onclick="deleteRoster(${Number(roster.id)})">${t('delete')}</button>
                </div>
            </div>
        `;
    }).join('');
}

function loadRoster(id) {
    const roster = savedRosters.find(r => r.id === id);
    if (!roster) return;

    POSITIONS.forEach(pos => {
        currentRoster[pos] = roster.players[pos] || null;
        updateSlotDisplay(pos, currentRoster[pos]);
    });
    updateTeamStats();

    closeCollection();
}

function deleteRoster(id) {
    if (!confirm(t('deleteRosterConfirm'))) return;
    savedRosters = savedRosters.filter(r => r.id !== id);
    saveRostersToStorage();
    renderSavedRosters();
}

// ===== 전역 이벤트 =====

// ESC 키: 리빌 → 컬렉션 순으로 닫기
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (revealActive) {
        closeReveal();
        return;
    }
    closeCollection();
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
    loadCollection();
    loadAllPlayers();
    renderMusicList();

    document.querySelectorAll('.position-slot').forEach((slot) => {
        slot.addEventListener('click', () => {
            if (revealActive) return;
            const position = slot.getAttribute('data-position');
            if (!position) return;
            // 이미 채워진 슬롯이면 선수 상세 정보, 아니면 새로 뽑기
            if (slot.classList.contains('filled')) {
                if (currentRoster[position]) openPlayerDetail(currentRoster[position]);
                return;
            }
            summonForPosition(position);
        });
    });

    // 리빌 카드 클릭 → 선수 상세 정보
    const finalCard = document.getElementById('finalCardElement');
    if (finalCard) {
        finalCard.style.cursor = 'pointer';
        finalCard.setAttribute('title', t('detailHint'));
        finalCard.addEventListener('click', () => {
            if (pendingRevealPick) openPlayerDetail(pendingRevealPick);
        });
    }

    // 선수 상세 모달 외부 클릭 닫기
    const detailModal = document.getElementById('playerDetailModal');
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target.id === 'playerDetailModal') closePlayerDetail();
        });
    }

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
