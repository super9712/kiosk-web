from django.db import models

# Create your models here.
class Question(models.Model):
    text = models.CharField(max_length=50)

class Answer(models.Model):
<<<<<<< HEAD
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=1)
    text = models.CharField(max_length=50)

class Response(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ManyToManyField(Answer)
    brand = models.CharField(max_length=50)

=======
    text = models.CharField(max_length=50)

class Response(models.Model):
    brand = models.CharField(max_length=50)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ManyToManyField(Answer)
>>>>>>> 87e485f88ab8a24779b4bd0f3b964b339404c6f1

class Complete(models.Model):
    accuracy = models.DecimalField(max_digits=4, decimal_places=1)
    totalTime = models.IntegerField()

