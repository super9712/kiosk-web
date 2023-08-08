from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class StartTemplateView(TemplateView):
     template_name = 'megacoffeeapp/start.html'