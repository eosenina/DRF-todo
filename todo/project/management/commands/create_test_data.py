from django.core.management.base import BaseCommand, CommandError

from todo_users.models import User
from project.models import ToDo, Project


class Command(BaseCommand):
    help = 'Creates test projects and todos'

    def handle(self, *args, **options):
        # Creating test projects
        try:
            users = User.objects.all()
            for ind, user in enumerate(users):
                project = Project.objects.create(name=f'test{ind}', repo_link=f'http://repo{ind}.ru')
                project.user.set([user.id])
                project.save()
        except Exception as e:
            raise CommandError('Could not create project: {}'.format(e))
        self.stdout.write(self.style.SUCCESS('Test projects for each user created'))

        # Creating test todos
        try:
            admin_id = User.objects.filter(username='admin').values_list('id', flat=True)
            projects = Project.objects.all()
            for ind, project in enumerate(projects):
                todo = ToDo.objects.create(caption=f'caption{ind}', text=f'text{ind}', author_id=admin_id[0],
                                           project=project)
                todo.save()
        except Exception as e:
            raise CommandError('Creating test todos failed. {}'.format(e))
        self.stdout.write(self.style.SUCCESS('Test todos for each project created.'))
