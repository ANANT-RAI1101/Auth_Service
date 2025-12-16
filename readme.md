# Auth Service

## Overview
- The Auth Service is a core microservice responsible for handling user authentication and authorization within the Airline Management System. It provides secure mechanisms for user registration, login, and identity verification using industry-standard practices.

## Project setup
- clone the project on your local
- execute `npm install`  on the same on the same path as of your root directory of the downloaded project
- create `.env` file in the root directory and add `PORT 3000`
- setup `mysql` in your local
- go to the `src` folder from your terminal run `npx sequelize init`
- after that inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "Flights_Search_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- after setting up this go to the src folder from your terminal and execute `npx sequelize db:create`

## DB Design

- User Table

- to generate user table run `npx sequelize model:generate --name user --attributes email:String,password:String`
- after that figure out some migration attributes and mode user.js file based on your requirement of email and password and run `npx sequelize db:migrate`

- Role Table

- to generate role table repeat the above steps 

- but do association before migrate
  - in user model
  ```
  static associate(models) {
      this.belongsToMany(models.Role,{
        through:'User_Roles'
      })
    }
  ```
  - in role model
  ``` 
  static associate(models) {
      this.belongsToMany(models.User,{
        through:'User_Roles'
      })
    }
  ```

- established many to many relation through `User_Roles` table

## API Endpoints(/api/v1)

#### Auth

- POST `/api/v1/signup` → Register new user

- POST `/api/v1/signIn` → User login 

- GET `/api/v1/isAuthenticated` → Check if user is authenticated

- GET `/api/v1/isAdmin/:id` → Check if user has admin role

- GET `/api/v1/verify-email` → Verify user email

- DELETE `/api/v1/delete/:id `→ Delete user account