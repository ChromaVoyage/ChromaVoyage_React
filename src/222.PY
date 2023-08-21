import json

# JSON 파일 경로 설정
json_file_path = 'D:\ChromaVoyage_Front\ChromaVoyage_React\src\TL_SCCO_SIG.json'

# JSON 파일 열기
with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

# "features" 필드 안의 데이터에 접근하여 "SIG_KOR_NM" 값 출력
for feature in data["features"]:
    sig_kor_nm = feature["properties"]["SIG_KOR_NM"]
    print(sig_kor_nm)