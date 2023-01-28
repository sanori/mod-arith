'use strict';

const ModOper = require('../mod-arith');
const MOD = 1e9 + 7;
const BIG_MOD = BigInt(MOD);
const RANGE_MIN = 1;
const RANGE_MAX = Number.MAX_SAFE_INTEGER;
const NUM_TESTS = 1000;

describe('ModOper', () => {
  const pairs = [];
  const bigPairs = [];
  const numbers = [];

  // Generate test cases
  beforeAll(() => {
    // pairs of numbers within RANGE_MIN ~ RANGE_MAX - 1
    for (let i = 0; i < NUM_TESTS; i++) {
      const a = Math.floor(Math.random() * (RANGE_MAX - RANGE_MIN)) + RANGE_MIN;
      const b = Math.floor(Math.random() * (RANGE_MAX - RANGE_MIN)) + RANGE_MIN;
      pairs[i] = [a, b];
      bigPairs[i] = [BigInt(a), BigInt(b)];
    }
    // numbers within 0 ~ MOD
    for (let i = 0; i < NUM_TESTS; i++) {
      const a = Math.floor(Math.random() * MOD);
      numbers[i] = a;
    }
  });

  describe('static gcdExtended', () => {
    test('should return [gcd, x, y] s.t. a*x + b*y = gcd(a, b)', () => {
      for (const [a, b] of pairs) {
        const [g, x, y] = ModOper.gcdExtended(a, b);
        expect(BigInt(a) * BigInt(x) + BigInt(b) * BigInt(y)).toBe(BigInt(g));
        expect(a % g).toBe(0);
        expect(b % g).toBe(0);
      }
    });
    test('should work with BigInt type', () => {
      for (const [a, b] of bigPairs) {
        const [g, x, y] = ModOper.gcdExtended(a, b);
        expect(typeof g).toBe('bigint');
        expect(typeof x).toBe('bigint');
        expect(typeof y).toBe('bigint');
        expect(a * x + b * y).toBe(g);
        expect(a % g).toBe(0n);
        expect(b % g).toBe(0n);
      }
    });
  });

  describe('mul', () => {
    const mo = new ModOper(MOD);
    test('should return the value of modulo multiplication', () => {
      for (const [a, b] of pairs) {
        const c = mo.mul(a, b);
        const d = mo.mul(b, a);
        expect(c).toEqual(d);
        expect(Number((BigInt(a) * BigInt(b)) % BIG_MOD)).toEqual(c);
      }
    });
    test('should work with BigInt type', () => {
      for (const [a, b] of bigPairs) {
        const c = mo.mul(a, b);
        const d = mo.mul(b, a);
        expect(c).toEqual(d);
        expect((BigInt(a) * BigInt(b)) % BIG_MOD).toEqual(c);
      }
    });
  });

  describe('inv', () => {
    const mo = new ModOper(MOD);
    test('should raise RangeError when the input is 0', () => {
      expect(() => mo.inv(0)).toThrow(RangeError);
      expect(() => mo.inv(MOD)).toThrow(RangeError);
    });
    test('should generate inverse of input', () => {
      for (const a of numbers) {
        const b = mo.inv(a);
        expect((BigInt(a) * BigInt(b)) % BIG_MOD).toBe(1n);
      }
    });
    test('should work with BigInt type', () => {
      for (const [a, _] of bigPairs) {
        const b = mo.inv(a);
        expect((a * b) % BIG_MOD).toBe(1n);
      }
    });
  });

  describe('div', () => {
    const mo = new ModOper(MOD);
    test('should raise "RangeError: Division by zero" when the denominator is 0', () => {
      const f = () => mo.div(10, 0);
      expect(f).toThrow(RangeError);
      expect(f).toThrow('Division by zero');
    });
    test('should return division value of modular', () => {
      for (const [a, b] of pairs) {
        const c = mo.div(a, b);
        const d = mo.div(a, c);
        expect((BigInt(b) * BigInt(c)) % BIG_MOD).toBe(BigInt(a % MOD));
        expect(b % MOD).toBe(d);
      }
    });
    test('should work with BigInt type', () => {
      for (const [a, b] of bigPairs) {
        const c = mo.div(a, b);
        const d = mo.div(a, c);
        expect((b * c) % BIG_MOD).toBe(a % BIG_MOD);
        expect(b % BIG_MOD).toBe(d);
      }
    });
  });

  describe('pow', () => {
    const mo = new ModOper(MOD);
    test('should return one when the exponent is zero', () => {
      expect(mo.pow(3, 0)).toBe(1);
      expect(mo.pow(3n, 0n)).toBe(1n);
    });
    test('should return valid result in simple cases', () => {
      expect((new ModOper(13)).pow(2, 5)).toBe(6);
      expect((new ModOper(11)).pow(3, 7)).toBe(9);
      expect((new ModOper(7)).pow(5, 3)).toBe(6);
      expect((new ModOper(5)).pow(4, 9)).toBe(4);
    });
    test('should return valid result in simple cases in BigInt', () => {
      expect((new ModOper(13)).pow(2n, 5n)).toBe(6n);
      expect((new ModOper(11)).pow(3n, 7n)).toBe(9n);
      expect((new ModOper(7)).pow(5n, 3n)).toBe(6n);
      expect((new ModOper(5)).pow(4n, 9n)).toBe(4n);
    });
  });

  describe('fac', () => {
    const mo = new ModOper(MOD);
    const n = 1_000;
    const res = [1];
    for (let i = 1n, r = 1n; i < n; i++) {
      r = (r * i) % BIG_MOD;
      res[i] = Number(r);
    }
    test('should return the value of factorial', () => {
      for (let i = 0; i < n; i++) {
        expect(mo.fac(i)).toBe(res[i]);
      }
    })
  });
});
