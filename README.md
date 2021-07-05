# Project Name
Our Economic Lives

## Description
Duration: 3 weeks.

An application was needed to guide people through developing a more complete picture of their career path. This happens by tracking professional skills and comparing them to a variety of potential industries. Each user is assigned a 'coach' who will help guide the user through the process.

## Screen Shot
![Here is an example of the application](gifox file here)

# EDA Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`)

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table
Create a new database called `our_economic_lives` (a full list of tables can be found in `database.sql`)

## Development Setup Instructions
- Run `npm install`
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- The `npm run client` command will open up a browser tab for you at `localhost:3000`

## Lay of the Land
Directory Structure:
- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Usage
 1. Client adds critical experiences to build pyramid, and compare with different industry paths
 2. Client communicates with coach through comments and chat
 3. Coach invites clients and manages them
 4. Admin adds new industries
 4. Admin adds coaches and views client progress

 ## Built With
 - Node
 - React
 - Redux
 - Saga
 - Express
 - PostgreSQL
 - Material-UI

 ## Acknowledgement
Thanks to Jessie Williams for the opportunity to build this application. Prime Digital Academy who equipped us with the necessary tools to make this application a reality.

## Support
If you have suggestions or issues, please email alexlloydwhite@gmail.com, johnturner4004@gmail.com, sam@moudry.net, kjepsen86@gmail.com