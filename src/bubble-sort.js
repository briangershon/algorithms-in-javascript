
class BubbleSort {
  constructor() {
    this.data = [];
  }

  insert(item) {
    this.data.push(item);
  }

  toString() {
    return this.data.join();
  }
}

export default BubbleSort;
