function friendRoutes(router, setPath) {

  router.post(setPath + "/addfrnd", function(req, response) {
    var data = { user_id: req.body.user_id, friend_name: req.body.friend_name, friend_email: req.body.friend_email };
    friend.createNew(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
        response.send({
          message: "Create Relationship Successfully",
          data: res
        });
    }
      })
  });

  router.post(setPath + "/removefrnd", function(req, response) {
    var data = { user_id: req.body.user_id, friend_name: req.body.friend_name };
    friend.removeFrnd(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
        response.send({
          message: "Delete Relationship Successfully",
          data: res
        });
    }
      })
  });

  router.post(setPath + "/find", function(req, response) {
    var data = { user_id: req.body.user_id, friend_name: req.body.friend_name };
    friend.findFriend(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: false
            });
          }else if(res && res.id){
            response.send({
              message: "Find Friend Successfully",
              data: true
            });
          }else{
            response.send({
              message: "Find Friend Successfully",
              data: false
            });
          }
      })
  });

  router.get(setPath + "/:id", function(req, response) {
    var data = { user_id: req.params.id };
    friend.getFriends(data, function(err, res){
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

}

module.exports.friendRoutes = friendRoutes;
