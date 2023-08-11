from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class StartTemplateView(TemplateView):
    template_name = 'mcdonaldapp/start.html'