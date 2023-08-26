from django.contrib import admin

# Register your models here.

from .models import Response, Complete

@admin.register(Response)
class PostAdmin(admin.ModelAdmin):
    list_display = ['question']

@admin.register(Complete)
class PostAdmin(admin.ModelAdmin):
    list_display = ['accuracy']

