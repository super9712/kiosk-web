from django.db import models

# Create your models here.

from django.db import models

class Menu(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    quantity = models.IntegerField(default=1)

class Payment(models.Model):
    method = models.CharField(max_length=100)
    packing = models.CharField(max_length=50)
    menu = models.ManyToManyField(Menu)
