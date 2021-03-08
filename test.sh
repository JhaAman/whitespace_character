set -ex

docker-compose down -v
docker-compose up --build -d

sleep 5

docker-compose exec -T api-server bash -c 'python manage.py test'
docker-compose down -v

