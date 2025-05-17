import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { router } from './router/routes'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

export { app }
