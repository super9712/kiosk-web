from django.db import models

# Create your models here.

class Response(models.Model):
    question = models.CharField(max_length=50)
    answer = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)

class Complete(models.Model):
    accuracy = models.DecimalField(max_digits=4, decimal_places=2) ## 소수점 둘째자리까지 표현
    totalTime = models.IntegerField()

class Mission_mc(models.Model):
    mission = models.CharField(max_length=100)


class Menu(models.Model):
    menu_name = models.CharField(max_length=50)
    quantity = models.IntegerField()
    mission = models.ForeignKey('Mission_mc', on_delete=models.CASCADE)

