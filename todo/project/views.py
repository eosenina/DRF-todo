from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer
from .filters import ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
