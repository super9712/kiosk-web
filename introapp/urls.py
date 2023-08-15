from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView, Mission_MegaTemplateView, CompleteTemplateView, \
    Mission_McTemplateView, SurveyView

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
    path('mission_mega/', Mission_MegaTemplateView.as_view(), name='mission_mega'),
    path('complete/', CompleteTemplateView.as_view(), name='complete'),
    path('survey/', SurveyView.as_view(), name='survey'),
    # path('question1/', Question1.as_view(), name = 'question1'),
    # path('question2/', Question2.as_view(), name = 'question2'),
    # path('question3/', Question3.as_view(), name='question3'),

    path('mission_mc', Mission_McTemplateView.as_view(), name='mission_mc')

]