const request = require('request-promise')
const CryptoJS = require('crypto-js')
function CryptoJSAesEncrypt (passphrase, plainText) {
  const salt = CryptoJS.lib.WordArray.random(256)
  const iv = CryptoJS.lib.WordArray.random(16)
  const key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 })
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {iv: iv})
  const data = {
    ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    salt: CryptoJS.enc.Hex.stringify(salt),
    iv: CryptoJS.enc.Hex.stringify(iv)
  }
  return data
}
module.exports = (uri, publicKey, privateKey) => {
  return {
    send: async (data) => {
      const encrypted = CryptoJSAesEncrypt(privateKey, data)
      const response = await request({
        uri: uri,
        method: 'POST',
        json: true,
        body: {
          ciphertext: encrypted.ciphertext,
          salt: encrypted.salt,
          iv: encrypted.iv,
          public_key: publicKey
        }
      })
      return response
    }
  }
}
