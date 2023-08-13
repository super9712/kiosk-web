from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'

class SelectTemplateView(TemplateView):
    template_name = 'mcdonaldapp/index2.html'

class MenuTemplateView(TemplateView):
    template_name = 'mcdonaldapp/index.html'

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

