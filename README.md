# IntegerApplication
An Application for Getting Incremented Integers

# Run locally
Clone the repo.
Install npm.
Run npm install.
You will need to install postgresql(https://www.postgresql.org/download/) and create a database and role that match the configuration in config/config.js
You must log into postgresql as a super user to create the Role, but you can create the db using:
"npx sequelize-cli db:create"$ npx sequelize-cli db:migrate
or you can install sequelize-cli  and pg globally with "npm install -g sequelize-cli pg" and then run the commands with:
sequelize db:migrate

Run the database migrations with npx sequelize-cli db:migrate
Finally run node src/app.