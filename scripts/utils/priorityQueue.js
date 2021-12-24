import { Element } from "./element.js";

export function PriorityQueue() {
  this.list = [];

  this.insert = (element, priority1, priority2 = Infinity) => {
    let queueElement = new Element(element, [priority1, priority2]);
    let i;
    for (i = this.list.length; i > 0; i--) {
      if (queueElement.priority[0] > this.list[i - 1].priority[0]) {
        break;
      } else if (queueElement.priority[0] == this.list[i - 1].priority[0]) {
        if (queueElement.priority[1] >= this.list[i - 1].priority[1]) {
          break;
        }
      }
      this.list[i] = this.list[i - 1];
    }
    this.list[i] = queueElement;
  };

  this.delete = () => {
    if (this.list.length == 0) {
      return undefined;
    }
    let elem = this.list[0];
    this.list.splice(0, 1);
    return elem.element;
  };

  this.update = (element, newPriority1, newPriority2 = Infinity) => {
    let i = 0;
    for (; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        break;
      }
    }
    this.list.splice(i, 1);
    this.insert(element, newPriority1, newPriority2);
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
}
