import pg from './modules/postgres'
import prisma from './modules/prisma'

const dbConnect = async () => {
  try {
    await pg.client.connect()
    console.log('  ➜ 🎸 Postgres connected to the database')
    pg.client.end()

    await prisma.$connect()
    console.log('  ➜ 🎸 Prisma connected to the database')
  } catch (error) {
    console.error('[Error] dbConnect: ', error)
  }

  return null
}

export default dbConnect
