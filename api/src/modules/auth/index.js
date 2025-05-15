import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export const login = async ctx => {
  const { email, password } = ctx.request.body

  try {
    const [user] = await prisma.user.findMany({
      where: { email, password },
    })
    if (!email || !password) {
      ctx.status = 400
      ctx.body = { error: 'Email and password are required.' }
      return
    }

    if (!user) {
      ctx.status = 404
      ctx.body = { error: 'User not found.' }
      return
    }

    if (!user || user.password !== password) {
      ctx.status = 401
      ctx.body = { error: 'Invalid email or password.' }
      return
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    ctx.body = { user, token }
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
