import pandas as pd
import json
import os
import glob

def generate_roster_with_nationality():
    csv_files = glob.glob("*.csv")
    
    if not csv_files:
        print("❌ CSV 파일을 찾을 수 없습니다.")
        return

    # 리그별 기본 국적 매핑 테이블
    nation_map = {
        'LCK': 'KR', 'OGN': 'KR', 'CHAMPIONS': 'KR', 'MASTERS': 'KR',
        'LPL': 'CN',
        'LEC': 'EU', 'EU LCS': 'EU',
        'LCS': 'US', 'NA LCS': 'US',
        'LMS': 'TW', 'PCS': 'TW',
        'VCS': 'VN',
        'WORLDS': 'INT', 'WCS': 'INT'
    }

    for file_path in csv_files:
        year = "".join(filter(str.isdigit, file_path))[:4]
        if not year: continue
        
        try:
            df = pd.read_csv(file_path, low_memory=False)
            df.columns = [c.lower() for c in df.columns]

            role_map = {
                'top': 'top', 'jng': 'jungle', 'jungle': 'jungle',
                'mid': 'mid', 'bot': 'adc', 'adc': 'adc', 'sup': 'support'
            }

            major_leagues = list(nation_map.keys())
            df['league_upper'] = df['league'].str.upper()
            
            filtered_df = df[
                (df['league_upper'].isin(major_leagues)) & 
                (df['position'].str.lower() != 'team')
            ].copy()

            result = {"top": [], "jungle": [], "mid": [], "adc": [], "support": []}
            seen = set()

            for _, row in filtered_df.iterrows():
                p_name = str(row['playername'])
                t_name = str(row['teamname'])
                pos = str(row['position']).lower().strip()
                l_name = str(row['league']).upper()
                
                mapped_pos = role_map.get(pos)
                if mapped_pos:
                    key = f"{p_name}_{t_name}_{mapped_pos}"
                    if key not in seen:
                        # 리그 이름을 기준으로 국적 결정
                        nationality = nation_map.get(l_name, "ETC")
                        
                        player_obj = {
                            "id": f"{p_name.lower()}_{year}",
                            "name": p_name,
                            "team": t_name,
                            "image": f"https://lol.fandom.com/wiki/Special:FilePath/{p_name}_profileicon.png",
                            "years": year,
                            "nationality": nationality, # 국적 필드 추가
                            "league": l_name,
                            "seasonTeam": f"{t_name} ({year})"
                        }
                        result[mapped_pos].append(player_obj)
                        seen.add(key)

            with open(f"players_{year}_nation.json", 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
            print(f"✅ {year}년 완료! (국적 포함)")

        except Exception as e:
            print(f"❌ {file_path} 에러: {e}")

if __name__ == "__main__":
    generate_roster_with_nationality()