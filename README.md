How to use: 

NODEJS server Example
```javascript
const bridge = require('nodejsphp-cipherbridge')(uri, {BRIDGE_PUBLICKEY}, {BRIDGE_PRIVATEKEY})

const data = await bridge.send('SELECT * FROM table where id = 2')
```

PHP server Example
```php
require_once dirname(__FILE__) . '';
$string = decryptCipher({data}, ${BRIDGE_PRIVATEKEY});

echo $string;
```

When to use:
- Simple encryption and decryption strings from javascript to php. Server engine - node js 9
- Simply require the file, and fill details as the following

Generate a new bridge public key & bridge private key
```
node node_modules/nodejsphp-cipherbridge/generation/generate.js
```
