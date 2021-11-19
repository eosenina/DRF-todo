from django.contrib.auth.models import AbstractUser
from django.db import models


class AppUser(AbstractUser):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    user_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)

