<?php
function decryptCipher($data, $privatekey) {
  $decoded = json_decode($data);
  $publickey = $decoded->public_key;
  $salt = $decoded->salt;
  $iv = $decoded->iv;
  $ciphertext = $decoded->ciphertext;

  if (! function_exists('hash_hmac')) {
    function hash_hmac($algo, $data, $key, $raw_output = false) {
      if (strlen($key) > 64) $key = hash($algo, $key);
      $key = str_pad($key, 64, chr(0));
      $o_pad = str_repeat('\\', 64) ^ $key;
      $i_pad = str_repeat('6', 64) ^ $key;
      return hash_tiger_rev($algo, $o_pad . hash_tiger_rev($algo, $i_pad . $data, true), $raw_output);
    };
  };

  $salty = sha1($publickey);
  $d = hash_hmac('sha1', $publickey, $salty);

  if ($d !== $privatekey) {
    throw new Exception('Wrong private key');
  }

  try {
    $salt = hex2bin($salt);
    $iv  = hex2bin($iv);
  } catch(Exception $e) {
    throw new Exception('Error, wrong data hashing. Please check again your keys.');
  }

  $ciphertext = base64_decode($ciphertext);
  $iterations = 999;
  $key = hash_pbkdf2('sha512', $privatekey, $salt, $iterations, 64);
  $decrypted= openssl_decrypt($ciphertext , 'aes-256-cbc', hex2bin($key), OPENSSL_RAW_DATA, $iv);

  return $decrypted;
}
