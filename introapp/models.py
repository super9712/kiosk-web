from django.db import models

# Create your models here.
class Question(models.Model):
    text = models.CharField(max_length=50)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=1)
    text = models.CharField(max_length=50)

class Response(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ManyToManyField(Answer)
    brand = models.CharField(max_length=50)

class Complete(models.Model):
    accuracy = models.DecimalField(max_digits=4, decimal_places=1)
    totalTime = models.IntegerField()

