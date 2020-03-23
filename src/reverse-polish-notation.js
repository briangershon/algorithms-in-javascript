// Supports *, /, + and - operators.
class ReversePolish {
  calculate(tokens) {
    const operators = ['+', '*', '-', '/'];
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
    }
    const result = stack.pop();
    return Number(result);
  }
}

export default ReversePolish;
