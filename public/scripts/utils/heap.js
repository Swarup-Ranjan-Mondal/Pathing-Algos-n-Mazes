import { Element } from "./element.js";

export function Heap() {
  this.list = [];

  this.insert = (element, priority) => {
    let heapElement = new Element(element, priority);
    for (let i = this.list.length; i > 0; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[0] = heapElement;
    heapify(0);
  };

  this.delete = () => {
    if (this.list.length == 0) {
      return undefined;
    }
    let elem = this.list[0];
    this.list.splice(0, 1);
    heapify(0);
    return elem.element;
  };

  this.update = (element, newPriority) => {
    let i = 0;
    for (; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        break;
      }
    }
    this.list.splice(i, 1);
    this.insert(element, newPriority);
  };

  this.show = () => {
    let elems = [];
    for (let i = 0; i < this.list.length; i++) {
      elems.push(this.list[i].element);
    }
    return elems;
  };

  this.isEmpty = () => {
    if (this.list.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  this.includes = (element) => {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        return true;
      }
    }
    return false;
  };

  let that = this;

  function heapify(index) {
    let i = index;
    const end = that.list.length - 1;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let child;

      if (left > end && right > end) {
        return;
      } else if (
        right > end ||
        that.list[left].priority < that.list[right].priority
      ) {
        child = left;
      } else {
        child = right;
      }

      if (that.list[i].priority > that.list[child].priority) {
        swap(i, child);
      }

      i = child;
    }
  }

  function swap(i, j) {
    let temp = that.list[i];
    that.list[i] = that.list[j];
    that.list[j] = temp;
  }
}
