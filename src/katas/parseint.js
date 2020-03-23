/*
"parseInt() reloaded" Kata from https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5

In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

Examples:

    "one" => 1
    "twenty" => 20
    "two hundred forty-six" => 246
    "seven hundred eighty-three thousand nine hundred and nineteen" => 783919

Additional Notes:

    The minimum number is "zero" (inclusively)
    The maximum number, which must be supported is 1 million (inclusively)
    The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
    All tested numbers are valid, you don't need to validate them
*/

// Strategy: Start at biggest multiplier (million, thousand, hundred)
//   and recursively "multiply" left results, and "add" right results.
class ParseInt {
  parseInt(string) {
    return this.recursiveParse(this.wordsToNumbers(string));
  }

  recursiveParse(nums) {
    if (nums.length === 0) throw new Error('nums array must not be empty');
    if (nums.length === 1) return nums[0];

    const highestNumber = nums.reduce((acc, current) => {
      if (current > acc) {
        return current;
      }
      return acc;
    });
    const highestIndex = nums.indexOf(highestNumber);

    const leftSlice = nums.slice(0, highestIndex);
    const rightSlice = nums.slice(highestIndex + 1);

    // handle special case there there may not be a right slice, e.g. "one hundred"
    // so avoid passing an empty array for right side.
    if (rightSlice.length) {
      return this.recursiveParse(leftSlice) *
      nums[highestIndex] +
      this.recursiveParse(rightSlice);
    }

    return this.recursiveParse(leftSlice) * nums[highestIndex];
  }

  // Convert "words" to "numbers".
  wordsToNumbers(string) {
    const values = {
      'zero': 0,
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
      'thirteen': 13,
      'fourteen': 14,
      'fifteen': 15,
      'sixteen': 16,
      'seventeen': 17,
      'eighteen': 18,
      'nineteen': 19,
      'twenty': 20,
      'thirty': 30,
      'forty': 40,
      'fifty': 50,
      'sixty': 60,
      'seventy': 70,
      'eighty': 80,
      'ninety': 90,
      'hundred': 100,
      'thousand': 1000,
      'million': 1000000
    };

    // strip out invalid tokens, i.e. 'and'
    const validTokensOnly = string.split(' ').filter((token) => {
      return token !== 'and';
    });

    // convert array of word strings to actual numbers
    return validTokensOnly.map((token) => {
      if (token === 'zero') return 0;
      if (values[token]) return Number(values[token]);
      if (token.indexOf('-') > -1) {
        const [left, right] = token.split('-');
        return Number(values[left]) + Number(values[right]);
      }
    });
  }
}

export default ParseInt;
