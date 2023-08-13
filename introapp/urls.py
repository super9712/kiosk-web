from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView, Mission_MegaTemplateView, CompleteTemplateView, \
    Mission_McTemplateView, Question1_TemplateView

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
    path('mission_mega/', Mission_MegaTemplateView.as_view(), name='mission_mega'),
    path('complete/', CompleteTemplateView.as_view(), name='complete'),
    path('question1/', Question1_TemplateView.as_view(), name = 'question1'),
    path('mission_mc', Mission_McTemplateView.as_view(), name='mission_mc')

]