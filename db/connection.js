require("dotenv").config();
const Pool = require("pg").Pool;
const districtList = require('./districtList');

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

client.connect();

const create_user_query = `
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name varchar,
  email varchar,
  password varchar,
  phone_number bigint,
  profile_url varchar,
  address varchar,
  district varchar
);
`;

const create_posts_query = `
CREATE TABLE IF NOT EXISTS posts (
  id serial,
  picture_url varchar,
  user_id int,
  status varchar,
  district varchar,
  text varchar,
  FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);
`;

const create_district_query = `
CREATE TABLE IF NOT EXISTS districts (
  id integer,
  name varchar,
  password varchar
);
`;

const delete_district_query = `DROP TABLE IF EXISTS districts;`;


client
  .query(create_user_query)
  .then(result => {
      console.log('user table created successfully'),
      client
        .query(create_posts_query)
        .then(result => console.log('post table created successfully')) // your callback here
        .catch(e => console.error('post db connection error',e.stack)) // your callback here
    // .then(() => client.end());

  } 
    ) // your callback here
  .catch(e => console.error('user db connection error',e.stack)) // your callback here
  // .then(() => client.end());

client
  .query(delete_district_query)
  .then(result => {
      console.log('district table delete successfully'),
    client
      .query(create_district_query)
      .then(result => {console.log('district table created successfully'), createDistrict()}) // your callback here
      .catch(e => console.error('post db connection error',e.stack)) // your callback here
  // .then(() => client.end());
  }
  ) // your callback here
  .catch(e => console.error('user db connection error',e.stack)) // your callback here
  // .then(() => client.end());

async function createDistrict(){
  let data = await client.query("SELECT * FROM districts");
  console.log('.....da',data);
    if(data && data.rows && data.rows.length > 0){
      console.log('Already presented')
    }else{
      districtList.districtList.map((item) => {
        client.query('INSERT INTO districts(id, name, password) VALUES ($1,$2,$3)', [item.id,item.name,item.name])
        .then(data=> {
          console.log("records have been inserted");
        })
        .catch(error=> {
          console.log("Error, no records inserted",error);
        });
      });
    }
}

module.exports = {
  client
};
