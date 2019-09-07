import * as Pool from 'pg';

const pool = new Pool.Pool({
  user: `${process.env.USER}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  password: `${process.env.PASSWORD}`,
  port: `${process.env.PG_PORT}`,
});

export default pool;