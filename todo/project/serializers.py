from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from project.models import Project, ToDo
from todo_users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):

    # user = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
