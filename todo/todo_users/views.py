from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet

# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
