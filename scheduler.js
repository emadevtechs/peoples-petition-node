const schedule = require("node-schedule");
var filePath = require("./config/initializers");
const db = require("./db/connection");

// api version
var currentVersion = filePath.currentVersionNumber;

// Require all the necessary models here

bitcoin = require("./src/" + currentVersion + "/models/bitcoin");
bitcoin_cash = require("./src/" + currentVersion + "/models/bitcoin_cash");
ethereum = require("./src/" + currentVersion + "/models/ethereum");
litecoin = require("./src/" + currentVersion + "/models/litecoin");
ripple = require("./src/" + currentVersion + "/models/ripple");
doge = require("./src/" + currentVersion + "/models/doge");

function scheduleCall() {

  bitcoin.getFee(null, function(err, trans_fees) {
    if (err) {
      console.log("btc store error", err);
    } else {
      let trans_fee_amount = trans_fees && trans_fees.fastestFee;
      let calculation = (255 * trans_fee_amount) / 100000000;
      var table_data = {
        coin: "btc",
        fee: calculation,
        date: new Date(),
        output_count: "1"
      };
      db.createRow(table_data, function(err, datas) {
        if (err) {
          console.log("btc store error", err);
        } else {
          console.log("btc stored on db", datas);
        }
      });
    }
  });

  bitcoin_cash.getFee(null, function(err, fee) {
    var res_data = JSON.parse(fee);
    if (res_data && res_data.payload && res_data.payload.average) {
      var table_data = {
        coin: "bch",
        fee: res_data.payload.average,
        date: new Date(),
        output_count: null
      };
      db.createRow(table_data, function(err, datas) {
        if (err) {
          console.log("bch stored error", err);
        } else {
          console.log("bch stored on db", datas);
        }
      });
    }
  });

  ethereum.getFee(null, function(err, fee) {
    var res_data = fee;
    if (err) {
      console.log("eth stored error", err);
    } else {
      if (res_data) {
        var table_data = {
          coin: "eth",
          fee: (parseFloat(res_data) * 21000) / 1000000000,
          date: new Date(),
          output_count: null
        };
        db.createRow(table_data, function(err, datas) {
          if (err) {
            console.log("eth stored error", err);
          } else {
            console.log("eth stored on db", datas);
          }
        });
      } else {
        console.log("eth stored error");
      }
    }
  });

  litecoin.getFee(null, function(err, fee) {
    var res_data = JSON.parse(fee);
    if (res_data && res_data.payload && res_data.payload.average) {
      var table_data = {
        coin: "ltc",
        fee: res_data.payload.average,
        date: new Date(),
        output_count: null
      };
      db.createRow(table_data, function(err, datas) {
        if (err) {
          console.log("ltc stored error", err);
        } else {
          console.log("ltc stored on db", datas);
        }
      });
    }
  });

  ripple.getFee(null, function(err, fee) {
    var res_data = fee != "NaN" ? JSON.parse(fee) : null;
    if (res_data) {
      var table_data = {
        coin: "xrp",
        fee: res_data,
        date: new Date(),
        output_count: null
      };
      db.createRow(table_data, function(err, datas) {
        if (err) {
          console.log("xrp stored error", err);
        } else {
          console.log("xrp stored on db", datas);
        }
      });
    }else{
      console.log("xrp stored error");
    }
  });

  doge.getFee(null, function(err, fee) {
    var res_data = JSON.parse(fee);
    if (err) {
      console.log('error on saving doge', err)
    } else {
      if (res_data && res_data.payload) {
        var table_data = { coin: "doge", fee: res_data.payload.average, date: new Date(), output_count: null };
        db.createRow(table_data, function(err, datas) {
          if (err) {
            console.log('error on saving doge', err)
          } else {
            // response.end();
            console.log("doge stored on db", datas);
          }
        });
      } else {
        console.log("doge stored error");
      }
    }
  });
}
const job = schedule.scheduleJob("*/5 * * * *", function() {
  scheduleCall();
});
