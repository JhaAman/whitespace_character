set -ex

docker-compose -f docker-compose.test.yml down -v
docker-compose -f docker-compose.test.yml up --build -d

sleep 5

docker-compose -f docker-compose.test.yml exec -T api-server bash -c 'python manage.py test'
docker-compose -f docker-compose.test.yml down -v

