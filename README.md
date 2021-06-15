# PingrisAlexis_06_29052021

## Project 6 OpenClassrooms - Build a secure API for a food review application.

### Specifications:

- Technologies used: Express, NodeJS, MongoDB.

- The API must comply with RGPD and OWASP standards.

- Users' passwords are stored in the database in an encrypted way.

- 2 types of database administrator rights must be defined: access to delete or modify tables, and access to edit the contents of the database.

- The application strictly enforces authentication on all routes.

- The application stores email addresses in the database as unique.

- The number of likes/dislikes and the like/dislike arrays must be updated to implement the feature. 
  
### Elements provided:

- Front-end of the website.

- Guidelines API.

- Security requirements.

- Data models.

### Skills assessed:

- Implement CRUD operations in a secure manner.

- Store data securely.

- Implement a logical data model in accordance with regulations.

### Installation:

#### Frontend part:

- You will need NodeJS version 12.14 or 14.0 to run the frontend part.

- Clone the front-end project on https://github.com/OpenClassrooms-Student-Center/dwj-projet6.

- With a terminal, go to the "frontend" folder and install the dependencies: `npm install`.

- To run the project, you also need to install Angular CLI version 7.0.2. ` npm install -g @angular/cli@7.0.2`

- node-sass : be careful to take the version corresponding to NodeJS. For Node 14.0 for example, install node-sass in version 4.14+. You should do 
`npm i node-sass@4.14`

- Now, you can  `npm start`.

- Then, run the API on the port: http://localhost:4200.

#### Backend part:

- Clone the back-end project on https://github.com/PingrisAlexis/PingrisAlexis_06_29052021.git.

- Create `.env` file in the "backend" folder, then, add the line of code sent separately.

- With a terminal, go to the "backend" folder then:
`npm install` and run `nodemon`.

- The server listens on the port: http://localhost:3000.
