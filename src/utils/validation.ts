/** Returns true for Indian mobile numbers (with or without +91 / 91 prefix). */
export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-+()]/g, '');
  return /^(?:91)?[6-9]\d{9}$/.test(cleaned);
};

/** Strips HTML tags to prevent XSS when displaying user-provided text. */
export const sanitizeText = (input: string): string =>
  input.replace(/<[^>]*>/g, '').trim();

/** Returns true if age string is a number between 0 and 120. */
export const isValidAge = (age: string): boolean => {
  const n = Number(age);
  return Number.isInteger(n) && n >= 0 && n <= 120;
};
