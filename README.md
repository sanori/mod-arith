# Modular Arithmetic in JavaScript

division, inverse, factorial operations on modular prime


## APIs

- `mo = new ModArith(p)` : Creates a ModArith object for given prime `p`.
- `mo.mul(a, b)`: multiplication. (= $a \times b \mod p$)
- `mo.div(a, b)`: division (= $a / b \mod p$)
- `mo.inv(a)`: the multiplicative inverse of `a` (= $1/a \mod p$)
- `mo.pow(a, b)`: `a` to the power of `b` (= $a ^ b \mod p$)
- `mo.fac(a)`: factorial of `a` (= $a! \mod p$)

## Caveats
- `div(a, 0)` and `inv(0)` raise "RangeError: Division by zero." They does not return `Infinity` because infinity is not a valid value for the modular arithmetic.

## Alternatives
- [@guildofweavers/galois](https://github.com/GuildOfWeavers/galois)
