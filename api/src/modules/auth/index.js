import jwt from 'jsonwebtoken'
import { prisma } from '../../data'
import { decodeBasicToken } from '../auth/services'

export const login = async ctx => {
  try {
    const [email, password] = decodeBasicToken(
      ctx.request.headers.authorization
    )

    if (!email || !password) {
      ctx.status = 400
      ctx.body = { error: 'Email and password are required.' }
      return
    }

    const user = await prisma.user.findUnique({
      where: { email, password },
    })

    if (!user) {
      ctx.status = 404
      ctx.body = { error: 'User not found.' }
      return
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password)

    // if (!isPasswordValid) {
    //   ctx.status = 401
    //   ctx.body = { error: 'credentials are invalid.' }
    //   return
    // }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    const { password: _, ...userWithoutPassword } = user
    ctx.body = { user: userWithoutPassword, token }

    ctx.status = 200
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
