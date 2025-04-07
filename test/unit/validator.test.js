import { luhnCheck } from '../../src/validator';
import { detectCardType } from '../../src/card-types';

describe('Luhn Algorithm', () => {
  test('valid Visa card', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });

  test('invalid card number', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
  });
});

describe('Card Type Detection', () => {
  test('detects Visa', () => {
    expect(detectCardType('4111111111111111')).toBe('visa');
  });

  test('detects Mastercard', () => {
    expect(detectCardType('5555555555554444')).toBe('mastercard');
  });

  test('detects Mir', () => {
    expect(detectCardType('2200123456789010')).toBe('mir');
  });
});