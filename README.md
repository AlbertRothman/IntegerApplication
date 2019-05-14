# IntegerApplication
An Application for Getting Incremented Integers

# Run locally
1.Clone the repo.
2.Install npm.
3.Run npm install.
4.You will need to install postgresql(https://www.postgresql.org/download/) and create a database and role that match the configuration in config/config.js
5.You must log into postgresql as a super user to create the Role, but you can create the db using:
6."npx sequelize-cli db:create"$ npx sequelize-cli db:migrate
or you can install sequelize-cli  and pg globally with "npm install -g sequelize-cli pg" and then run the commands with:
sequelize db:migrate
7.Finally run node src/app.

The responses wil be returned as a JSON object containing the integer and some additional information. The field that contains the integer is userInt.
