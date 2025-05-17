// type: Basic
// credentials: base64(email:password)
export const decodeBasicToken = basicToken => {
  const [type, credentials] = basicToken.split(' ')
  if (!basicToken) {
    return null
  }
  if (type !== 'Basic') {
    throw new Error('Invalid authentication type.')
  }
  return Buffer.from(credentials, 'base64').toString('utf8').split(':')
}
