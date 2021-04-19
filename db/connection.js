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
  address varchar,
  score varchar,
  date timestamp,
  last_update timestamp
);
`;

client
  .query(create_table_query)
  .then(result => console.log('table created successfully')) // your callback here
  .catch(e => console.error('db connection error',e.stack)) // your callback here
  // .then(() => client.end());

const createRow = (request, callback) => {
  const { coin, score, address, date, last_update } = request;

  client.query(
    "INSERT INTO blockchain_score (coin, score, address, date, last_update) VALUES ($1, $2, $3, $4, $5) RETURNING coin, score, address, date, last_update",
    [coin, score, address, date, last_update],
    (error, result) => {
      if (error) {
        callback(error, null);
      }else{
        callback(error, result.rows[0]);
      }
      // client.end();
    }
  );
};

const updateRow = (request, callback) => {
  const {address, last_update } = request;

  client.query(
    "UPDATE blockchain_score SET last_update = $1 WHERE address = $2 RETURNING coin, score, address, date, last_update",
    [last_update, address],
    (error, result) => {
      if (error) {
        callback(error, null);
      }else{
        callback(error, result.rows[0]);
      }
      // client.end();
    }
  );
};


const getRow = (req, callback) => {
  client.query("SELECT * FROM blockchain_score WHERE address = $1",[req], (err, result) => {
    if(err){
      callback(err, null);
    }else{
      callback(null, result.rows[0]);
    }
  })
}

module.exports = {
  createRow,
  getRow,
  updateRow
};
