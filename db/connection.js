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
  id serial,
  name varchar,
  email varchar,
  password varchar
);
`;

const create_posts_query = `
CREATE TABLE IF NOT EXISTS posts (
  id serial,
  file_name varchar,
  file_url varchar,
  file_type varchar,
  file_id varchar,
  accessor_names varchar
);
`;

const create_relation_query = `
CREATE TABLE IF NOT EXISTS userfriends (
  id serial,
  user_id varchar,
  friend_name varchar,
  friend_email varchar
);
`;


client
  .query(create_user_query)
  .then(result => console.log('user table created successfully')) // your callback here
  .catch(e => console.error('db connection error',e.stack)) // your callback here
  // .then(() => client.end());

client
  .query(create_posts_query)
  .then(result => console.log('post table created successfully')) // your callback here
  .catch(e => console.error('db connection error',e.stack)) // your callback here
  // .then(() => client.end());

client
  .query(create_relation_query)
  .then(result => console.log('relation table created successfully')) // your callback here
  .catch(e => console.error('db connection error',e.stack)) // your callback here
  // .then(() => client.end());


module.exports = {
  client
};
