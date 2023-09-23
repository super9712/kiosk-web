from django.db import models

# Create your models here.

class Menu(models.Model):
    name = models.CharField(max_length=100)

class Quantity(models.Model):
    value = models.IntegerField()

class Option(models.Model):
    name = models.CharField(max_length=100)

class Order(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    quantity = models.ForeignKey(Quantity, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)

class Payment(models.Model):
    method = models.CharField(max_length=100)
    packing = models.CharField(max_length=50)
    orders = models.ManyToManyField(Order)


class Page(models.Model):
    brand = models.CharField(max_length=50, default='megacoffee')
    name = models.CharField(max_length=50, default='menu')
    using_page = models.IntegerField(null=True)              # 페이지 사용 시간

class Button(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)        # 페이지 번호
    button_name = models.CharField(max_length=50)                   # 클릭된 버튼 이름
    click_time = models.DateTimeField()                             # 클릭한 시간
    is_right = models.BooleanField()                                # 이 버튼이 맞는가

