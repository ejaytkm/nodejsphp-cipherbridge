<?php

function decryptCipher($data, $ENCRYPTION_KEY) {
  $decoded = json_decode($data);
  $ciphertext = $decoded->ciphertext;
  $iv = $decoded->iv;
  $extra = $decoded->extra;

  $decrypted = openssl_decrypt(
    hex2bin($ciphertext),
    'aes-256-cbc',
    $ENCRYPTION_KEY,
    OPENSSL_RAW_DATA,
    hex2bin($iv)
  );

  if ($decrypted === false) {
    throw new Exception('Error. Please check your keys.');
  };

  return $decrypted;
}
