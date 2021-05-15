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
          message: "Post create Successfully",
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

  router.get(setPath + "/list/:email", function(req, response) {
    var data = { email: req.params.email };
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
}

module.exports.postRoutes = postRoutes;
