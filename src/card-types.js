export const cardTypes = {
  visa: {
    pattern: /^4/,
    length: [13, 16],
    image: 'visa.png'
  },
  mastercard: {
    pattern: /^5[1-5]|^2[2-7]/,
    length: [16],
    image: 'mastercard.png'
  },
  mir: {
    pattern: /^220[0-4]/,
    length: [16],
    image: 'mir.png'
  },
  amex: {
    pattern: /^3[47]/,
    length: [15],
    image: 'amex.png'
  }
};

export function detectCardType(cardNumber) {
  const num = cardNumber.replace(/\D/g, '');
  
  for (const [type, {pattern, length}] of Object.entries(cardTypes)) {
    if (pattern.test(num) && length.includes(num.length)) {
      return type;
    }
  }
  
  return null;
}