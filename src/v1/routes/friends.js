function friendRoutes(router, setPath) {

  router.post(setPath + "/", function(req, response) {
    console.log('.....', req.body)
    var data = { user_id: req.body.user_id, friend_name: req.body.friend_name, friend_email: req.body.friend_email };
    friend.createNew(data, function(err, res){
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
