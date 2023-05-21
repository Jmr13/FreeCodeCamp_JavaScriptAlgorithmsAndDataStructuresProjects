function checkCashRegister(price, cash, cid) {
  /* Separate the whole number and decimal since Javascript is weak in numbers */
  let changeInPositiveInteger = parseInt((cash - price).toString().split(".")[0]);
  let changeInDecimal = (cash - price).toString().split(".")[1];
  let positiveInteger = changeInPositiveInteger;
  let decimal = changeInDecimal;
  /*
    CASHVALUE is needed for creating value key in cashBalance array
    [ { name: 'TWENTY' , value: '100' , balance: 100 } , ... ]
  */
  const CASHVALUE = [100 , 20 , 10 , 5 , 1 , 0.25 , 0.1 , 0.05 , 0.01];
  
  let cashBalance = [ ];
  /* Array for storing all arrays of currencies  */
  let balanceInPositiveInteger = [ ];
  let balanceInDecimal = [ ];
  /* Store sum of all positive integer and decimal */
  let allBalanceInPositiveInteger = 0;
  let allBalanceInDecimal = 0;
  /* isExact for determining if the change is == money.balance(balance of every currency)  */
  let isExact = false
  
  /* 
    If decimal.length == 1, add 0 to the end 
    Ex. 5 will be 50. Originally 5 is .5
  */
  if(changeInDecimal.length == 1) {
    changeInDecimal = parseInt(changeInDecimal + '0');
  }
  else {
    changeInDecimal = parseInt(changeInDecimal);
  }
  decimal = changeInDecimal;
  
  /* Create the cashBalance array object */
  cid.forEach((money , index) => {
    cashBalance.push({ name: cid[cid.length-1 - index][0] , value: CASHVALUE[index] , balance: cid[cid.length-1 - index][1] });
  })
  
  /* Create the balanceInPositiveInteger and balanceInPositiveInteger array */
  cashBalance.forEach((money , index) => {
    /* limit will be the balance of current currency since it cannot denominated endlessly */
    let limit = 0;
    if(index <= 4) {
      if(money.balance == positiveInteger) {
        isExact = true;
      }
      while(money.value <= positiveInteger && limit < money.balance) {
        positiveInteger -= money.value;
        limit += money.value;
      }
      balanceInPositiveInteger.push([money.name , limit]);
    }
    else {
      if(money.balance == decimal) {
        isExact = true;
      }
      while(money.value * 100 <= decimal && limit < money.balance * 100) {
        decimal -= money.value * 100;
        limit += money.value * 100;
      }
      balanceInDecimal.push([money.name , limit/100]);
    }
  })
  /* Remove all array with 0 value */
  balanceInPositiveInteger = balanceInPositiveInteger.filter(item => {
    allBalanceInPositiveInteger += parseInt(item[1]);
    if(item[1] > 0) {
      return item;
    }
  })
  balanceInDecimal = balanceInDecimal.filter(item => {
    allBalanceInDecimal += parseInt(item[1] * 100);
    if(item[1] > 0) {
      return item;
    }
  })
  
  if(allBalanceInPositiveInteger == changeInPositiveInteger &&
     allBalanceInDecimal == changeInDecimal) {
    if(isExact == true) {
      return {status: "CLOSED", change: [...cid]}
    }
    return {status: "OPEN", change: [...balanceInPositiveInteger , ...balanceInDecimal]}
  }
  else if(allBalanceInPositiveInteger != changeInPositiveInteger ||
     allBalanceInDecimal != changeInDecimal) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 

/*
  Currency Unit	Amount
  Penny	$0.01 (PENNY)
  Nickel	$0.05 (NICKEL)
  Dime	$0.1 (DIME)
  Quarter	$0.25 (QUARTER)
  Dollar	$1 (ONE)
  Five Dollars	$5 (FIVE)
  Ten Dollars	$10 (TEN)
  Twenty Dollars	$20 (TWENTY)
  One-hundred Dollars	$100 (ONE HUNDRED)
  See below for an example of a cash-in-drawer array:
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
Tests
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
*/