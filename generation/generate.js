let crypto = require('crypto');
const publicKey = crypto.randomBytes(50).toString('hex')
var privateKey = crypto.createHmac("sha1", "0").update(publicKey).digest().toString('base64');

console.log({
  privateKey,
  publicKey
})
