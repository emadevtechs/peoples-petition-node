const {client} = require('../../../db/connection')
require("dotenv").config();

module.exports.createNew = async function(params, callback) {
  const { user_id, friend_name, friend_email } = params;

  client.query(
    "INSERT INTO userfriends (user_id, friend_name, friend_email ) VALUES ($1, $2, $3) RETURNING id, user_id, friend_name, friend_email",
    [user_id, friend_name, friend_email],
    (error, result) => {
        console.log('post create', error, result)
      if (error) {
        callback(error, null);
      }else{
        callback(error, result.rows[0]);
      }
      // client.end();
    }
  );
};


module.exports.getFriends = async function(params, callback) {
  const { user_id } = params;

  client.query("SELECT * FROM userfriends WHERE user_id = $1",[user_id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows);
    }
  })
};
