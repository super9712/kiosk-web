from django_seed import Seed
from megacoffeeapp.models import Menu, Quantity, Option

seeder = Seed.seeder()

menu_name_field = [
    '고흥 유자망고 스무디', '고흥 유자 하이볼 에이드', '나주 플럼코트 스무디', '보성 녹차레몬 콤부차', '코코넛 커피 스무디', '수박화채 스무디', '수박주스', '레드 오렌지 자몽주스',
    '아메리카노', '카페라떼', '카라멜 마끼야또', '바닐라라떼', '카페모카', '콜드브루 오리지널', '헤이즐넛라떼', '헤이즐넛 아메리카노',
    '아이스 아메리카노', '아이스 카페라떼', '아이스 카라멜 마끼야또', '아이스 바닐라 라떼', '아이스 카페모카', '아이스 콜드브루 오리지널', '아이스 헤이즐넛라떼', '아이스 헤이즐넛 아메리카노',
]

quantity_value_field = list(range(1, 11))

option_name_field = [
    '사이즈업', '샷추가', '휘핑크림 추가', '휘핑크림 빼기', ' ',
]

for name in menu_name_field:
    seeder.add_entity(Menu, 1, {
        'name': name,
    })

for value in quantity_value_field:
    seeder.add_entity(Quantity, 1, {
        'value': value,
    })

for name in option_name_field:
    seeder.add_entity(Option, 1, {
        'name': name,
    })

seeder.execute()
