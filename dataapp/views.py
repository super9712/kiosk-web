from django.shortcuts import render

# Create your views here.
from django.views.generic import View, TemplateView


class dataTemplateView(TemplateView):
    template_name = 'dataapp/main.html'

class megacoffeeView(TemplateView):
    template_name = 'dataapp/megacoffee.html'

