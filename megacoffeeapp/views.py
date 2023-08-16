from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.generic import TemplateView
from megacoffeeapp.models import Payment


class MissionDetailView(TemplateView):
     model = Payment
     template_name = 'megacoffeeapp/start.html'

     def get_context_data(self, **kwargs):
          context = super().get_context_data(**kwargs)
          payment_pk = self.kwargs.get('payment_pk')
          payment = Payment.objects.get(pk=payment_pk)

          context['payment'] = payment

          return context


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

class PayingTemplateView(TemplateView):
     template_name = 'megacoffeeapp/paying.html'
     
class PayCompleteTemplateView(TemplateView):
     template_name = 'megacoffeeapp/pay_complete.html'

class HotCoffeeTemplateView(TemplateView):
     template_name = 'megacoffeeapp/hot_coffee.html'

class IceCoffeeTemplateView(TemplateView):
     template_name = 'megacoffeeapp/ice_coffee.html'


