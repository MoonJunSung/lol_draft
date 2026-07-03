# lol_draft

https://loldraft.site/

https://worlds-roster-draft-922883091956.us-west1.run.app/ 참고해서 시작한 프로젝트입니다.

2014~2026 https://oracleselixir.com/tools/downloads 데이터를 사용하였습니다.

사람이 개입하지 않은 프로젝트입니다.

## 구조

| 경로 | 설명 |
|---|---|
| `index.html`, `script.js`, `styles.css` | 배포되는 정적 사이트 |
| `players_{year}_final.json` | 연도별 선수 데이터 (사이트가 fetch) |
| `scripts/generate_players.py` | Oracle's Elixir CSV → JSON 생성 |
| `scripts/patch_player_data.mjs` | 월즈 우승 기록(`worldsWins`) 및 해외 리그 한국인 선수 국적 보정 |
| `scripts/data/` | 원본 CSV 보관 (배포 제외 대상) |

## 데이터 갱신 방법

```bash
# 1. Oracle's Elixir CSV를 scripts/data/ 에 다운로드
# 2. JSON 생성
python scripts/generate_players.py
# 3. 월즈 우승/국적 보정 (필수 — weightedPick 가중치와 우승자 배지가 이 필드를 사용)
node scripts/patch_player_data.mjs
```

> 배포 시 `scripts/` 폴더(원본 CSV 21MB 포함)는 제외하세요.
