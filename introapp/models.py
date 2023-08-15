from django.db import models

# Create your models here.
class Question(models.Model):
    text = models.CharField(max_length=50)

class Answer(models.Model):
    text = models.CharField(max_length=50)

class Response(models.Model):
    brand = models.CharField(max_length=50)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ManyToManyField(Answer)

class Complete(models.Model):
    accuracy = models.DecimalField(max_digits=4, decimal_places=1)
    totalTime = models.IntegerField()

