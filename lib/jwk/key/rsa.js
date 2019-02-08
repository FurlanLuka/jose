const { promisify } = require('util')
const { generateKeyPairSync, generateKeyPair: async } = require('crypto')

const generateKeyPair = promisify(async)

const Key = require('./base')

const SIG_ALGS = new Set([
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512'
])

const WRAP_ALGS = new Set([
  'RSA-OAEP',
  'RSA1_5'
])

class RSAKey extends Key {
  constructor (...args) {
    super(...args)
    Object.defineProperties(this, {
      length: {
        get () {
          Object.defineProperty(this, 'length', {
            value: Buffer.byteLength(this.n, 'base64') * 8,
            configurable: false
          })

          return this.length
        },
        configurable: true
      }
    })
  }

  thumbprintMaterial () {
    return { e: this.e, kty: 'RSA', n: this.n }
  }

  algorithms (operation, { use = this.use, alg = this.alg } = {}) {
    if (alg) {
      return new Set(this.algorithms(operation, { alg: null, use }).has(alg) ? [alg] : undefined)
    }

    switch (operation) {
      case 'encrypt':
      case 'decrypt':
        return new Set()
      case 'sign':
        if (this.public || use === 'enc') {
          return new Set()
        }

        return new Set(SIG_ALGS)
      case 'verify':
        if (use === 'enc') {
          return new Set()
        }

        return new Set(SIG_ALGS)
      case 'wrapKey':
        if (use === 'sig') {
          return new Set()
        }

        return new Set(WRAP_ALGS)
      case 'unwrapKey':
        if (this.public || use === 'sig') {
          return new Set()
        }

        return new Set(WRAP_ALGS)
      case undefined:
        return new Set([
          ...this.algorithms('sign'),
          ...this.algorithms('verify'),
          ...this.algorithms('wrapKey'),
          ...this.algorithms('unwrapKey')
        ])
      default:
        throw new TypeError('invalid key operation')
    }
  }

  static async generate (len = 2048, opts, privat = true) {
    if (!Number.isSafeInteger(len) || len < 512 || len % 8 !== 0) {
      throw new TypeError('invalid bit length')
    }

    const { privateKey, publicKey } = await generateKeyPair('rsa', { modulusLength: len })

    return new RSAKey(privat ? privateKey : publicKey, opts)
  }

  static generateSync (len = 2048, opts, privat = true) {
    if (!Number.isSafeInteger(len) || len < 512 || len % 8 !== 0) {
      throw new TypeError('invalid bit length')
    }

    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: len })

    return new RSAKey(privat ? privateKey : publicKey, opts)
  }
}

module.exports = RSAKey