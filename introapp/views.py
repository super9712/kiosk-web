from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class IntroTemplateView(TemplateView):
    template_name = 'introapp/main.html'

class BrandTemplateView(TemplateView):
    template_name = 'introapp/brand.html'

class Mission_MegaTemplateView(TemplateView):
    template_name = 'introapp/mission_mega.html'

class CompleteTemplateView(TemplateView):
    template_name = 'introapp/complete.html'

class Mission_McTemplateView(TemplateView):
    template_name = 'introapp/mission_mc.html'