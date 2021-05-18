const {client} = require('../../../db/connection')
require("dotenv").config();
const url = "https://mempool.space/api/v1/fees/recommended";
module.exports.createUser = async function(params, callback) {
  const { name, email, password, phone_number, profile_url, district, address } = params;

  client.query(
    "INSERT INTO users (name, email, password, phone_number, profile_url, district, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, password, phone_number, profile_url, district, address",
    [name, email, password, phone_number, profile_url, district, address],
    (error, result) => {
      console.log('user create',error, result)
      if (error) {
        callback(error, null);
      }else{
        callback(error, result.rows[0]);
      }
      // client.end();
    }
  );
};


module.exports.getUsers = async function(params, callback) {
  client.query("SELECT * FROM users", (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows);
    }
  })
};

module.exports.getUser = async function(params, callback) {
  const { id } = params;

  client.query("SELECT * FROM users WHERE id = $1",[id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
};

module.exports.userLogin = async function(params, callback) {
  const { email, password } = params;

  client.query("SELECT * FROM users WHERE email = $1 AND password = $2",[email, password], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
};