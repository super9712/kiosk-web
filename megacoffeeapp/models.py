from django.db import models

# Create your models here.
class Page(models.Model):
    start_time = models.DateTimeField()              # 페이지 사용 시작 시간
    using_page = models.IntegerField()              # 페이지 사용 시간

class Button(models.Model):
    page_number = models.ForeignKey(Page, on_delete=models.CASCADE)  # 페이지 번호
    button_name = models.CharField(max_length=50)                   # 클릭된 버튼 이름
    click_time = models.DateTimeField()                             # 클릭한 시간
    is_right = models.BooleanField()                                # 이 버튼이 맞는가