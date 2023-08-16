from django.shortcuts import render, redirect

# Create your views here.
from django.views.generic import View, TemplateView

import random

from introapp.models import Question, Answer, Response
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

    def get(self, request):
        questions = Question.objects.all()
        context = {'questions': questions}
        return render(request, self.template_name, context)

    def post(self, request):
        for question_id, answer_ids in request.POST.items():
            if question_id.startswith('question_'):
                question_id = question_id.replace('question_', '')
                question = Question.objects.get(id=question_id)
                selected_answers = Answer.objects.filter(id__in=answer_ids.split(','))
                response = Response(question=question)
                response.brand = 'megacoffee'
                response.save()
                response.answer.set(selected_answers)
        return redirect('introapp:brand')

