'use strict';

function isPrime(a) {
  let res = true;
  for (let i = 2; i * i <= a; i++) {
    if (a % i === 0) {
      res = false;
      break;
    }
  }
  return res;
}

class ModArith {
  constructor(m) {
    if (!isPrime(m)) {
      throw new Error('m must be prime');
    }
    this.mod = m;
  }

  // returns [gcd, x, y] such as a*x + b*y = gcd(a, b)
  static gcdExtended(a, b) {
    if (a === 0) {
      return [b, 0, 1];
    } else if (a === 0n){
      return [b, 0n, 1n];
    }
    const [gcd, x1, y1] = ModArith.gcdExtended(b % a, a);
    return [gcd, y1 - (b - (b % a)) / a * x1, x1];
  }

  mul(a, b) {
    if (typeof a === 'bigint' && typeof b === 'bigint') {
      const m = BigInt(this.mod);
      return ((a % m) * (b % m)) % m;
    } else {
      const m = this.mod;
      return Number((BigInt(a % m) * BigInt(b % m)) % BigInt(m));
    }
  }

  inv(a) {
    const m = (typeof a === 'bigint') ? BigInt(this.mod) : this.mod;
    const [g, x, _] = ModArith.gcdExtended(a, m);
    if (g != 1) {
      throw new RangeError('Division by zero');
    }
    return (x % m + m) % m;
  }

  div(a, b) {
    const m = (typeof a === 'bigint' && typeof b === 'bigint') ?
              BigInt(this.mod) : this.mod;
    return this.mul(a % m, this.inv(b % m));
  }

  pow(a, b) {
    let res = (typeof a === 'bigint') ? 1n : 1;
    const two = (typeof b === 'bigint') ? 2n: 2;
    while (b != 0) {
      if (b % two) {
        res = this.mul(res, a);
        b--;
      }
      b /= two;
      a = this.mul(a, a);
    }
    return res;
  }

  fac(a) {
    if (a < 2) {
      return 1;
    }
    const bigMod = BigInt(this.mod);
    let bigA = BigInt(a);
    let res = bigA;
    while (bigA > 2) {
      --bigA;
      res = (res * bigA) % bigMod;
    }
    return Number(res);
  }
}

module.exports = ModArith;

