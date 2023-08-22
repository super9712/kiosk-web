from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'


class SelectTemplateView(TemplateView):
    template_name = 'mcdonaldapp/here_togo.html'


class MenuTemplateView(TemplateView):
    template_name = 'mcdonaldapp/menu.html'


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