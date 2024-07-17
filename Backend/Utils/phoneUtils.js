import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Parses a phone number string and returns the E.164 compliant format.
 * @param {string} phoneNumber - The phone number to parse.
 * @param {string} defaultCountry - The default country code to assume if not included in the phone number.
 * @returns {string|null} - The E.164 compliant phone number or null if invalid.
 */
export function toE164(phoneNumber, defaultCountry = 'IL') {
  try {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber, defaultCountry);
    if (parsedNumber && parsedNumber.isValid()) {
      return parsedNumber.format('E.164');
    } else {
      console.error('Invalid phone number:', phoneNumber);
      return null;
    }
  } catch (error) {
    console.error('Error parsing phone number:', error);
    return null;
  }
}
