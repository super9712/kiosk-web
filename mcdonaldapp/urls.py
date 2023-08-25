from django.urls import path

from mcdonaldapp.views import StartTemplateView, PackingTempleteView, MenuTemplateView, HowmanyTemplateView, BasketTemplateView, PaymentTemplateView, InputcardTemplateView, InputcashTemplateView, CompletecashTemplateView

app_name = "mcdonaldapp"

urlpatterns = [
    path('start/', StartTemplateView.as_view(), name='start'),
    path('here_togo/', PackingTempleteView.as_view(), name='here_togo'),
    path('menu/', MenuTemplateView.as_view(), name='menu'),
    path('quantity/', HowmanyTemplateView.as_view(), name='quantity'),
    path('basket/', BasketTemplateView.as_view(), name='basket'),
    path('payment/', PaymentTemplateView.as_view(), name='payment'),
    path('insert_card/', InputcardTemplateView.as_view(), name='insert_card'),
    path('insert_cash/', InputcashTemplateView.as_view(), name='insert_cash'),
    path('complete/', CompletecashTemplateView.as_view(), name='complete'),
]