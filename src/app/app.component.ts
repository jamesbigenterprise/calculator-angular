import { Component } from '@angular/core';


enum Operation{
  add,
  subtract,
  multiply,
  divide,
  none
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator-angular';
  inputA:number = 0;
  inputB:number = 0;
  operation:Operation = Operation.none;

  //loan calculator
  amount = 0;
  interest = 0;
  term = 0;

  //all the basic operations
  setOperation(op:string)
  {
    //save the input and clear
    this.inputA = Number((<HTMLInputElement>document.getElementById("inputNumber")).value);
    (<HTMLInputElement>document.getElementById("inputNumber")).value = "";

    switch (op) {   
    case "add":
      this.operation = Operation.add;
      break;
    case "subtract":
      this.operation = Operation.subtract;
      break;
    case "multiply":
      this.operation = Operation.multiply;
      break;
    case "divide":
      this.operation = Operation.divide;
      break;
    default:
      break;
  }
  console.log("Input A = ",  this.inputA, " Operation is = ", this.operation);
  }
  
  clear()
  {
    //clear the inputs and the operation
    this.inputA = 0;
    this.inputB = 0;
    this.operation = Operation.none;
    (<HTMLInputElement>document.getElementById("inputNumber")).value = "";
  }
  //+ - * /
  add()
  {
    return this.inputA + this.inputB;
  }

  subtract()
  {
    return this.inputA - this.inputB;
  }

  multiply()
  {
    return this.inputA * this.inputB;
  }

  divide()
  {
    return this.inputA / this.inputB;
  }

  equals()
  {
    this.inputB = Number((<HTMLInputElement>document.getElementById("inputNumber")).value);
    (<HTMLInputElement>document.getElementById("inputNumber")).value = "";
    console.log("called equals");
    let result = 0;
    switch (this.operation) {   
      case Operation.add:
        result = this.add(); 
        break;
      case Operation.subtract:
        result = this.subtract();
        break;
      case Operation.multiply:
        result =this.multiply();  
        break;
      case Operation.divide:
        result = this.divide();  
        break;
      default:
        this.clear();
        break;
    }
    console.log("Input A = ",  this.inputA,"Input B = ",  this.inputB, " Operation is = ", this.operation)
    console.log("after the switch this is the result = ", result);

    (<HTMLInputElement>document.getElementById("inputNumber")).value = result.toString();
  }



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
calculate() {
  if (!this.amount || !this.interest || !this.term) return { balance: 0, pmt: 0 };

  // Total loan cost in a fixed mortage is:
  // r * p * n / (1 - (1 + r)^-n)

  // where r = interest rate / 12
  // n = number of payments or term * 12
  // p = principal

  const r = (this.interest * 0.01) / 12;
  const n = this.term * 12;
  const p = this.amount;

  let balance = ((r * p * n) / (1 - Math.pow(1 + r, -n)));
  let pmt = (balance / n).toFixed(2);

  // Uncomment for debug output
  // console.log({ amount, interest, term });
  // console.log({ balance, pmt });

  return {
    balance,
    pmt
  };
}


calculateAndDisplay()
{

  // amount = 0;
  // interest = 0;
  // term = 0;

  //fill the 3 input fields
  this.amount = Number((<HTMLInputElement>document.getElementById("loanAmount")).value);
  this.interest = Number((<HTMLInputElement>document.getElementById("interest")).value);
  this.term = Number((<HTMLInputElement>document.getElementById("length")).value);
  //calculate
  

  //clear input fields
  (<HTMLInputElement>document.getElementById("loanAmount")).value='';
  (<HTMLInputElement>document.getElementById("interest")).value= '';
  (<HTMLInputElement>document.getElementById("length")).value ='';

  
  //display result
  let result = this.calculate();
  
  (<HTMLParagraphElement>document.getElementById("balance")).innerHTML = result.balance.toString();
  (<HTMLParagraphElement>document.getElementById("pmt")).innerHTML = result.pmt.toString();

  console.log(result);
}
}
