import json

menu_name_field = [
    '고흥 유자망고 스무디', '고흥 유자 하이볼 에이드', '나주 플럼코트 스무디', '보성 녹차레몬 콤부차', '코코넛 커피 스무디', '수박화채 스무디', '수박주스', '레드 오렌지 자몸주스',
    '아메리카노', '카페라떼', '카라멜 마끼야또', '바닐라라떼', '카페모카', '콜드브루 오리지널', '헤이즐넛라떼', '헤이즐넛 아메리카노',
    '아이스 아메리카노', '아이스 카페라떼', '아이스 카라멜 마끼야또', '아이스 바닐라 라떼', '아이스 카페모카', '아이스 콜드브루 오리지널', '아이스 헤이즐넛라떼', '아이스 헤이즐넛 아메리카노',
]

quantity_value_field = list(range(1, 51))

option_name_field = [
    '사이즈업', '샷추가', '휘핑크림 추가', '휘핑크림 빼기', ' ',
]

menu_list = []
for menu_name in menu_name_field:
    menu = {"model": "megacoffeeapp.menu", "pk": len(menu_list) + 1, "fields": {"name": menu_name}}
    menu_list.append(menu)

quantity_list = []
for quantity_value in quantity_value_field:
    quantity = {"model": "megacoffeeapp.quantity", "pk": len(quantity_list) + 1, "fields": {"value": quantity_value}}
    quantity_list.append(quantity)

option_list = []
for option_name in option_name_field:
    option = {"model": "megacoffeeapp.option", "pk": len(option_list) + 1, "fields": {"name": option_name}}
    option_list.append(option)

data = menu_list + quantity_list + option_list

with open('kiosk_web/fixtures/seed_data', 'w') as f:
    json.dump(data, f, indent=2)
