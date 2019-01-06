from django.contrib.auth.models import User


def createUser(_username, _email, _password):
    newUser = User.objects.create_user(_username, _email, _password)

def resetPass(_username, _newpass):
    user = User.objects.get(username=_username)
    user.set_password(_newpass)
    user.save()

def listUsers():
    users = User.objects.all()
    return users
