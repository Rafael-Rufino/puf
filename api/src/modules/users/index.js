import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const list = async ctx => {
  try {
    const users = await prisma.user.findMany()
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}

export const create = async ctx => {
  try {
    const { name, email, password } = ctx.request.body

    if (!email || !password) {
      ctx.status = 400
      ctx.body = { error: 'Email and password are required.' }
      return
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    ctx.status = 201
    ctx.body = user
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
export const update = async ctx => {
  const { id } = ctx.params
  const { name, email, password } = ctx.request.body
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    })
    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
export const remove = async ctx => {
  const { id } = ctx.params
  try {
    await prisma.user.delete({
      where: { id },
    })
    ctx.status = 204
    ctx.body = null
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
