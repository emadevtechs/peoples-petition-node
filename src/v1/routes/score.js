const db = require("../../../db/connection");

function scoreRoutes(router, setPath) {
  router.get(setPath + "/:coin/address/:address", function(req, response) {
    // var data = { coin: req.params.coin, address: req.params.address };
    if (req.params.coin === "BTC") {
      response.send({
        message: "Hai Team address",
        data: null
      });
      // db.createRow(table_data, function(err, datas) {
      //   if (err) {
      //     throw err;
      //   } else {
      //     // response.end();
      //     response.send({
      //       message: "Success",
      //       data: datas
      //     });
      //   }
      // });
    } else {
      response.send({
        message: "No Coin found on Api",
        data: null
      });
    }
  });
  router.get(setPath + "/:coin/txid/:txid", function(req, response) {
    // var data = { coin: req.params.coin, txid: req.params.txid };
    if (req.params.coin === "BTC") {
      response.send({
        message: "Hai Team txid",
        data: null
      });
      // db.createRow(table_data, function(err, datas) {
      //   if (err) {
      //     throw err;
      //   } else {
      //     // response.end();
      //     response.send({
      //       message: "Success",
      //       data: datas
      //     });
      //   }
      // });
    } else {
      response.send({
        message: "No Coin found on Api",
        data: null
      });
    }
  });
}

module.exports.scoreRoutes = scoreRoutes;
