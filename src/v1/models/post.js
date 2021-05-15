const {client} = require('../../../db/connection')
require("dotenv").config();
const url = "https://mempool.space/api/v1/fees/recommended";
module.exports.createPost = async function(params, callback) {
  const { file_name, file_url, file_type, file_id, accessor_names } = params;

  client.query(
    "INSERT INTO posts (file_name, file_url, file_type, file_id, accessor_names ) VALUES ($1, $2, $3, $4, $5) RETURNING id, file_name, file_url, file_type, file_id, accessor_names",
    [file_name, file_url, file_type, file_id, accessor_names],
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


module.exports.getPost = async function(params, callback) {
  const { id } = params;

  client.query("SELECT * FROM posts WHERE id = $1",[id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
};

module.exports.getPosts = async function(params, callback) {
  
    client.query("SELECT * FROM posts", (err, result) => {
      if(err){
        callback(err, null);
      }else{
        let datas = result.rows;
        let res_data = null;
        if(datas.length > 0){
            res_data = datas.filter((item,index) => {
                return item.accessor_names.includes(params.email)
            })
        }
        callback(null, res_data);
      }
    })
  };