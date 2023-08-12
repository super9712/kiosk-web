from django.urls import path

from mcdonaldapp.views import StartTemplateView, SelectTemplateView, MenuTemplateView, HowmanyTemplateView, BasketTemplateView, PaymentTemplateView, InputcardTemplateView, InputcashTemplateView, CompletecashTemplateView

app_name = "mcdonaldapp"

urlpatterns = [
    path('start/', StartTemplateView.as_view(), name='start'),
    path('select/', SelectTemplateView.as_view(), name='index2'),
    path('menu/', MenuTemplateView.as_view(), name='index'),
    path('howmany/', HowmanyTemplateView.as_view(), name='howmany(example)'),
    path('basket/', BasketTemplateView.as_view(), name='basket'),
    path('payment/', PaymentTemplateView.as_view(), name='index3'),
    path('inputcard/', InputcardTemplateView.as_view(), name='inputcard'),
    path('inputcash/', InputcashTemplateView.as_view(), name='inputcash'),
    path('complete/', CompletecashTemplateView.as_view(), name='complete'),
]