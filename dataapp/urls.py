from django.urls import path

from dataapp.views import dataTemplateView, megacoffeeView

app_name = "dataapp"

urlpatterns = [
    path('main/', dataTemplateView.as_view(), name='main'),
    path('megacoffee/', megacoffeeView.as_view(), name='megacoffee'),
]