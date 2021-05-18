const db = require("../../../db/connection");
var moment = require("moment");
const { authUser, authIps, authKeys } = require('../authorization/auth');

function postRoutes(router, setPath) {

  router.post(setPath + "/", function(req, response) {
    post.createPost(req.body, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
        response.send({
          message: "Create Post Successfully",
          data: res
        });
    }
      })
  });

  router.put(setPath + "/", function(req, response) {
    post.updatePost(req.body, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
        response.send({
          message: "Update Post Successfully",
          data: res
        });
    }
      })
  });

  router.get(setPath + "/:id", function(req, response) {
    var data = { id: req.params.id };
    post.getPost(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Get Post Successfully",
        data: res
      });
    }
    })
  });

  router.get(setPath + "/by_district/:district", function(req, response) {
    var data = { district: req.params.district };
    post.getPostByDistrict(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Get Post By District Successfully",
        data: res
      });
    }
    })
  });

  router.get(setPath + "/", function(req, response) {
    post.getPosts(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Get Posts Successfully",
        data: res
      });
    }
    })
  });

  router.delete(setPath + "/:id", function(req, response) {
    var data = { id: req.params.id };
    post.deletePost(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Delete Post Successfully",
        data: res
      });
    }
    })
  });
}

module.exports.postRoutes = postRoutes;
