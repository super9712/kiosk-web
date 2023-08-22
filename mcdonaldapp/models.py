from django.db import models

# Create your models here.

from django.db import models

class Menu(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    CATEGORIES = {
        ('single', 'Single'),
        ('set', 'Set Menu'),
        ('side', 'Side Menu'),
        ('drink', 'Drink'),
        ('dessert', 'Dessert')
    }
    category = models.CharField(max_length=30, default='single', choices=CATEGORIES)

class Cart(models.Model):
    menu = models.CharField(max_length=50)
    qty = models.IntegerField()
    price = models.IntegerField()
