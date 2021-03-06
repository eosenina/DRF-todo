from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer
from .filters import ProjectFilter, ToDoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_queryset(self):
        queryset = Project.objects.all()
        project_name = self.request.query_params.get('name', None)
        if project_name is not None:
            queryset = queryset.filter(name__contains=project_name)
        return queryset


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    # pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter



