from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import AppUser


class AppUserModelSerializer(ModelSerializer):

    class Meta:
        model = AppUser
        fields = AppUser.user_name, AppUser.email

