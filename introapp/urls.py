from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView, MissionTemplateView

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
    path('mission/', MissionTemplateView.as_view(), name='mission'),
]