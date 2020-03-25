// Supports *, /, + and - operators. 'm' is unary minus.
class ReversePolish {
  calculate(tokens) {
    const operators = ['+', '*', '-', '/', 'm'];
    const stack = [];

    for (let i = 0; i < tokens.length; i++) {
      if (operators.indexOf(tokens[i]) === -1) {
        stack.push(tokens[i]);
        continue;
      }
      if (tokens[i] === '+') {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left + right);
        continue;
      }
      if (tokens[i] === '-') {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left - right);
        continue;
      }
      if (tokens[i] === '*') {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left * right);
        continue;
      }
      if (tokens[i] === '/') {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left / right);
        continue;
      }
      if (tokens[i] === 'm') {
        const right = stack.pop();
        stack.push(-right);
        continue;
      }
    }
    const result = stack.pop();
    return Number(result);
  }
}

export default ReversePolish;
