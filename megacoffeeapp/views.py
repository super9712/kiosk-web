from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class StartTemplateView(TemplateView):
     template_name = 'megacoffeeapp/start.html'

class QuestionTemplateView(TemplateView):
     template_name = 'megacoffeeapp/question.html'

class MenuTemplateView(TemplateView):
     template_name = 'megacoffeeapp/start_2.html'

class ReceiptTemplateView(TemplateView):
     template_name = 'megacoffeeapp/receipt.html'

class CardTemplateView(TemplateView):
     template_name = 'megacoffeeapp/pay_card.html'

class CouponTemplateView(TemplateView):
     template_name = 'megacoffeeapp/pay_coupon.html'

class PhoneTemplateView(TemplateView):
     template_name = 'megacoffeeapp/pay_phone.html'

class BarcodeTemplateView(TemplateView):
     template_name = 'megacoffeeapp/pay_barcode.html'

