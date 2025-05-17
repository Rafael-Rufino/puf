import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { router } from './router/routes'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('Erro no servidor:', err)
    ctx.status = err.status || 500
    ctx.body = { error: 'Erro interno do servidor.' }
  }
})

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

export { app }
