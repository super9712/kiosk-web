from django.contrib import admin

# Register your models here.
from .models import Menu, Quantity, Option

@admin.register(Menu)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Option) 
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Quantity)
class PostAdmin(admin.ModelAdmin):
    list_display = ['value']