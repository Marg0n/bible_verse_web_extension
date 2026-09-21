//* English to Bangla
export const toBanglaDigits = (num: number) =>
  String(num).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
