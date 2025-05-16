import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export const login = async ctx => {
  const { email, password } = ctx.request.body

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!email || !password) {
      ctx.status = 400
      ctx.body = { error: 'Email and password are required.' }
      return
    }
    const passwordEqual = await bcrypt.compare(password, user.password)

    if (!user || !passwordEqual) {
      ctx.status = 404
      ctx.body = { error: 'User not found.' }
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
