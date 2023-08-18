from django.contrib import admin

# Register your models here.
from introapp.models import Question, Answer

@admin.register(Question)
class PostAdmin(admin.ModelAdmin):
    list_display = ['text']
    list_display_links = ['text']

@admin.register(Answer)
class PostAdmin(admin.ModelAdmin):
    list_display = ['text']
    list_display_links = ['text']