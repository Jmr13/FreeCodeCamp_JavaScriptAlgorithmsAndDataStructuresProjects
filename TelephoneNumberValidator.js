function telephoneCheck(str) {
  /* Get the country code. It is optional since it is only applicable for numbers > 10 */
  let countryCode = str.split(/[-() ]/)[0];
  /* Count all existing numbers */
  let existingNumber = str.split('').filter(item => item.match(/[0-9]/)).length;
  /* Count length by splitting with /[-() ]/ regexp. It should't be longer than 4. */
  let length = str.split(/[-() ]/).filter(item => item.match(/[0-9]/)).length;
  /* Detect of there are special characters inside braces. If there is, then add false to the array */
  let charInsideBraces = str.split(/[\(]|[\)]/).map(item => { if((/[0-9]|['']/).test(item)){ return true }});
  /* Detect if the ( or ) brace is existing */
  let existingPairBraces = (/\(/).test(str) || (/\)/).test(str);
  let splitString = str.split('');

  if(existingNumber < 10 || existingNumber > 11) {
    return false
  }
  if(existingNumber > 10) {
    if(countryCode != 1) {
      return false;
    }
  }
  if(length > 4) {
    return false
  }
  if(charInsideBraces.includes(false)) {
    return false;
  }
  if(existingPairBraces == true) {
    /* If there are any special characters beside /[^()-\s\d]/ regexp, return false*/
    if((/[^()-\s\d]/).test(str) == true) {
      return false
    }
    /* if number starts with ( and ), then return false. It is not a valid format */
    if(splitString[0] == '(' && splitString[splitString.length - 1] == ')') {
      return false
    }
    /* Return value if ( ) braces are existing */
    return (/\(/).test(str) && (/\)/).test(str);
  }
  return true;
}

/*
Tests
telephoneCheck("555-555-5555") should return a boolean.
telephoneCheck("1 555-555-5555") should return true.
telephoneCheck("1 (555) 555-5555") should return true.
telephoneCheck("5555555555") should return true.
telephoneCheck("555-555-5555") should return true.
telephoneCheck("(555)555-5555") should return true.
telephoneCheck("1(555)555-5555") should return true.
telephoneCheck("555-5555") should return false.
telephoneCheck("5555555") should return false.
telephoneCheck("1 555)555-5555") should return false.
telephoneCheck("1 555 555 5555") should return true.
telephoneCheck("1 456 789 4444") should return true.
telephoneCheck("123**&!!asdf#") should return false.
telephoneCheck("55555555") should return false.
telephoneCheck("(6054756961)") should return false.
telephoneCheck("2 (757) 622-7382") should return false.
telephoneCheck("0 (757) 622-7382") should return false.
telephoneCheck("-1 (757) 622-7382") should return false.
telephoneCheck("2 757 622-7382") should return false.
telephoneCheck("10 (757) 622-7382") should return false.
telephoneCheck("27576227382") should return false.
telephoneCheck("(275)76227382") should return false.
telephoneCheck("2(757)6227382") should return false.
telephoneCheck("2(757)622-7382") should return false.
telephoneCheck("555)-555-5555") should return false.
telephoneCheck("(555-555-5555") should return false.
telephoneCheck("(555)5(55?)-5555") should return false.
telephoneCheck("55 55-55-555-5") should return false.
telephoneCheck("11 555-555-5555") should return false.
*/