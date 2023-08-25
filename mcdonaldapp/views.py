from django.shortcuts import render
from django.views.generic import TemplateView

from mcdonaldapp.models import Menus, Cart


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'

class SelectTemplateView(TemplateView):
    template_name = 'mcdonaldapp/index2.html'

class MenuTemplateView(TemplateView):
    template_name = 'mcdonaldapp/index.html'

    def get(request, show='default'):
        total_price = 0
        c_qs = Cart.objects.all()
        if (c_qs):
            for i in c_qs:
                total_price += i.CartPrice
            single = Menus.objects.filter(category='single')
            set = Menus.objects.filter(category='set')
            side = Menus.objects.filter(category='side')
            drink = Menus.objects.filter(category='drink')
            dessert = Menus.objects.filter(category='dessert')
            context = {'singles': single, 'sets': set, 'sides': side, 'drinks': drink, 'desserts': dessert,
                       'total_price': total_price}

            return render(request, 'index.html', context)
        else:
            return render(request, 'index.html')

class HowmanyTemplateView(TemplateView):
    template_name = 'mcdonaldapp/howmany(example).html'


    

class BasketTemplateView(TemplateView):
    template_name = 'mcdonaldapp/basket.html'

class PaymentTemplateView(TemplateView):
    template_name = 'mcdonaldapp/index3.html'

class InputcardTemplateView(TemplateView):
    template_name = 'mcdonaldapp/inputcard.html'

class InputcashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/inputcash.html'

class CompletecashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/complete.html'

