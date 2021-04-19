const db = require("../../../db/connection");
var moment = require("moment");

function scoreRoutes(router, setPath) {
  router.post(setPath + "/:coin/address/:address", function(req, response) {
    var data = { coin: req.params.coin, address: req.params.address, score: 1, date: new Date(), last_update: new Date() };
    if (req.params.coin === "BTC") {
      db.createRow(data, function(err, res){
        response.send({
          message: "Hai Team address",
          data: res
        });
      })
    } else {
      response.send({
        message: "No Coin found on Api",
        data: null
      });
    }
  });
  router.get(setPath + "/:coin/address/:address", function(req, response) {
    var data = { coin: req.params.coin, address: req.params.address, score: 1, date: new Date(), last_update: new Date() };
    if (req.params.coin === "BTC") {
      db.getRow(data.address, function(err, res){
        if(err){
          response.send({
            message: err,
            data: null
          });
        }
        else if(typeof(res) === "undefined"){
          db.createRow(data, function(err, res){
            response.send({
              message: "Hai Team address",
              data: res
            });
          })
        }else{
          if(moment().diff(res.last_update, 'h') >= 24){
            db.updateRow(data, function(err, res){
              response.send({
                message: "Hai Team update address",
                data: res
              });
            })
          }else{
              response.send({
                message: "else get address",
                data: res
              });
          }
        }
      })
    } else {
      response.send({
        message: "No Coin found on Api",
        data: null
      });
    }
  });
  router.get(setPath + "/:coin/txid/:txid", function(req, response) {
    var data = { coin: req.params.coin, address: req.params.txid, score: 1, date: new Date(), last_update: new Date() };
    if (req.params.coin === "BTC") {
      db.getRow(data.address, function(err, res){
        if(err){
          response.send({
            message: err,
            data: null
          });
        }
        else if(typeof(res) === "undefined"){
          db.createRow(data, function(err, res){
            response.send({
              message: "Hai Team txid",
              data: res
            });
          })
        }else{
          if(moment().diff(res.last_update, 'h') >= 24){
            db.updateRow(data, function(err, res){
              response.send({
                message: "Hai Team update txid",
                data: res
              });
            })
          }else{
              response.send({
                message: "else get txid",
                data: res
              });
          }
        }
      })
    } else {
      response.send({
        message: "No txid found on Api",
        data: null
      });
    }
  });
}

module.exports.scoreRoutes = scoreRoutes;
