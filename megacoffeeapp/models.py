from django.db import models

# Create your models here.

class Menu(models.Model):
    # 메뉴명
    menu_name = models.CharField(max_length=40)

    # 수량
    menu_count = models.IntegerField()

    # 가격
    menu_price = models.IntegerField()

class MenuOption(models.Model):
    # 옵션 명
    option_name = models.CharField(max_length=40)

    # 옵션 가격
    option_price = models.IntegerField()

class Order(models.Model):
    # 주문 번호
    order = models.IntegerField(unique=True)

    # 주문 일시
    order_time = models.DateTimeField(auto_now_add=True)

    # 총 가격
    total_price = models.IntegerField()

    # 결제 방법
    payment = models.CharField(max_length=40)

    # 걸린 시간
    time = models.IntegerField()

class Answer(models.Model):
    # 정답 메뉴
    answer_menu = models.CharField(max_length=40)

    # 정답 메뉴 수량
    answer_menu_count = models.IntegerField()

    # 정답 옵션
    answer_option_name = models.CharField(max_length=40)

    # 정답 결제 방법
    answer_payment = models.CharField(max_length=40)