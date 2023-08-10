from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
]