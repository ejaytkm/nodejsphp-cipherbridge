const crypto = require('crypto');
const privateKey = crypto.randomBytes(16).toString('hex')

console.log({
  privateKey
})
