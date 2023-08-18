from django.contrib import admin

# Register your models here.
from megacoffeeapp.models import Menu, Quantity, Option

@admin.register(Menu)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_display_links = ['name']

@admin.register(Option)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_display_links = ['name']

@admin.register(Quantity)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_display_links = ['name']