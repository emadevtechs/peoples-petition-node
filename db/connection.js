require("dotenv").config();
const Pool = require("pg").Pool;
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

client.connect();
const create_table_query = `
CREATE TABLE IF NOT EXISTS blockchain_score (
    coin varchar,
    score varchar,
    date timestamp
);
`;

client
  .query(create_table_query)
  .then(result => console.log('table created successfully')) // your callback here
  .catch(e => console.error('db connection error',e.stack)) // your callback here
  // .then(() => client.end());

const createRow = (request, callback) => {
  const { coin, score, date } = request;

  client.query(
    "INSERT INTO blockchain_score (coin, score, date) VALUES ($1, $2, $3) RETURNING coin, score, date",
    [coin, score, date],
    (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result.rows[0]);
      // client.end();
    }
  );
};

module.exports = {
  createRow
};
