function rot13(str) {
  /* Split the string by every character */
  str = str.split('').map(item => {
    /* If current character is letter, then modify its charcode */
    if(item.match(/[A-Z]/)) {
      let charCode = item.charCodeAt(0) + 13;
      /* If charcode is > 90, subtract 26 to charcode */
      if(charCode > 90) {
        return String.fromCharCode(charCode - 26);
      }
      else {
        return String.fromCharCode(charCode);
      }
    }
    else {
      return item
    }
  }).join('');

  return str;
}

/*
  Test Cases:
  
  rot13("SERR PBQR PNZC") should decode to the string FREE CODE CAMP
  rot13("SERR CVMMN!") should decode to the string FREE PIZZA!
  rot13("SERR YBIR?") should decode to the string FREE LOVE?
  rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to the string THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
*/