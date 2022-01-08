from django.test import TestCase
from rest_framework import status

from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from todo_users.models import User
from .views import ProjectModelViewSet
from .models import Project, ToDo


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/projects/'
        user_data = {'first_name': 'fn', 'last_name': 'ln', 'username': 'un', 'email': 'em@ail.ru'}
        self.user = User.objects.create(**user_data)

        self.data = {'name': 'testProject', 'repo_link': 'http://test.ru', 'user': [self.user.id]}
        self.data1 = {'name': 'testProject1', 'repo_link': 'http://test1.ru'}
        self.data2 = {'name': 'testProject2', 'repo_link': 'http://test2.ru', 'user': [self.user.id]}

        self.name = 'test_admin'
        self.password = 'pass123456'
        self.admin = User.objects.create_superuser('test_admin', 'ad@mail.ru', 'pass123456')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        client = APIClient()
        client.login(username=self.name, password=self.password)
        response = client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        project = Project.objects.create(**self.data1)
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        client = APIClient()
        project = Project.objects.create(**self.data1)
        response = client.put(f'{self.url}{project.id}/', self.data2)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        client = APIClient()
        project = Project.objects.create(**self.data1)
        project.user.set([self.user.id])
        project.save()

        client.login(username=self.name, password=self.password)

        response = client.put(f'{self.url}{project.id}/', self.data2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_update = Project.objects.get(id=project.id)
        self.assertEqual(project_update.name, self.data2['name'])
        self.assertEqual(project_update.repo_link, self.data2['repo_link'])
        client.logout()

    def tearDown(self) -> None:
        pass


class TestToDoViewSet(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/todos/'
        self.user = mixer.blend(User)
        self.project = mixer.blend(Project)
        self.project.user.set([self.user.id])
        self.project.save()
        self.author = mixer.blend(User)

        self.test_todo = mixer.blend(ToDo)
        self.test_todo.author = self.author
        self.test_todo.project = self.project
        self.test_todo.save()

        self.data = {'caption': self.test_todo.caption, 'text': self.test_todo.text, 'state': self.test_todo.state,
                     'project': self.test_todo.project.id, 'created': self.test_todo.created,
                     'updated': self.test_todo.updated,
                     'author': self.test_todo.author.id}

        self.data2 = {'caption': 'new caption', 'text': 'new text', 'state': self.test_todo.state,
                      'project': self.test_todo.project.id, 'created': self.test_todo.created,
                      'updated': self.test_todo.updated,
                      'author': self.test_todo.author.id}

        self.name = 'test_admin'
        self.password = 'pass123456'
        self.admin = User.objects.create_superuser('test_admin', 'ad@mail.ru', 'pass123456')

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        self.client.login(username=self.name, password=self.password)
        response = self.client.post(self.url, self.data)
        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()

    def test_edit_admin(self):
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{self.test_todo.id}/', self.data2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_updated = ToDo.objects.get(id=self.test_todo.id)
        self.assertEqual(todo_updated.caption, self.data2['caption'])
        self.assertEqual(todo_updated.text, self.data2['text'])
        self.client.logout()

