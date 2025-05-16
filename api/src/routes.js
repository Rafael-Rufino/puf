import Router from '@koa/router'
import * as auth from './modules/auth'
import * as users from './modules/users'

export const router = new Router()

//Auth
router.get('/auth/login', auth.login)

//Users
router.get('/users', users.list)
router.post('/users', users.create)
router.put('/users/:id', users.update)
router.delete('/users/:id', users.remove)
