from django.shortcuts import render, redirect

# Create your views here.
from django.views.generic import TemplateView

import random

from introapp.models import Question


class IntroTemplateView(TemplateView):
    template_name = 'introapp/main.html'

class BrandTemplateView(TemplateView):
    template_name = 'introapp/brand.html'

class Mission_MegaTemplateView(TemplateView):
    template_name = 'introapp/mission_mega.html'
    def get(self, request):
        mission_list = {
            "사과 유자차": "사과 유자차 2잔을 포장해주세요 한잔은 차가운거, 한잔은 뜨거운 것으로 부탁합니다.",
            "카페모카": "카페모카 시럽추가 해서 얼음 적게 한잔 매장에서 먹고 갈게요.",
            "복숭아 아이스티": "복숭아 아이스티에 샷추가 하고 쿠폰 사용할게요 차액은 카드결제로 하고 포장해갈게요.",
            "얼그레이차": "얼그레이차 따듯하게 시럽 추가해서 포장해갈게요.",
            "초코허니퐁크러쉬": "초코허니퐁크러쉬 한잔과 바나나 퐁크러쉬 두잔을 매장에서 먹고갈게요.",
            "유니콘 매직에이드": "유니콘 매직에이드 블루 한잔과 유니콘 프라페 두잔 포장해 갈게요.",
            "아메리카노": "아이스 아메리카노 5잔, 카페라떼 뜨거운 걸로 3잔 포장해갈게요.",
            "체리콕": "체리콕 2잔 매장에서 먹고갈게요.",
            "꿀 아메리카노": "꿀 아메리카노 한잔과 바닐라 아메리카노 따듯하게 한잔과 바닐라 라떼에 샷추가 해서 따듯하게 한잔 포장으로 주문해주세요.",
            "연유라떼": "연유라떼 두잔 중 한잔은 디카페인으로 변경할게요 둘 다 뜨거운 걸로 포장해주세요.",
            "딸기라떼": "딸기라떼 차갑게 한잔과 딸기쿠키프라페에 휘핑크림 올려서 한잔 주문할게요 먹고갈게요.",
            "고흥 유자망고": "고흥 유자망고 스무디 두잔과 나주 플럼코트 스무디 한잔 포장해 갈게요.",
            "에스프레소": "에스프레소 피에노 한잔 먹고갈게요.",
            "쿠키프라페": "쿠키프라페 휘핑크림 추가해주시고요 고구마라떼 한잔 주세요 포장해갈게요.",
            "아메리카노": "아이스 아메리카노 한잔 먹고갈게요.",
            "흑당버블밀크티": "흑당버블밀크티 하나 포장해갈게요.",
            "오레오 초코라떼": "오레오 초코라떼 휘핑크림 없이 포장해갈게요.",
            "메가초코": "메가초코 3잔 포장해갈게요.",
            "카푸치노": "카푸치노 따듯하게 시나몬 파우더 없이 우유는 아몬드밀크로 변경해서 포장해갈게요.",
            "아메리카노": "아이스 아메리카노 샷추가해서 얼음 많이 포장해갈게요."
        }
        mission_menu = random.choice(list(mission_list.keys()))
        mission = mission_list[mission_menu]
        return render(request, 'introapp/mission_mega.html', {'mission_menu': mission_menu, 'mission': mission})


class CompleteTemplateView(TemplateView):
    template_name = 'introapp/complete.html'

class Mission_McTemplateView(TemplateView):
    template_name = 'introapp/mission_mc.html'

class Question1(TemplateView):

    template_name = 'introapp/question1.html'
    next_url = 'introapp:question2'
    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        answers= []
        for i in range(1, 3):
            answer = request.POST.get(f'answer{i}')
            answers.append(answer)

        request.session['answers'] = answers
        return redirect(self.next_url)

class Question2(TemplateView):
    template_name = 'introapp/question2.html'
    next_url = 'introapp:question3'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        answers= []
        for i in range(1, 3):
            answer = request.POST.get(f'answer{i+2}')
            answers.append(answer)

        request.session['answers'] = answers
        return redirect(self.next_url)

class Question3(TemplateView):
    template_name = 'introapp/question3.html'
    next_url = 'introapp:complete'

    def post(self, request):
        answers = request.session.pop('answers')
        for i in range(1, 3):
            answer = request.POST.get(f'answer{i+4}')
            answers.append(answer)

        return redirect(self.next_url)