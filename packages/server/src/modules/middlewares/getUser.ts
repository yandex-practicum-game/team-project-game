import type { NextFunction, Request, Response } from 'express'

import axios from 'axios'

const getUser = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const authCookie = req.cookies.authCookie
    const uuid = req.cookies.uuid
    const endpoint = 'https://ya-praktikum.tech/api/v2/auth/user'

    if (authCookie && uuid) {
      const res = await axios.get(endpoint, {
        headers: {
          Cookie: `authCookie=${authCookie};uuid=${uuid}`,
        },
      })

      const { id } = res.data as { id: string }

      req.body.userId = id
    }

    next()
  } catch (error) {
    console.error('[getUser] error:', error)
    next(error)
  }
}

export default getUser
