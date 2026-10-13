<img style="width:50" src= "../frontend/public/bapi_logo.png">

# BAPI 


Bapi is a website that gathers simple informations on different flowers like its name, family and localisation where it can be found it.

The website is based on an api

Link to the website: https://bapi.webhop.me/

## Documentation

Database: Merise method (mcd, mld, mpd), mrd and hash of data in the folder "docs"

Route: swagger in the folder "docs" and a postman documentation on the link: https://documenter.getpostman.com/view/55120530/2sBYHNWiJ4


## Project organization

```
B_A_P_I/
    backend/
        node_modules/
        src/
            database/
            features/
            security/
            app.js
            server.js
        .env.exemple
        .gitignore
        package-lock.json
        package.json

    docs/
        mcd.png
        mld.png
        mpd.png
        mrd.md
        README.md
        swagger.yaml

    frontend/
        node_modules/
        public/
        src/
            feature/
            general-service/
            general-ui/
            style-general.css
        .gitignore
        index.html
        package-lock.json
        package.json
```

## Features Organization

### <u> Organization of the backend features: </u>

| File                | Role
|:--------------------|:--------
| `*.routes.js`       | Create the different path  
| `*.controller.js`   | Manage the request and respond
| `*.service.js`      | Contain the function for the feature
| `*.validation.js`   | Validate the given data


### <u> Organization of the frontend features: </u>

| Folder                    | Role
|:--------------------------|:--------
| `route`                   | Contain the different HTML page
| `service`                 | Contain the different layout of the page 
| `style`                   | Contain the CSS style sheet
| `ui`                      | Contain the different composant

## Tool Stack

### <u> Backend :</u>
- JavaScript
- Node.js
- Express
- PostgreSQL
- JWT
- Bcrypt


### <u> Frontend :</u>
- JavaScript
- Node.js
- HTML
- CSS

### <u> Other :</u>
- Git / GitHub
- PM2
- Nginx
- Postman

## Installation guide

### <u> Before anything you will need : </u>

- Node.js
- npm
- PostgreSQL
- Git

### <u> Backend : </u>

Create a .env file in the folder: `backend`
<br> 
You can copy paste the `.env.exemple` and rename it `.env` then you can fill it with your information
<br> or
<br>
You can copy the following lines:

```
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET =

ROLE= 
ADMIN_LOGIN= 
ADMIN_PASSWORD=
```

Fill your DB with the command :
```
npm run seed
```

Lauch the backend with : (don't forget to be in the folder backend)
```
npm run dev
```

## Developer :

<a href="https://github.com/clemencechenevoix">Clemence Chenevoix</a>, 2nd year student in programming school

This project was created for a school exercice name MY_API .