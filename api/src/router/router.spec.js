import request from 'supertest'
import { app } from '../server'

const server = app.listen()

describe('Auth Router', () => {
  it('should return 200 for GET /auth/login', async () => {
    const password = '12345678'
    const email = 'rufi@gmail.com'
    const response = await request(server)
      .get('/auth/login')
      .auth(email, password)
      .expect(200)

    expect(response.status).toBe(200)
  })
  it('should return logged in user by correct credentials', async () => {
    const email = 'rufi@gmail.com'
    const password = '12345678'

    const result = await request(server)
      .get('/auth/login')
      .auth(email, password)

    expect(result.status).toBe(200)
    expect(result.body).toBeTruthy()
    expect(result.body.user.id).toBeTruthy()
    expect(result.body.user.password).toBeFalsy()
    expect(result.body.token).toBeTruthy()
  })

  it('should return not found with wrong email', async () => {
    const email = 'erro@gmail.com'
    const password = '12345678'

    const result = await request(server)
      .get('/auth/login')
      .auth(email, password)

    expect(result.status).toBe(404)
  })

  it('should return not found with wrong password', async () => {
    const email = 'rufi@gmail.com'
    const password = '1234567'

    const result = await request(server)
      .get('/auth/login')
      .auth(email, password)

    expect(result.status).toBe(401)
  })
})
