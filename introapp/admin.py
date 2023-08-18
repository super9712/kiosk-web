from django.contrib import admin

# Register your models here.
from .models import Question, Answer

@admin.register(Question)
class PostAdmin(admin.ModelAdmin):
    list_display = ['text']

@admin.register(Answer)
class PostAdmin(admin.ModelAdmin):
    list_display = ['text']