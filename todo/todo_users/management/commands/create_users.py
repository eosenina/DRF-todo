from django.core.management.base import BaseCommand, CommandError

from todo_users.models import User


class Command(BaseCommand):
    help = 'Creates default superuser and 2 test users.'

    def handle(self, *args, **options):
        admin = User.objects.filter(username='admin')
        if admin.count() > 0:
            print('Users already created.')
            return
        # Creating superuser

        try:
            user = User.objects.create_superuser(username='admin', password='12345', email='admin@example.com')

        except Exception as e:
            raise CommandError('Could not create user: {}'.format(e))
        self.stdout.write(self.style.SUCCESS('Superuser admin with e-mail address admin@example.com created.'))

        # Creating test users
        try:
            user = User.objects.create_user(username='test1', password='1234', email='test1@example.com')
            user = User.objects.create_user(username='test2', password='1234', email='test2@example.com')
        except Exception as e:
            raise CommandError('Creating test users failed.')
        self.stdout.write(self.style.SUCCESS('Test users created.'))
