import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../data'
import { decodeBasicToken } from '../auth/services'

export const login = async ctx => {
  try {
    const [email, password] = decodeBasicToken(
      ctx.request.headers.authorization
    )
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
