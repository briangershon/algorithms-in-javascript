/*
Parses string left-to-right (infix notation) to create Reverse Polish notation
using Shunting Yard algorithm.

References:
 https://brilliant.org/wiki/shunting-yard-algorithm/
 https://en.wikipedia.org/wiki/Shunting-yard_algorithm

Currently supports *, + operators and and number values.
*/

class ShuntingYard {
  constructor() {
    this.operatorPrecedence = {
      '*': 2,
      '+': 1
    };
    this.outputQueue = [];
    this.operatorStack = [];
  }

  toReversePolishNotation(string) {
    const s = string.split(' ');
    for (let i = 0; i < s.length; i++) {
      const token = s[i];
      if (this.isOperator(token)) {
        this.add(s[i]);
      } else {
        this.add(Number(s[i]));  // convert value from string to number
      }
    }
    this.add(null);
    return this.output();
  }

  isOperator(token) {
    return (this.operatorPrecedence[token] !== undefined);
  }
  
  stackOperatorHaveHigherPrecedence(operatorToken) {
    const stack = this.operatorStack;
    if (stack.length === 0) {
      return false;
    }
    
    return (this.operatorPrecedence[stack[stack.length - 1]] >= this.operatorPrecedence[operatorToken]);
  }
  
  pushRemainingOperatorsToOutput() {
    while (this.operatorStack.length > 0) {
      const operator = this.operatorStack.pop();
      this.outputQueue.push(operator);
    }
  }

  add(token) {
    if (token === null) {
      // Indicate there are no more tokens. If there are still operators in stack
      //   add those operators to output.
      this.pushRemainingOperatorsToOutput();
      return;
    }

    if (this.isOperator(token)) {
      while (this.stackOperatorHaveHigherPrecedence(token)) {
        const operator = this.operatorStack.pop();
        this.outputQueue.push(operator);
      }
        
      this.operatorStack.push(token);
      return;
    }    

    // otherwise this token is a value, add directly to output
    this.outputQueue.push(token);
  }
  
  // output reverse polish notation
  output() {
    return this.outputQueue;
  }
}

export default ShuntingYard;
