from django.urls import path

from megacoffeeapp.views import StartTemplateView, QuestionTemplateView, MenuTemplateView, ReceiptTemplateView, CardTemplateView, CouponTemplateView, PhoneTemplateView, BarcodeTemplateView, PayingTemplateView, PayCompleteTemplateView

app_name = "megacoffeeapp"

urlpatterns = [
    path('start/<str:mission>', StartTemplateView.as_view(), name='start'),
    path('question/', QuestionTemplateView.as_view(), name='question'),
    path('menu/', MenuTemplateView.as_view(), name='start_2'),
    path('receipt/', ReceiptTemplateView.as_view(), name='receipt'),
    path('card/', CardTemplateView.as_view(), name='pay_card'),
    path('coupon/', CouponTemplateView.as_view(), name='pay_coupon'),
    path('phone/', PhoneTemplateView.as_view(), name='pay_phone'),
    path('barcode/', BarcodeTemplateView.as_view(), name='pay_barcode'),
    path('paying/', PayingTemplateView.as_view(), name='paying'),
    path('pay_complete/', PayCompleteTemplateView.as_view(), name='pay_complete')
]