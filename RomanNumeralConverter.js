function convertToRoman(num) {
  let convertedNumber = [];
  / Create a roman numeral object /
  const romanNumeral = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I'
  };
  
  let romanNumeralKeys = Object.keys(romanNumeral).reverse();
  romanNumeralKeys.forEach(key => {
    /* 
      Denomination logic 
      Ex. 16 
        if 10 <= 16, push 'X' , then num -= 10
        if 5 <= 6, push 'V' , then num -= 5,
        if 1 <= 1, push 'I' , then num -= 1,
        Then join all string
    */
    while(key <= num) {
      convertedNumber.push(key)
      num = num - key;
    }
  })
  convertedNumber = convertedNumber.map(item => romanNumeral[item]).join('');

  return convertedNumber;
}

/*
  convertToRoman(2) should return the string II.
  convertToRoman(3) should return the string III.
  convertToRoman(4) should return the string IV.
  convertToRoman(5) should return the string V.
  convertToRoman(9) should return the string IX.
  convertToRoman(12) should return the string XII.
  convertToRoman(16) should return the string XVI.
  convertToRoman(29) should return the string XXIX.
  convertToRoman(44) should return the string XLIV.
  convertToRoman(45) should return the string XLV.
  convertToRoman(68) should return the string LXVIII
  convertToRoman(83) should return the string LXXXIII
  convertToRoman(97) should return the string XCVII
  convertToRoman(99) should return the string XCIX
  convertToRoman(400) should return the string CD
  convertToRoman(500) should return the string D
  convertToRoman(501) should return the string DI
  convertToRoman(649) should return the string DCXLIX
  convertToRoman(798) should return the string DCCXCVIII
  convertToRoman(891) should return the string DCCCXCI
  convertToRoman(1000) should return the string M
  convertToRoman(1004) should return the string MIV
  convertToRoman(1006) should return the string MVI
  convertToRoman(1023) should return the string MXXIII
  convertToRoman(2014) should return the string MMXIV
  convertToRoman(3999) should return the string MMMCMXCI
*/