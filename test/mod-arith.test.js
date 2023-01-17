'use strict';

const ModOper = require('../mod-arith');
const MOD = 1e9 + 7;
const BIG_MOD = BigInt(MOD);
const RANGE_MIN = 1;
const RANGE_MAX = Number.MAX_SAFE_INTEGER;
const NUM_TESTS = 1000;

describe('ModOper', () => {
  const pairs = [];
  const bigPairs =[];
  const numbers = [];
  beforeAll(() => {
    for (let i = 0; i < NUM_TESTS; i++) {
      const a = Math.floor(Math.random() * (RANGE_MAX - RANGE_MIN)) + RANGE_MIN;
      const b = Math.floor(Math.random() * (RANGE_MAX - RANGE_MIN)) + RANGE_MIN;
      pairs[i] = [a, b];
      bigPairs[i] = [BigInt(a), BigInt(b)];
    }
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
    test('should generate inverse of input', () => {
      for (const a of numbers) {
        const b = mo.inv(a);
        expect((BigInt(a) * BigInt(b)) % BigInt(MOD)).toBe(1n);
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
    test('should return division value of modular', () => {
      for (const [a, b] of pairs) {
        const c = mo.div(a, b);
        const d = mo.div(a, c);
        expect((BigInt(b) * BigInt(c)) % BigInt(MOD)).toBe(BigInt(a % MOD));
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

  describe('fact', () => {
  });
});
