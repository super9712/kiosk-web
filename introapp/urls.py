from django.urls import path

from introapp.views import IntroTemplateView, BrandTemplateView, Mission_MegaTemplateView, CompleteTemplateView, \
<<<<<<< HEAD
    Mission_McTemplateView, SurveyView
=======
    Mission_McTemplateView, Question1, Question2, Question3
>>>>>>> 87e485f88ab8a24779b4bd0f3b964b339404c6f1

app_name = "introapp"

urlpatterns = [
    path('', IntroTemplateView.as_view(), name='main'),
    path('brand/', BrandTemplateView.as_view(), name='brand'),
    path('mission_mega/', Mission_MegaTemplateView.as_view(), name='mission_mega'),
    path('complete/', CompleteTemplateView.as_view(), name='complete'),
    path('survey/', SurveyView.as_view(), name='survey'),
    path('mission_mc', Mission_McTemplateView.as_view(), name='mission_mc')

]