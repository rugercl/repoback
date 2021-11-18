// Update with your config settings.

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: "./db/ecommerce.db3",
//     },
//   },
//   useNullAsDefault: true,
//   pool:{min:2, max:8}

// };

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./db/ecommerce.db3",
  },
  useNullAsDefault: true,

  pool: { min: 2, max: 8 },
});

module.exports = knex

