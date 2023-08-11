from django.urls import path

from mcdonaldapp.views import StartTemplateView, MenuTemplateView

app_name = "mcdonaldapp"

urlpatterns = [
    path('start/', StartTemplateView.as_view(), name='start'),
    path('menu/', MenuTemplateView.as_view(), name='index'),
]