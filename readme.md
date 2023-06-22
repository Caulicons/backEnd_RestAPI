## API to movies

This is my project created from Alura's first backend challenge. Basically, the challenge is to create an API over four weeks where, each week, we receive tasks and bussines rules that must be completed for the real moker environment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Testing](#testing)
- [Contact Information](#contact-information)

## Installation

To install and set up this project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Configure the environment variables in the `.env` file. 
5. Run `npm start` to start the application.

Explain how to install and set up your project. Include any prerequisites, dependencies, and step-by-step instructions for installation. Specify the required Node.js version and other relevant dependencies.

## Usage

### Run migrations

First, with all setup, you can run the command `npx prisma migrate dev` to run the migrates in your database furthemore seed he.  

### See endpoints working at the Postman. 

To see endpoints API worked, I recommend that use the postman [follow link that I made availiable already with endpoints, headers and bodys set up](https://www.postman.com/navigation-candidate-37863564/workspace/back-end-challenge-01).  

As everywhere request we go made will be necessary the session token, I recoomend made a login first on endpoint '/login' and catch the token that have a duration of 30 minutes to use in other requests.

[GIF WITH THE EXAMPLE cathing token]

With token in hands we can use he on headers when we do some request, like this:  

[GIF USE TOKEN]

now you can made how many request you want.

Provide instructions on how to use your project. Include examples and code snippets to illustrate the basic functionality and demonstrate how to integrate your project into other applications.

## Configuration

The project requires the following environment variables to be set:

- `PORT`: The port number on which the server should listen for incoming HTTP requests.
- `HOST`: Represents the host address or IP address on which the server should bind itself to listen for incoming requests.
 - `NODE_ENV`: To control various aspects of the application's behavior based on the environment. 
 - `APP_KEY`:  Is typically a random string of characters and should be kept confidential. It is used for various security-related purposes. 
 - `DRIVE_DISK`: Typically represents the name or identifier of the disk or storage driver to be used for file storage and retrieval.
 - `DB_CONNECTION`: Database URL for Prisma ORM. On project was used PostgreSQL but prima also support MySQL, SQLite, SQL Server, MongoDB and CockroachDB. I recommend testing using some postegredSQL database, if choice another one, some change will be necessary at prisma.schema. 

Copy the `.env.example` file and rename it to `.env`. Set the appropriate values for the environment variables.

## Features

- User management: Create, retrieve, update, and delete movies, categories and users.
- Authentication: Secure endpoints with JWT-based authentication.

## API Documentation

If your Node.js project provides an API, document its endpoints, request/response formats, and any authentication mechanisms.

## Examples

Include additional examples or use cases to demonstrate the capabilities of your project. Show how it can be customized or extended to fit different scenarios.

## Testing

Explain how to run tests for your project and provide any necessary instructions or dependencies required for testing.

## Contact Information

For question, feedbacks or bugs reports you can contact me from [email](caulicons.jobs@gmail.com) or [Instagram](https://www.instagram.com/caulicons_/).
