from datetime import datetime
import django
from django.db import models

class Menus(models.Model):
    MenuName = models.CharField(max_length=50)
    MenuPrice = models.IntegerField()
    category = models.CharField(max_length=30, default='single')

class Cart(models.Model):
    CartMenu = models.CharField(max_length=50)
    CartQty = models.IntegerField()
    CartPrice = models.IntegerField()

class CallCustomer(models.Model):
    orderNum = models.IntegerField()
