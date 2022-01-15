const kenx = require('knex');

module.exports = (on, config) => {
  on('task', {
    async tableInsert ({ table, rows, truncate }) {
      const client = await kenx({
        client: 'pg',
        connection: config.env.database
      });
      if (truncate) {
        await client.raw(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
      }
      return client.insert(rows, ['id']).into(table);
    },
    async tableSelect ({ table }) {
      const client = await kenx({
        client: 'pg',
        connection: config.env.database
      });
      return client.select().table(table);
    },
    async tableTruncate ({ table }) {
      const client = await kenx({
        client: 'pg',
        connection: config.env.database
      });
      return client.raw(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
    },
  });
}