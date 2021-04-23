set -ex

coverage run manage.py test
coverage report -m
coverage html