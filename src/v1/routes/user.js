const db = require("../../../db/connection");
var moment = require("moment");
const { authUser, authIps, authKeys } = require('../authorization/auth');

function userRoutes(router, setPath) {

  router.post(setPath + "/", function(req, response) {
    console.log('.....', req.body)
    var data = { name: req.body.name, email: req.body.email, password: req.body.password };
    user.createUser(data, function(err, res){
      if(err){
        response.send({
          message: err,
          data: null
        });
      }else{
        response.send({
          message: "Create User Successfully",
          data: res
        });
      }
      })
  });

  router.get(setPath + "/:id", function(req, response) {
    var data = { id: req.params.id };
    user.getUser(data, function(err, res){
      if(err){
        response.send({
          message: err,
          data: null
        });
      }else{
      response.send({
        message: "Get User Successfully",
        data: res
      });
    }
    })
  });

  router.post(setPath + "/login", function(req, response) {
    user.userLogin(req.body, function(err, res){
      if(err){
        response.send({
          message: err,
          data: null
        });
      }else{
      response.send({
        message: "User login Successfully",
        data: res
      });
    }
    })
  });

}

module.exports.userRoutes = userRoutes;
