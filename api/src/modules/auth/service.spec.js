import { decodeBasicToken } from './services'

describe('Auth Module', () => {
  it('should return credentials by basic authentication token', () => {
    // prepare
    const email = 'rufi@gmail.com'
    const password = '12345678'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
    const basicToken = `Basic ${token}`

    //execution
    const result = decodeBasicToken(basicToken)

    //expectation
    expect(result).toEqual(['rufi@gmail.com', '12345678'])
  })

  it('should throw new error when token is not Basic type', () => {
    // prepare
    const email = 'rufi@gmail.com'
    const password = '12345678'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
    const basicToken = `Bearer ${token}`

    //expectation
    expect(() => decodeBasicToken(basicToken)).toThrowError(
      'Invalid authentication type.'
    )
  })
})
