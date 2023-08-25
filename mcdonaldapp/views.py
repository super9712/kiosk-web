from django.shortcuts import render, redirect, reverse
from django.http import HttpResponseRedirect, JsonResponse

from django.views.generic import TemplateView
from mcdonaldapp.models import Payment, Menu


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'


class PackingTempleteView(TemplateView):
    template_name = 'mcdonaldapp/here_togo.html'


class MenuTemplateView(TemplateView):
    template_name = 'mcdonaldapp/menu.html'

    def get(self, request, *args, **kwargs):
        set_list = {'더블 치즈 버거 세트': ['double cheese set', 6700], '치즈 버거 세트': ['cheese burger set', 5500], '불고기 버거 세트': ['bulgogi set', 4900], '슈비 버거 세트': ['shbe set', 8000],
                    '슈슈 버거 세트': ['susu set', 6500], '베이컨 토마토 디럭스 세트': ['bacon tomato set', 7800], '쿼터 파운더 치즈 세트': ['QuaterPounderSet', 7500],
                    '에그 불고기 세트': ['EggBulgogiSet', 5500], '더블 불고기 세트': ['DoubleBulgogiSet', 6200]}

        single_list = {'더블 치즈 버거': ['DoubleCheese', 5100], '치즈 버거': ['Cheese', 2900], '불고기 버거': ['Bulgogi', 2700], '슈비 버거': ['Shbe', 6200], '슈슈 버거': ['Susu', 5000],
                       '베이컨 토마토 디럭스': ['BaconTomato', 6000], '쿼터 파운드 치즈': ['QuaterPounder', 5700], '에그 불고기': ['EggBulgogi', 3700], '더블 불고기': ['DoubleBulgogi', 5100]}

        side_list = {'애플 파이': ['ApplePie', 1700], '타로 파이': ['taro-pie', 1700], '맥스파이시 치킨 텐더 2조각': ['ChickenTender', 3200], '상하이 치킨 스낵랩': ['SnackWrap', 2700],
                     '골든 모짜렐라 치즈 스틱 2조각': ['CheeseStick', 2700], '맥너겟 4조각': ['MacNuggets', 2400], '후렌치 후라이': ['Fries', 2300],
                     '해시 브라운': ['HashBrown', 2000], '스트링 치즈': ['StringCheese', 2300]}

        dessert_list = {'오레오 맥플러리': ['OreoMc', 3200], '초코 오레오 맥플러리': ['ChcoOreo', 3500], '스트로베리 오레오 맥플러리': ['StrawberryOreo', 3500],
                   '아이스크림콘': ['IcecreamCone', 800], '초코콘': ['ChocoCone', 1000], '초코 선데이 아이스크림': ['ChocoSundae', 2200], '스트로베리 선데이 아이스크림': ['BerrySundae', 2200],
                   '카라멜 선데이 아이스크림': ['CaramelSundae', 2200], '오레오 아포카토': ['OreoAffo', 2300]}

        drink_list = {'바닐라 쉐이크': ['VanillaShake', 3200], '딸기 쉐이크': ['StrawberryShake', 3200], '초코 쉐이크': ['ChocoShake', 3200], '오렌지 주스': ['OrangeJuice', 1000],
                      '코카 콜라': ['CocaCola', 2000], '코카 콜라 제로': ['ColaZero', 2000], '스프라이트': ['Sprite', 2000], '환타': ['Fanta', 2000], '우유': ['milk', 1000]}

        packing = request.GET.get('packing', '')
        context = {'packing': packing, 'sets': set_list, 'singles': single_list, 'sides': side_list, 'desserts': dessert_list, 'drinks': drink_list}
        return render(request, 'mcdonaldapp/menu.html', context)

class HowmanyTemplateView(TemplateView):
    template_name = 'mcdonaldapp/quantity.html'

    def get(self, request):
        name = request.GET.get('name')
        image = request.GET.get('image')
        price = request.GET.get('price')
        packing = request.GET.get('packing')
        context = {'packing': packing, 'name': name, 'image': image, 'price': price}
        return render(request, 'mcdonaldapp/quantity.html', context)


class BasketTemplateView(TemplateView):
    model = Menu
    template_name = 'mcdonaldapp/basket.html'
    menu_list = {}

    def get(self, request):
        name = request.GET.get('name')
        price = int(request.GET.get('price'))
        # quantity = request.GET.get('quantity')
        self.menu_list[name] = price
        print(self.menu_list)
        total_price = 0
        for price in self.menu_list.values():
            total_price += price
        packing = request.GET.get('packing')
        context = {'packing': packing, 'menus': self.menu_list, 'total_price': total_price}
        return render(request, 'mcdonaldapp/basket.html', context)

    def post(self, request):
        name = request.POST.get('name')
        print(name)
        del self.menu_list[name]
        return JsonResponse({'status': 'success'})



class PaymentTemplateView(TemplateView):
    template_name = 'mcdonaldapp/payment.html'


class InputcardTemplateView(TemplateView):
    template_name = 'mcdonaldapp/insert_card.html'


class InputcashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/insert_cash.html'


class CompletecashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/complete.html'