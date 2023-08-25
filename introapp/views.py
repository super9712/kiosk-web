from django.shortcuts import render, redirect

# Create your views here.
from django.views.generic import View, TemplateView

import random

from introapp.models import Response
from megacoffeeapp.models import Menu, Quantity, Option, Order, Payment



class IntroTemplateView(TemplateView):
    template_name = 'introapp/main.html'

class BrandTemplateView(TemplateView):
    template_name = 'introapp/brand.html'

class Mission_MegaTemplateView(TemplateView):
    model = Payment
    template_name = 'introapp/mission_mega.html'
    def get(self, request):
        payments = ['카드', '모바일쿠폰', '삼성페이/애플페이', '카카오페이/네이버페이', ]
        packaging = ['포장', '매장']

        method = random.choice(payments)
        packaging = random.choice(packaging)

        menus = random.sample(list(Menu.objects.all()), random.randint(1, 3))  # 랜덤하게 1~3개 메뉴 선택
        quantities = random.sample(list(Quantity.objects.all()), len(menus))  # 선택한 메뉴 수량과 동일한 수량 선택
        options = random.sample(list(Option.objects.all()), len(menus))  # 선택한 메뉴 옵션과 동일한 옵션 선택
        menu_names = [menu.name for menu in menus]
        quantity_names = [quantity.value for quantity in quantities]
        option_names = [option.name for option in options]

        orders = []
        for menu_id, quantity_id, option_id in zip(menu_names, quantity_names, option_names):
            menu = Menu.objects.get(name=menu_id)
            quantity = Quantity.objects.get(value=quantity_id)
            option = Option.objects.get(name=option_id)

            order = Order.objects.create(menu=menu, quantity=quantity, option=option)
            orders.append(order)

        payment = Payment.objects.create(method=method, packaging=packaging)
        for order in orders:
            payment.orders.add(order)  # 모든 주문을 하나의 결제에 연결
        payment.save()

        return render(request, 'introapp/mission_mega.html', {'payment': payment})


class CompleteTemplateView(TemplateView):
    template_name = 'introapp/complete.html'

class Mission_McTemplateView(TemplateView):
    template_name = 'introapp/mission_mc.html'


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
        list_item = request.POST.getlist('answer_list')

        for index in range(6):
            response = Response.objects.create(question=list(self.question_list.keys())[index], answer=list_item[index], brand='megacoffee')
            response.save()

        return redirect('introapp:brand')


