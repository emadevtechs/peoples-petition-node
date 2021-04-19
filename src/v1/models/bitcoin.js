const fetch = require("node-fetch");
require("dotenv").config();
const url = "https://mempool.space/api/v1/fees/recommended";
module.exports.getFee = function(newKyc, callback) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        callback(null, data)
      })
      .catch(err => callback(err, null));
};
