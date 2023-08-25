from django.db import models

# Create your models here.

class Response(models.Model):
    question = models.CharField(max_length=50)
    answer = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)

class Complete(models.Model):
    accuracy = models.DecimalField(max_digits=4, decimal_places=1)
    totalTime = models.IntegerField()

