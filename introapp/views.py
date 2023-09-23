from django.shortcuts import render, redirect

# Create your views here.
from django.views.generic import View, TemplateView

import random

from introapp.models import Response
from megacoffeeapp.models import Menu as MegacoffeeMenu, Quantity, Option, Order, Payment as MegacoffeePayment
from mcdonaldapp.models import Menu as McdonaldMenu, Payment as McdonaldPayment

from .models import * #db 로직을 위한 import 작업
from django.http import HttpResponse,JsonResponse # megacoffee js 세션 스토리지 값 불러오는 작업(db 로직을 위한 import 작업).
import json


mega_mission = {}
mc_mission = {}

class IntroTemplateView(TemplateView):
    template_name = 'introapp/main.html'

class BrandTemplateView(TemplateView):
    template_name = 'introapp/brand.html'

class Mission_MegaTemplateView(TemplateView):
    template_name = 'introapp/mission_mega.html'

    def get(self, request):
        payments = ['카드', '모바일쿠폰', '삼성페이/애플페이', '카카오페이/네이버페이', ]
        packing_list = ['포장', '매장']

        method = random.choice(payments)
        packing = random.choice(packing_list)

        payment = {
            'payments': method,
            'packing': packing
        }

        menu = [
            '고흥 유자 망고 스무디', '고흥 유자 하이볼 에이드', '나주 플럼코트 스무디', '보성 녹차 레몬 콤부차', '코코넛 커피 스무디', '수박 화채 스무디', '수박 주스', '레드 오렌지 자몽 주스',
            '아메리카노(HOT)', '카페 라떼(HOT)', '카라멜 마끼아또(HOT)', '바닐라 라떼(HOT)', '카페 모카(HOT)', '콜드브루 오리지널(HOT)', '헤이즐넛 라떼(HOT)', '헤이즐넛 아메리카노(HOT)',
             '아메리카노(ICE)', '카페 라떼(ICE)', '카라멜 마끼아또(ICE)', '바닐라 라떼(ICE)', '카페 모카(ICE)', '콜드브루 오리지널(ICE)', '헤이즐넛 라떼(ICE)', '헤이즐넛 아메리카노(ICE)',
        ]

        option = [
            '사이즈 업', '샷 추가', '휘핑크림 추가', '휘핑크림 빼기', '추가 옵션 없음',
        ]

        quantity = [1, 2, 3]

        menus = random.sample(menu, random.randint(1, 2))  # 랜덤하게 1~2개 메뉴 선택
        options = random.sample(option, len(menus))  # 선택한 메뉴 옵션과 동일한 옵션 선택
        quantities = random.sample(quantity, len(menus))  # 선택한 메뉴 수량과 동일한 수량 선택

        order = {}
        for index in range(0, len(menus)):
            order[menus[index]] = [options[index], quantities[index]]

        context = {
            'order': order,
            'payment': payment
        }

        mega_mission.clear()
        mega_mission['order'] = order
        mega_mission['payment'] = payment

        mission_menu = ""
        mission_option = ""
        mission_quantity = ""
        mission_payment = method
        mission_packing = packing

        for index in range(0, len(menus)):
            if ( index != len(menus)-1 ):
                mission_menu = mission_menu + menus[index] + ","
                mission_option = mission_option + options[index] + ","
                mission_quantity = mission_quantity + str(quantities[index]) + ","
            else:
                mission_menu = mission_menu + menus[index]
                mission_option = mission_option + options[index]
                mission_quantity = mission_quantity + str(quantities[index])

        request.session['mega_menu'] = mission_menu
        request.session['mega_option'] = mission_option
        request.session['mega_quantity'] = mission_quantity
        request.session['mega_payment'] = mission_payment
        request.session['mega_packing'] = mission_packing

        request.session.modified = True

        return render(request, 'introapp/mission_mega.html', context)

class Mission_McTemplateView(TemplateView):
    template_name = 'introapp/mission_mc.html'

    menu_name_list = [
        "더블치즈버거세트", "치즈버거세트", "불고기 버거세트", "슈비버거세트", "슈슈버거세트", "베이컨토마토디럭스세트", "쿼터파운더치즈세트", "에그불고기세트", "더블불고기세트",
        "더블치즈버거", "불고기버거", "슈비버거", "슈슈버거", "베이컨토마토디럭스버거", "쿼터파운더치즈버거", "에그불고기버거", "더블불고기버거",
        "애플파이", "타로파이", "맥스파이시 치킨 텐더 2조각", "상하이 치킨 스낵랩", "골든 모짜렐라 치즈 스틱 2조각", "맥너겟 4조각", "후렌치 후라이", "해시 브라운", "스트링 치즈",
        "오레오 맥플러리", "초코 오레오 맥플러리", "스트로베리 오레오 맥플러리", "아이스크림콘", "초코콘", "초코 선데이 아이스크림", "스트로베리 선데이 아이스크림", "오레오 아포카토",
        "바닐라 쉐이크", "딸기 쉐이크", "초코 쉐이크", "오렌지 주스", "코카 콜라", "코카 콜라 제로", "스프라이트", "환타", "우유"
    ]
    quantity = [1, 2, 3]

    def get(self, request):
        payments = ['카드', '현금']
        packing = ['포장', '매장']

        method = random.choice(payments)
        packing = random.choice(packing)

        payment = {
            'payments': method,
            'packing': packing
        }

        menus = random.sample(self.menu_name_list, random.randint(1, 2))                    # 랜덤하게 1~3개 메뉴 선택 / 리스트로 반환됨
        quantities = random.sample(self.quantity, len(menus))                               # 선택한 메뉴 수량과 동일한 수량 선택

        result = dict(zip(menus, quantities))

        context = {'order': result, 'payment': payment}

        mc_mission.clear()
        mc_mission['order'] = result
        mc_mission['payment'] = payment

        mission_menu = ""
        mission_quantity = ""
        mission_payment = method
        mission_packing = packing

        for index in range(0, len(menus)):
            mission_menu = mission_menu + menus[index] + ","
            mission_quantity = mission_quantity + str(quantities[index]) + ","

        request.session['mega_menu'] = mission_menu
        request.session['mega_quantity'] = mission_quantity
        request.session['mega_payment'] = mission_payment
        request.session['mega_packing'] = mission_packing

        request.session.modified = True

        return render(request, self.template_name, context)



class CompleteTemplateView(TemplateView):
    template_name = 'introapp/complete.html'

    def get(self, request):
        brand = request.GET.get('brand')
        payment_pk = request.GET.get('payment_pk')

        if brand == 'mcdonald':
            payment = McdonaldPayment.objects.get(id=payment_pk)
            menus = McdonaldMenu.objects.filter(payment_id=payment_pk)

            # 맥도날드 정확도 측정
            total = 2
            correct = 0
            if payment.method == mc_mission['payment']['payments']:
                correct += 1
            if payment.packing == mc_mission['payment']['packing']:
                correct += 1
            for menu in menus:
                total += 2
                for mission_menu, mission_quantity in mc_mission['order'].items():
                    if menu == mission_menu:
                        correct += 1
                    if menu.quantity == mission_quantity:
                        correct += 1

            accuracy = correct/total*100

            #db로직 추가한 코드
            mc_accuracy = Complete(accuracy = round(accuracy,2), totalTime = random.randint(27,100)) #round(accuracy,2): 소수점 둘째자리까지 반올림.
            mc_accuracy.save()
            

            context = {'brand': brand, 'payment': payment, 'menus': menus,
                       'mission_order': mc_mission['order'], 'mission_payment': mc_mission['payment'],
                       'accuracy': accuracy}

            return render(request, 'introapp/complete.html', context)

        elif brand == 'megacoffee':
            #data = json.loads(request.body.decode('utf-8'))
            #remain_time = data.get('remain_time', None)
            #accuracy = data.get('accuracy', None)

            #print(remain_time)
            #print(accuracy)
            #print("프린트")

            #if remain_time is not None and accuracy is not None:
                # remain_time과 accuracy를 사용하여 원하는 작업 수행
                # 예를 들어, 데이터베이스에 저장할 수 있습니다.
                #db로직 추가한 코드

             #   mega_accuracy = Complete(totalTime = remain_time, accuracy = accuracy) #round(accuracy,2): 소수점 둘째자리까지 반올림.
             #   mega_accuracy.save()
            
            #db로직 추가한 코드
            accuracy = random.uniform(0,100) #실수형
            totalTime = random.randint(20,100)
            mega_accuracy = Complete(accuracy = round(accuracy,2), totalTime = totalTime) #round(accuracy,2): 소수점 둘째자리까지 반올림.
            mega_accuracy.save()
            

        context = {'brand': brand, 'accuracy': accuracy, 'totalTime': totalTime, 'mission_order': mega_mission['order'], 'mission_payment': mega_mission['payment']}
        return render(request, 'introapp/complete.html', context)

class SurveyView(View):
    template_name = 'introapp/survey.html'

    question_list = {
        '키오스크 사용하는 과정에서 어려웠던 부분을 골라주세요': ['메뉴선택', '추가옵션', '결제하기'],
        '시니스크를 사용하면서 불편한 점이 있었나요?': ['글씨가 작다', '버튼이 작다', '화면의 어디를 눌러야 할 지 모르겠다', '선택할게 많다', '그냥 모르겠다'],
        '시니스크가 도움이 되었나요?': ['자신감 상승', '뒷사람에 대한 부담감이 없다', '간편하게 키오스크를 경험할 수 있어 좋았다', '익숙해졌다', '반복 연습할 수 있어서 적응이 쉬웠다',
                            '전혀 도움이 안된다'],
        '해당 기업에서 키오스크를 사용하는 것에 불편한 점은 무엇인가요?': ['메뉴가 너무 다양해서 찾기 힘들다', '추가 옵션이 많아 설정이 어렵다', '메뉴 이름이 어렵고 직관적이지 않다',
                                                '여러 메뉴를 주문하기 까다롭다'],
        '연습한 기업의 키오스크가 반영했으면 하는 부분은 무엇인가요?': ['명확한 단계 표시', '메뉴 단순화', '버튼 크기 키우기', '글씨 크기 키우기', '요구를 간단하게',
                                              '뒤로가기 버튼 찾기 쉽게 표시'],
        '새로 추가되었으면 하는 브랜드는 어디인가요?': ['롯데리아', '버거킹', '이디야', '베스킨라빈스']
    }

    def get(self, request):
        context = {'questions': self.question_list}
        return render(request, self.template_name, context)

    def post(self, request):
        for index in range(6):
            response = Response.objects.create(question=list(self.question_list.keys())[index], answer=request.POST.get('answer_list_' + str(index)), brand='megacoffee')
            response.save()

        return redirect('introapp:brand')


