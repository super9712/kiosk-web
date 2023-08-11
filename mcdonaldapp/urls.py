from django.urls import path

from mcdonaldapp.views import StartTemplateView

app_name = "mcdonaldapp"

urlpatterns = [
    path('start/', StartTemplateView.as_view(), name='start'),
]