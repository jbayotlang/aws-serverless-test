// Note(jhudiel) - Very basic coverage of zip, doesn't really capture a lot of zip
// code formats
export const isValidZip = (zip: string): boolean => {
  return /^\d{3,6}(-\d{3,4})?$/.test(zip);
};

export const isValidCountryCode = (countryCode: string): boolean => {
  return /^[A-Za-z]{2}$/.test(countryCode);
};

