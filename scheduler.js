var cloudinary = require('cloudinary');

cloudinary.config({
 cloud_name: "dev-techs", // add your cloud_name
 api_key: "757448982962549", // add your api_key
 api_secret: "PXbYqShfrXJUZsdvE3lzx4V79JM", // add your api_secret
 secure: false
});

cloudinary.v2.api.resources({
  type: 'upload',
},function(error, result) { console.log(result, error) });