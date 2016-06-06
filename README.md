# Symmetric encryption between Java  and JS

## About  AES encryption

The Advanced Encryption Standard or AES is a symmetric block cipher used by the U.S. government to protect classified information and is implemented in software and hardware throughout the world to encrypt sensitive data.

###Parts of AES encrytion

* <b>Passphrase</b>: This is the password or key. 
* <b>Iteration count</b>: The number of iterations prevents   attacks which  use pre-computed values for given passwords in order to guess a secret key.
* <b>Key size</b>: Is the number of bits in a key used by a cryptographic algorithm.
* <b>Salt</b>: A salt is random data that is used as an additional input to a one-way function that "hashes" a password or passphrase.
* <b>IV</b>: An initialization vector, much like a salt, introduces randomness. However, unlike a salt, which is applied to the secret key the initialization vector is applied to the data to be encrypted.

## Libraries

### JAVA

* java.security
* javax.crypto
* org.apache.commons.codec

### JS

* CryptoJS 

## Scenarios

### First Scenario: Using obfuscation

 * Example :

 jetty:run
 
 http://localhost:8080/public/
 
 [first scenario ](https://github.com/akaiserg/symmetric_encryption_java_js/blob/master/pic1.png)
 
 ### Second scenario: Using login information 

 * Example :

 jetty:run
 
 http://localhost:8080/intranet/
 
 [second scenario ](https://github.com/akaiserg/symmetric_encryption_java_js/blob/master/pic2.png)

