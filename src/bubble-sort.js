import { arraySwap } from './utils';

class BubbleSort {
  constructor() {
    this.data = [];
  }

  insert(item) {
    this.data.push(item);
  }

  sort() {
    const length = this.data.length;
    for (let i=0; i < length; i++) {
      for (let j=0; j < length - 1 - i; j++) {
        if (this.data[j] > this.data[j + 1] ) {
          arraySwap(this.data, j, j+1);
        }
      }
    }
  }

  toString() {
    return this.data.join();
  }
}

export default BubbleSort;
