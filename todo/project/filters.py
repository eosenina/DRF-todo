from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):
    project__name = filters.CharFilter(lookup_expr='contains')
    created = filters.DateFromToRangeFilter(field_name='created')

    class Meta:
        model = ToDo
        fields = ['id', 'project__name', 'created']
