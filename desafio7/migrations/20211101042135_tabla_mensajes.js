
exports.up = function(knex) {
    knex.schema
    .createTable("mensajes", function (table) {
      table.increments("id").primary();
      table.string("email", 128);
      table.string("texto", 200);
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('update_at').defaultTo(knex.fn.now())
      table.timestamp('delete_at').defaultTo(knex.fn.now())
        })
    .then(() => {
      console.log("Tabla Creada");
    })
    .catch((err) => {
      throw err;
    });
};

exports.down = function(knex) {
  
};
