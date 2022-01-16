import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from project.models import Project, ToDo
from todo_users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(ObjectType):
    projects = graphene.List(ProjectType)
    todos = graphene.List(ToDoType)
    users = graphene.List(UserType)

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_todos(root, info):
        return ToDo.objects.all()

    def resolve_users(root, info):
        return User.objects.all()

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=False))

    def resolve_project_by_id(root, info, id=None):
        if id:
            return Project.objects.get(id=id)
        return None


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        repo_link = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, repo_link, id):
        project = Project.objects.get(id=id)
        if name:
            project.name = name
        if repo_link:
            project.repo_link = repo_link
        project.save()
        return ProjectUpdateMutation(project=project)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        repo_link = graphene.String(required=True)
        user = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, repo_link, user):
        project = Project.objects.create(name=name, repo_link=repo_link)
        project.user.set([user])
        project.save()
        return ProjectCreateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    project = graphene.List(ProjectType)

    @classmethod
    def mutate(cls, root, info, id):
        Project.objects.get(id=id).delete()
        projects = Project.objects.all()
        return ProjectCreateMutation(project=projects)


class Mutation(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
