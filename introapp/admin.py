from django.contrib import admin

# Register your models here.
<<<<<<< HEAD
=======
from .models import Response, Complete

@admin.register(Response)
class PostAdmin(admin.ModelAdmin):
    list_display = ['question']

@admin.register(Complete)
class PostAdmin(admin.ModelAdmin):
    list_display = ['accuracy']
>>>>>>> 4e9183112a65de2e4a08c700f952d1a8836f4326
