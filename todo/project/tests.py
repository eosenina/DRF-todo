from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from todo_users.models import User
from .views import ProjectModelViewSet
from .models import Project


class TestProjectViewSet(TestCase):
    url = '/api/projects/'

    def setUp(self) -> None:
        user_data = {'first_name': 'fn', 'last_name': 'ln', 'username': 'un', 'email': 'em@ail.ru'}
        user = User.objects.create(**user_data)
        self.data = {'name': 'testProject', 'repo_link': 'http://test1.ru'}
        self.admin = User.objects.create_superuser('test_admin', 'ad@mail.ru', 'pass123456')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_guest(self):
        factory = APIRequestFactory()

        request = factory.post(self.url, self.data, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_get_detail(self):
    #     client = APIClient()
    #     project = Project.objects.create(**self.data)
    #     response = client.get(f'{self.url}{project.id}')
    #
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def tearDown(self) -> None:
        pass
