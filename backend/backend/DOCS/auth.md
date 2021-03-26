Basic setting for authentication jwt:
- Using the PyJWT == 1.7.1 and djangorestframework-simplejwt == 4.4.0 to do the jwt authentication. 
- In order to use other API in this app, you have to first go through get_token. In here, the user will needed to provide their username and password to get the jwt. Because we are running the database locally, the first time you use it, cd the path to *\whitespace_character\backend and run python manage.py createsuperuser. Filled in the name and password as you like. When we get to the remote database, we will set up our initial username and password
- Go to http://127.0.0.1:8000/api/get_token/ and filled in the just created username and password. it will return our initial jwt. This will include, after decode (You can use this website and pass the jwt to see the decode :https://jwt.io/)
    > Header: including the type and the algorithm we use to encode
    > Payload: Basically the JSON information of the logging individual. this will inclides: 
        + token_type: access or refresh (short term and long term use)
        + exp: expiration time for the token
        + jti: the unique ID of the JWT
        + user_id: the ID of the one whose make the login
        + is_staff: boolean varible so that we can know the role of the login person.
- Modify the return JWT:
    > Go to api\services and go to JWTModifier.py. Put in the field you wnat the JWT to contain when return.
