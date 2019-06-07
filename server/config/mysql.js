const mysql = require('mysql2/promise'); // rettet: mysql2/promise

module.exports = {
   // // Denne her funktion gør at den ringer op til databasen
   // connect: async function () { // tilføjet: async
   //    return await mysql.createConnection({ // tilføjet: await
   //       host: 'localhost',
   //       user: 'root',
   //       password: '',
   //       port: '3306',
   //       database: 'test_database'
   //    });
   // }

   // Denne her funktion gør at den ringer op til databasen
   connect: async function () { // tilføjet: async
      return await mysql.createConnection({ // tilføjet: await
         host: 'localhost',
         user: 'root',
         password: '',
         port: '3306',
         database: 'the_awesome_newspage'
      });
   }
}