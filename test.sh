set -ex

docker-compose -f docker-compose.local.yml down -v
docker-compose -f docker-compose.local.yml up --build -d

sleep 5

docker-compose -f docker-compose.local.yml exec -T api-server bash -c './scripts/test.sh'
docker-compose -f docker-compose.local.yml down -v

