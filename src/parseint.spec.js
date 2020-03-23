import ParseInt from './parseint';

describe('ParseInt', () => {
  test('when there is only one number', () => {
    const p = new ParseInt();
    expect(p.parseInt('twenty')).toEqual(20);
  });
  test('when there is one multiplier (100)', () => {
    const p = new ParseInt();
    expect(p.parseInt('two hundred forty-six')).toEqual(246);
  });
  test('when there are two multipliers', () => {
    const p = new ParseInt();
    expect(p.parseInt('seven hundred eighty-three thousand nine hundred and nineteen')).toEqual(783919);
  });
});