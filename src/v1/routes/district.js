function districtRoutes(router, setPath) {

  router.get(setPath + "/:id", function(req, response) {
    var data = { id: req.params.id };
    district.getDistrict(data, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Get District Successfully",
        data: res
      });
    }
    })
  });

  router.get(setPath + "/", function(req, response) {
    district.getDistricts(null, function(err, res){
        if(err){
            response.send({
              message: err,
              data: null
            });
          }else{
      response.send({
        message: "Get Districts Successfully",
        data: res
      });
    }
    })
  });

  router.post(setPath + "/login", function(req, response) {
    district.districtLogin(req.body, function(err, res){
      if(err){
        response.send({
          message: err,
          data: null
        });
      }else if(res && res.id){
      response.send({
        message: "District login Successfully",
        data: res
      });
    }else{
      response.send({
        message: "District not Found",
        data: res
      });
    }
    })
  });

}

module.exports.districtRoutes = districtRoutes;
