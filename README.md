# Movie-Server

A server created to handle the functional of a movie application. It contains database for user and the movie. User can login or signup and perform a CURD operation with the movie database. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)



## Introduction

The main purpose of this project is to simulate a server that contain movie and perform curd operation on the database. User can login or new user can signup and perform different operation on the data present at the database.

Node.js with Express framework is used to build this application. REST architecture is used to perform different apis functions. MongoDB database and mongoose library is used for data handling.  

## Features

The key features of this project is:

- Contain user signup and login.
- Password reset function for users.
- Jsonwebtoken for user session timeout.
- CURD Operation on movie database.
- Use of get, post, patch and delete API
- Different API features like filter, sort, paginate can be performed on movie data.
- Custom functions to handle errors.
- Contains middleware to process the data
- Contains User and Movie model to create respective Collections.


## Getting Started

To Run this application clone the project into your system and follow the following steps:

 1. npm install
    install the all the dependencies .

 2. Edit the config.env file as per your system.

 3.npm run dev
    run the above code in terminal and you will get the server running output.

4. Open the postman and create a user database by singup.
    to signup use:

        method = POST

        URL = localhost:3000/api/v1/users/signup

    and in body use json file like:

        {
            "name": "mark",
            "email": "mark@gmail.com",
            "password": "test1234",
            "confirmPassword": "test1234"
    
        }

5. Perform the different operation on movie database using the below link:
    `localhost:3000/api/v1/movies/`

