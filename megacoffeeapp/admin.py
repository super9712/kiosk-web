from django.contrib import admin
from megacoffeeapp.models import Menu, Quantity, Option, Order, Payment, Page, Button


# Register your models here.
admin.site.register(Menu)
admin.site.register(Quantity)
admin.site.register(Option)
admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(Page)
admin.site.register(Button)