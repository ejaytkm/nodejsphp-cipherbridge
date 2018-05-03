const request = require('request-promise')
const crypto = require('crypto')

function encrypt (ENCRYPTION_KEY, plainText) {
  let iv = crypto.randomBytes(16)
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(plainText)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return {
    iv: iv.toString('hex'),
    ciphertext: encrypted.toString('hex')
  }
}

module.exports = (uri, ENCRYPTION_KEY) => {
  return {
    send: async (data, extra = null) => {
      const encrypted = encrypt(ENCRYPTION_KEY, data)
      const response = await request({
        uri: uri,
        method: 'POST',
        json: true,
        body: JSON.stringify({
          ciphertext: encrypted.ciphertext,
          iv: encrypted.iv,
          extra: extra
        })
      })
      return response
    }
  }
}
