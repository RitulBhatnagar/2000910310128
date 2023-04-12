const mysql = require("mysql2");

const connection = mysql.createConnection({
  user : "root",
  host : "localhost",
  password : "Ritul242@",
  database : "project"
})

connection.connect((err) => {
  if(err){
    throw err;
  }
   console.log("Db Connected")
})

module.exports = connection;