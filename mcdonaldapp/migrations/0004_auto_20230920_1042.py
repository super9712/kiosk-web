# Generated by Django 3.1.2 on 2023-09-20 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mcdonaldapp', '0003_alter_menu_id_alter_payment_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='payment',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
