'use strict';

const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
const { ResultWithContext } = require("express-validator/src/chain");



let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

function usergenerator(){
  const tempfirstName=faker.name.firstName()
  const templastName=faker.name.lastName()
  const tempemail=faker.internet.email(tempfirstName,templastName)
  const tempusername=faker.internet.userName(tempfirstName,templastName)
  return {
      firstName:tempfirstName,
      lastName:templastName,
      email:tempemail,
      username:tempusername,
      hashedPassword: bcrypt.hashSync(faker.internet.password(10, true))
  }
}

function* generateUsers(){
  for(let i =1;i<=10;i++){
      yield usergenerator()
  }
}


module.exports = {
  up:async (queryInterface, Sequelize)=> {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName:"Tony",
        lastName:"Stark",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:"Bruce",
        lastName:"Banner",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName:"Steve",
        lastName:"Rogers",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName:"house",
        lastName:"seller",
        email: 'user3@user.io',
        username: 'Seller1',
        hashedPassword: bcrypt.hashSync('password4')
      },
      ...generateUsers()
    ], {});
  },

  down:async (queryInterface, Sequelize)=> {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2','Seller1'] }
    }, {});
  }
};
