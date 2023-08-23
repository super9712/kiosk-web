from django.shortcuts import render, redirect, reverse
from django.http import HttpResponseRedirect

from django.views.generic import TemplateView
from mcdonaldapp.models import Payment, Menu


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'


class PackingTempleteView(TemplateView):
    template_name = 'mcdonaldapp/here_togo.html'


class MenuTemplateView(TemplateView):
    model = Payment
    template_name = 'mcdonaldapp/menu.html'

    def get(self, request, *args, **kwargs):
        packing = request.GET.get('packing', '')
        return render(request, 'mcdonaldapp/menu.html', {'packing': packing})

class HowmanyTemplateView(TemplateView):
    template_name = 'mcdonaldapp/quantity.html'



class BasketTemplateView(TemplateView):
    template_name = 'mcdonaldapp/basket.html'


class PaymentTemplateView(TemplateView):
    template_name = 'mcdonaldapp/payment.html'


class InputcardTemplateView(TemplateView):
    template_name = 'mcdonaldapp/insert_card.html'


class InputcashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/insert_cash.html'


class CompletecashTemplateView(TemplateView):
    template_name = 'mcdonaldapp/complete.html'