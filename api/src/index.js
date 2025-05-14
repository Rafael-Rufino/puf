import 'dotenv-safe/config'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { router } from './routes'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})
