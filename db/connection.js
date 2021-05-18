require("dotenv").config();
const Pool = require("pg").Pool;
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


module.exports = {
  client
};
