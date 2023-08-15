from django.db import models

# Create your models here.

class Response(models.Model):
    brand = models.CharField()
    question = models.ForeignKey()
    answer = models.ManyToManyRel()

class Question(models.Model):
    text = models.CharField()

class Answer(models.Model):
    text = models.CharField()


class Complete(models.Model):
    accuracy = models.DecimalField()
    totalTime = models.IntegerField()

