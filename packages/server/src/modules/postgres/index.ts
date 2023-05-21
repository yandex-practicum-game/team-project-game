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

const dbConnect = async () => {
  try {
    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}

export default { pool, dbConnect }
