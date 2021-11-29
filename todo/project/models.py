from django.db import models

from todo_users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128)
    user = models.ManyToManyField(User)
    repo_link = models.URLField(max_length=300)


class ToDo(models.Model):
    ACTIVE = 'ACT'
    CLOSED = 'CLS'

    TODO_STATES = (
        (ACTIVE, 'активна'),
        (CLOSED, 'закрыта')
    )
    caption = models.CharField(max_length=128)
    text = models.TextField()
    state = models.CharField(max_length=3, choices=TODO_STATES, default=ACTIVE)
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.OneToOneField(User, on_delete=models.CASCADE)
