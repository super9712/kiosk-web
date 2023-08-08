from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class IntroTemplateView(TemplateView):
    template_name = 'introapp/main.html'
