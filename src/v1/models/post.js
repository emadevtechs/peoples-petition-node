const {client} = require('../../../db/connection')
require("dotenv").config();

module.exports.createPost = async function(params, callback) {
  const { picture_url, user_id, status, district, text  } = params;

  client.query(
    "INSERT INTO posts (picture_url, user_id, status, district, text ) VALUES ($1, $2, $3, $4, $5) RETURNING id, picture_url, user_id, status, district, text",
    [picture_url, user_id, status, district, text],
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

module.exports.updatePost = async function(params, callback) {
  const { id, status} = params;

  client.query(
    "UPDATE posts SET status = $2 WHERE id = $1 RETURNING id, picture_url, user_id, status, district, text",
    [id, status],
    (error, result) => {
        console.log('post update', error, result)
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

module.exports.deletePost = async function(params, callback) {
  const { id } = params;

  client.query("DELETE FROM posts WHERE id = $1",[id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
};

module.exports.getPostByDistrict = async function(params, callback) {
  const { district } = params;

  client.query("SELECT * FROM posts WHERE district = $1",[district], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows);
    }
  })
};

module.exports.getPostByUser = async function(params, callback) {
  const { user_id } = params;

  client.query("SELECT * FROM posts WHERE user_id = $1",[user_id], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows);
    }
  })
};

module.exports.getPosts = async function(params, callback) {
  
    client.query("SELECT * FROM posts", (err, result) => {
      if(err){
        callback(err, null);
      }else{
        let datas = result.rows;
        callback(null, datas);
      }
    })
  };