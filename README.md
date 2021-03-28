# whitespace_character

'hello'

## Backend

There is a Swagger document at `http://localhost:8000/api/swagger/`

## How to run the APIs server


### There are two option for running the APIs server

1. Run APIs server with remote databases: `docker-compose up --build` 
2. Run APIs server with local databases: `docker-compose -f docker-compose.local.yml up --build`

### How to create super user
We need to create super for initialize the databases. 
1. If using remote databases run: 
`docker-compose run api-server python manage.py createsuperuser`

2. If using local databases run:
`docker-compose -f docker-compose.local.yml run api-server python manage.py createsuperuser`


### To flush the local database, run

1. `docker-compose -f docker-compose.local.yml down`
2. `docker volume rm whitespace_character_whitespace-db-data --force`

## How to test

1. run `./test.sh` to test the backend server
