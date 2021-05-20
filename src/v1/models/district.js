const {client} = require('../../../db/connection')
require("dotenv").config();

module.exports.getDistrict = async function(params, callback) {
  const { id } = params;

  client.query("SELECT * FROM districts WHERE id = $1",[id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
};


module.exports.getDistricts = async function(params, callback) {
  
    client.query("SELECT * FROM districts", (err, result) => {
      if(err){
        callback(err, null);
      }else{
        let datas = result.rows;
        callback(null, datas);
      }
    })
  };

  module.exports.districtLogin = async function(params, callback) {
    const { name, password } = params;
  
    client.query("SELECT * FROM districts WHERE name = $1 AND password = $2",[name, password], (err, result) => {
      if(err){
        callback(err, null);
      }else{
        callback(null, result.rows[0]);
      }
    })
  };