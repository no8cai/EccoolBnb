const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const { commerce } = require("faker");

console.log(commerce.productName())
console.log(faker.name.fullName())

// const temp={
//         firstName:faker.name.firstName(),
//         lastName:faker.name.lastName(),
//         email: faker.internet.email("lam","conrn"),
//         username: faker.internet.userName(this.firstName,this.lastName),
//     }

// function usergenerator(){
//     const tempfirstName=faker.name.firstName()
//     const templastName=faker.name.lastName()
//     const tempemail=faker.internet.email(tempfirstName,templastName)
//     const tempusername=faker.internet.userName(tempfirstName,templastName)
//     return {
//         firstName:tempfirstName,
//         lastName:templastName,
//         email:tempemail,
//         username:tempusername,
//         hashedPassword: bcrypt.hashSync(faker.internet.password(10, true))
//     }
// }

console.log(faker.address.state())