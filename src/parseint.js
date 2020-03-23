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

// start at biggest multiplier and recurse on left and right sides from there
class ParseInt {
  constructor() {
    this.values = {
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
  }

  parseInt(string) {
    // recursively multiply and add, starting at highest multiplier (million, thousand, hundred)
    return this.recursiveParse(this.wordsToNumbers(string));
  }

  
  recursiveParse(nums) {
    if (nums.length === 1) return nums[0];

    const highestNumber = nums.reduce((acc, current) => {
      if (current > acc) {
        return current;
      }
      return acc;
    });
    const highestIndex = nums.indexOf(highestNumber);

    // recurse by multiplying results of left side, and adding results of right side
    return this.recursiveParse(nums.slice(0, highestIndex)) *
      nums[highestIndex] +
      this.recursiveParse(nums.slice(highestIndex + 1));
  }

  // Convert "words" to "numbers".
  // Also handle converting numbers with a dash e.g. `sixty-five`
  wordsToNumbers(string) {
    const values = this.values;

    // strip out 'and'
    const validTokensOnly = string.split(' ').filter((token) => {
      return token !== 'and';
    });

    // convert array of word strings to actual numbers
    return validTokensOnly.map((token) => {
      if (values[token]) return Number(values[token]);

      if (token.indexOf('-') > -1) {
        const [left, right] = token.split('-');
        return Number(values[left]) + Number(values[right]);
      }
    });
  }
}

export default ParseInt;
