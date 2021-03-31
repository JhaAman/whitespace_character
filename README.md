# whitespace_character

'hello'

## Backend

There is a Swagger document at `http://localhost:8000/api/swagger/`

## How to run the APIs server

1. run `docker-compose up --build` to build and run the backend server

For running the APIs server with local database, run `docker-compose -f docker-compose.local.yml up`

To flush the local database, run

1. `docker-compose -f docker-compose.local.yml down`
2. `docker volume rm whitespace_character_whitespace-db-data --force`

## How to test

1. run `./test.sh` to test the backend server

## How to run

1. clone the repo
2. change directory to the backend folder
3. run `docker-compose up --build` to build and run the backend server
