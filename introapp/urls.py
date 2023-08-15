from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView, Mission_MegaTemplateView, CompleteTemplateView, \
    Mission_McTemplateView, Question1_TemplateView, Question2_TemplateView, Question3_TemplateView

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
    path('mission_mega/', Mission_MegaTemplateView.as_view(), name='mission_mega'),
    path('complete/', CompleteTemplateView.as_view(), name='complete'),
    path('question1/', Question1_TemplateView.as_view(), name = 'question1'),
    path('question2/', Question2_TemplateView.as_view(), name = 'question2'),
    path('question3/', Question3_TemplateView.as_view(), name='question3'),

    path('mission_mc', Mission_McTemplateView.as_view(), name='mission_mc')

]