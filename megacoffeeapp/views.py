from django.shortcuts import render, get_object_or_404
import json
import pytz
from datetime import datetime
from dateutil import parser

# Create your views here.
from django.views.generic import TemplateView
from megacoffeeapp.models import Payment, Page, Button

class MissionDetailView(TemplateView):
     # model = Payment
     template_name = 'megacoffeeapp/start.html'

     #def get_context_data(self, **kwargs):        # 여기 없애면 complete에서 원래 미션 품목 안보임, 근데 없애야 start 화면으로 넘어옴
          #context = super().get_context_data(**kwargs)
          #payment_pk = self.kwargs.get('payment_pk')
          #payment = Payment.objects.get(pk=payment_pk)

          #context['payment'] = payment

          #return context


class QuestionTemplateView(TemplateView):
     template_name = 'megacoffeeapp/question.html'


class MenuTemplateView(TemplateView):
     template_name = 'megacoffeeapp/start_2.html'

     def post(self, request):
          data = json.loads(request.body.decode('utf-8'))
          click_data = data.get('data', None)
          index = len(click_data)

          button_name = click_data[index-1]['button_name']
          time = click_data[index - 1]['datetime']
          #time :Sat Sep 23 2023 02:43:40 GMT+0900 (한국 표준시)
          time_without_timezone = time.replace(' GMT+0900 (한국 표준시)', '')
          click_time = parser.parse(time_without_timezone)

          korea_timezone = pytz.timezone('Asia/Seoul')

          click_time = click_time.replace(tzinfo=korea_timezone)
          right = True

          page, created = Page.objects.get_or_create(brand='megacoffee', name='menu')

          button = Button.objects.create(page=page, button_name=button_name, click_time=click_time, is_right=right)

          return render(request, 'megacoffeeapp/start_2.html')



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


