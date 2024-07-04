# Interface: JWTDecryptOptions

## [💗 Help the project](https://github.com/sponsors/panva)

Support from the community to continue maintaining and improving this module is welcome. If you find the module useful, please consider supporting the project by [becoming a sponsor](https://github.com/sponsors/panva).

---

Combination of JWE Decryption options and JWT Claims Set verification options.

## Table of contents

### Properties

- [audience](jwt_decrypt.JWTDecryptOptions.md#audience)
- [clockTolerance](jwt_decrypt.JWTDecryptOptions.md#clocktolerance)
- [contentEncryptionAlgorithms](jwt_decrypt.JWTDecryptOptions.md#contentencryptionalgorithms)
- [crit](jwt_decrypt.JWTDecryptOptions.md#crit)
- [currentDate](jwt_decrypt.JWTDecryptOptions.md#currentdate)
- [issuer](jwt_decrypt.JWTDecryptOptions.md#issuer)
- [keyManagementAlgorithms](jwt_decrypt.JWTDecryptOptions.md#keymanagementalgorithms)
- [maxPBES2Count](jwt_decrypt.JWTDecryptOptions.md#maxpbes2count)
- [maxTokenAge](jwt_decrypt.JWTDecryptOptions.md#maxtokenage)
- [requiredClaims](jwt_decrypt.JWTDecryptOptions.md#requiredclaims)
- [subject](jwt_decrypt.JWTDecryptOptions.md#subject)
- [typ](jwt_decrypt.JWTDecryptOptions.md#typ)

## Properties

### audience

• `Optional` **audience**: `string` \| `string`[]

Expected JWT "aud" (Audience) Claim value(s).

This option makes the JWT "aud" (Audience) Claim presence required.

___

### clockTolerance

• `Optional` **clockTolerance**: `string` \| `number`

Expected clock tolerance

- In seconds when number (e.g. 5)
- Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").

___

### contentEncryptionAlgorithms

• `Optional` **contentEncryptionAlgorithms**: `string`[]

A list of accepted JWE "enc" (Encryption Algorithm) Header Parameter values. By default all
"enc" (Encryption Algorithm) values applicable for the used key/secret are allowed.

___

### crit

• `Optional` **crit**: `Object`

An object with keys representing recognized "crit" (Critical) Header Parameter names. The value
for those is either `true` or `false`. `true` when the Header Parameter MUST be integrity
protected, `false` when it's irrelevant.

This makes the "Extension Header Parameter "..." is not recognized" error go away.

Use this when a given JWS/JWT/JWE profile requires the use of proprietary non-registered "crit"
(Critical) Header Parameters. This will only make sure the Header Parameter is syntactically
correct when provided and that it is optionally integrity protected. It will not process the
Header Parameter in any way or reject the operation if it is missing. You MUST still verify the
Header Parameter was present and process it according to the profile's validation steps after
the operation succeeds.

The JWS extension Header Parameter `b64` is always recognized and processed properly. No other
registered Header Parameters that need this kind of default built-in treatment are currently
available.

___

### currentDate

• `Optional` **currentDate**: [`Date`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date )

Date to use when comparing NumericDate claims, defaults to `new Date()`.

___

### issuer

• `Optional` **issuer**: `string` \| `string`[]

Expected JWT "iss" (Issuer) Claim value(s).

This option makes the JWT "iss" (Issuer) Claim presence required.

___

### keyManagementAlgorithms

• `Optional` **keyManagementAlgorithms**: `string`[]

A list of accepted JWE "alg" (Algorithm) Header Parameter values. By default all "alg"
(Algorithm) Header Parameter values applicable for the used key/secret are allowed except for
all PBES2 Key Management Algorithms, these need to be explicitly allowed using this option.

___

### maxPBES2Count

• `Optional` **maxPBES2Count**: `number`

(PBES2 Key Management Algorithms only) Maximum allowed "p2c" (PBES2 Count) Header Parameter
value. The PBKDF2 iteration count defines the algorithm's computational expense. By default
this value is set to 10000.

___

### maxTokenAge

• `Optional` **maxTokenAge**: `string` \| `number`

Maximum time elapsed (in seconds) from the JWT "iat" (Issued At) Claim value.

- In seconds when number (e.g. 5)
- Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").

This option makes the JWT "iat" (Issued At) Claim presence required.

___

### requiredClaims

• `Optional` **requiredClaims**: `string`[]

Array of required Claim Names that must be present in the JWT Claims Set. Default is that: if
the [`issuer` option](types.JWTClaimVerificationOptions.md#issuer) is set, then JWT "iss" (Issuer)
Claim must be present; if the [`audience` option](types.JWTClaimVerificationOptions.md#audience) is
set, then JWT "aud" (Audience) Claim must be present; if the
[`subject` option](types.JWTClaimVerificationOptions.md#subject) is set, then JWT "sub" (Subject)
Claim must be present; if the
[`maxTokenAge` option](types.JWTClaimVerificationOptions.md#maxtokenage) is set, then JWT "iat"
(Issued At) Claim must be present.

___

### subject

• `Optional` **subject**: `string`

Expected JWT "sub" (Subject) Claim value.

This option makes the JWT "sub" (Subject) Claim presence required.

___

### typ

• `Optional` **typ**: `string`

Expected JWT "typ" (Type) Header Parameter value.

This option makes the JWT "typ" (Type) Header Parameter presence required.
