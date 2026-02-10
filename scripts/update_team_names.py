import json
import glob
import os

# mapping function
def get_mapped_team(year):
    y = int(year)
    if y == 2014:
        return 'Anarchy'
    if y == 2015:
        return 'Rebels Anarchy'
    if 2016 <= y <= 2021:
        return 'Afreeca Freecs'
    if 2022 <= y <= 2024:
        return 'KWANGDONG FREECS'
    if y == 2025:
        return 'DN FREECS'
    if y >= 2026:
        return 'DN SOOPers'
    return None

# keywords to identify the org in existing team names
keywords = ['anarchy','rebel','afreeca','kwang','kwangdong','dn free','dnsoop','dn soop','dn freecs','freecs']

files = glob.glob('players_*_final.json')
summary = {}

for fp in files:
    fname = os.path.basename(fp)
    try:
        year = fname.split('_')[1]
    except Exception:
        continue
    mapped = get_mapped_team(year)
    if not mapped:
        continue

    with open(fp, 'r', encoding='utf-8') as f:
        data = json.load(f)

    changed = 0
    # data expected to be dict with positions
    for pos, players in data.items():
        if not isinstance(players, list):
            continue
        for p in players:
            team = p.get('team','') or ''
            team_lower = team.lower()
            # if any keyword in team, update
            if any(k in team_lower for k in keywords):
                new_team = mapped
                p['team'] = new_team
                p['seasonTeam'] = f"{new_team} ({year})"
                changed += 1

    if changed > 0:
        with open(fp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    summary[fp] = changed

# print summary
print('Update summary:')
for k,v in sorted(summary.items()):
    print(f"{k}: {v} players updated")

print('\nDone')
