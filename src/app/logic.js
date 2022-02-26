/**
 * ----------------------------------------------------------
 * Amortized Interest + Total Amount 
 * ----------------------------------------------------------
 * 
 * Calculates the total amount paid over a loan
 * term given the amount, interest rate, and number of years.
 *
 * Amount   - Total amount of the loan as a whole number (dollars)
 * Interest - Interest rate expressed as a percentage.
 *            I.e. 5.5% interest rate should be expressed as the
 *            decimal number 5.5
 * Term     - The number of years it will take for the loan to be
 *            paid off. In this example, you should only use 15 or 30.
 */
 export function calculate(amount, interest, term) {
    if (!amount || !interest || !term) return { balance: 0, pmt: 0 };
  
    // Total loan cost in a fixed mortage is:
    // r * p * n / (1 - (1 + r)^-n)
  
    // where r = interest rate / 12
    // n = number of payments or term * 12
    // p = principal
  
    const r = (interest * 0.01) / 12;
    const n = term * 12;
    const p = amount;
  
    const balance = ((r * p * n) / (1 - Math.pow(1 + r, -n))).toFixed(2);
    const pmt = (balance / n).toFixed(2);
  
    // Uncomment for debug output
    // console.log({ amount, interest, term });
    // console.log({ balance, pmt });
  
    return {
      balance,
      pmt
    };
  }


  export class logicComponent implements OnInit {

    isNumeric(val: any): boolean {
      return isNumeric(val);
    }
  }