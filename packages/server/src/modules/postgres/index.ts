import { Pool, Client } from 'pg'

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env
const { POSTGRES_DB, POSTGRES_PORT } = process.env

const pool = new Pool({
  user: POSTGRES_USER,
  host: 'localhost',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
})

const client = new Client({
  user: POSTGRES_USER,
  host: 'localhost',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
})

export default { pool, client }
