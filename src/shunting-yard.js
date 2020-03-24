/*
Parses string left-to-right (infix notation) to create Reverse Polish notation
using Shunting Yard algorithm.

References:
 https://brilliant.org/wiki/shunting-yard-algorithm/
 https://en.wikipedia.org/wiki/Shunting-yard_algorithm

Currently supports number values and these operators: *, /, +, -, (, )
NOTE that all tokens need to be white-space delimited atm. e.g. `( 1 + 2 )` works, `(1+2)` does not.

How to use this class? See `shunting-yard.spec.js`
*/

class ShuntingYard {
  constructor() {
    this.operatorPrecedence = {
      '*': 2,
      '/': 2,
      '+': 1,
      '-': 1
    };
    this.outputQueue = [];
    this.operatorStack = [];
  }

  toReversePolishNotation(string) {
    this.outputQueue = [];
    this.operatorStack = [];

    const s = this.cleanFormat(string).split(' ');
    for (let i = 0; i < s.length; i++) {
      const token = s[i];
      if (this.isOperator(token) || token === '(' || token === ')') {
        this.add(token);
      } else {
        this.add(Number(token));  // convert value from string to number
      }
    }
    this.add(null);
    return this.output();
  }

  // converts badly formatted expressions into a nice expression with proper whitespace.
  // supports negation of parens expressions eg "-()" by converting to "0 - ()"
  cleanFormat(string) {
    // add space around operators, except for minus before numbers and left parenthesis
    const nice = string.split('').reduce((acc, c, index, array) => {
      const nextChar = (index - 1 < array.length) ? array[index + 1] : null;
      const prevChar = (index - 1 >= 0) ? array[index - 1] : null;

      if (c === '(') {
        if (prevChar === '-') {
          return `${acc}${c} `;  // unary minus
        }
        return `${acc} ${c} `;
      }

      if (c === '-') {
        // is unary minus?
        if ((nextChar === '(' || nextChar === Number(nextChar).toString())
            && (prevChar === null || prevChar === ' ' || prevChar === '(')) {
          if (nextChar === '(') {
            return `${acc}0 ${c} `;
          }
          return `${acc}${c}`;
        }
        // otherwise '-' is a minus and not a unary operator
        return `${acc} ${c} `;
      }

      if (['+', '*', '/', '(', ')'].indexOf(c) > -1) {
        return `${acc} ${c} `;
      }

      return `${acc}${c}`;
    }, '');

    // split by space and get rid of all the extra spaces
    const noExtraSpaces = nice.split(' ').filter((item) => {
      if (item !== '') return item;
    });
    return noExtraSpaces.join(' ');
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

  pushOperatorsToOutputUntilWeFindLeftParenthesis() {
    let operator;
    do {
      operator = this.operatorStack.pop();
      if (!operator || operator === '(') {
        operator == null;
      } else {
        this.outputQueue.push(operator);
      }
    } while (operator);
  }

  add(token) {
    if (token === null) {
      // Indicate there are no more tokens. If there are still operators in stack
      //   add those operators to output.
      this.pushRemainingOperatorsToOutput();
      return;
    }

    if (token === '(') {
      this.operatorStack.push(token);
      return;
    }

    if (token === ')') {
      this.pushOperatorsToOutputUntilWeFindLeftParenthesis();
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
