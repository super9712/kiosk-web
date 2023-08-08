from django.urls import path

from megacoffeeapp.views import StartTemplateView

app_name = "megacoffeeapp"

urlpatterns = [
    path('start/', StartTemplateView.as_view(), name='start'),
]