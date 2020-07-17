export function getDirection(current, next) {
  if (current.y > next.y) {
    return "top";
  } else if (current.x < next.x) {
    return "right";
  } else if (current.y < next.y) {
    return "bottom";
  } else if (current.x > next.x) {
    return "left";
  }
}

export function generateId(num) {
  var charSet = [],
    id = "";

  for (var i = 33; i <= 126; i++) {
    const char = String.fromCharCode(i);
    charSet.push(char);
  }

  for (var i = 0; i < num; i++) {
    var randIndex = Math.floor(Math.random() * charSet.length);
    id += charSet[randIndex];
    charSet.splice(randIndex, 1);
  }

  return id;
}

export function Subset() {
  this.subset = [];

  this.insert = (element) => {
    this.subset.push(element);
  };

  this.insertMany = (elementsArray) => {
    for (var i = 0; i < elementsArray.length; i++) {
      this.subset.push(elementsArray[i]);
    }
  };

  this.getElements = () => {
    return this.subset;
  };

  this.modifyElementsId = (newId) => {
    for (var i = 0; i < this.subset.length; i++) {
      this.subset[i].subsetId = newId;
    }
  };
}

export function heuristic(a, b) {
  /* Manhatten Distance */
  const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return dist;
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Element(element, priority) {
  this.element = element;
  this.priority = priority;
}

export function Heap() {
  this.list = [];

  this.insert = (element, priority) => {
    var heapElement = new Element(element, priority);
    for (var i = this.list.length; i > 0; i--) {
      this.list[i] = this.list[i - 1];
    }
    this.list[0] = heapElement;
    heapify(0);
  };

  this.delete = () => {
    if (this.list.length == 0) {
      return undefined;
    }
    var elem = this.list[0];
    this.list.splice(0, 1);
    heapify(0);
    return elem.element;
  };

  this.update = (element, newPriority) => {
    var i = 0;
    for (; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        break;
      }
    }
    this.list.splice(i, 1);
    this.insert(element, newPriority);
  };

  this.show = () => {
    var elems = [];
    for (var i = 0; i < this.list.length; i++) {
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
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        return true;
      }
    }
    return false;
  };

  var that = this;

  function heapify(index) {
    var i = index;
    const end = that.list.length - 1;

    while (true) {
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      var child;

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
    var temp = that.list[i];
    that.list[i] = that.list[j];
    that.list[j] = temp;
  }
}

export function PriorityQueue() {
  this.list = [];

  this.insert = (element, priority1, priority2 = Infinity) => {
    var queueElement = new Element(element, [priority1, priority2]);
    var i;
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
    var elem = this.list[0];
    this.list.splice(0, 1);
    return elem.element;
  };

  this.update = (element, newPriority1, newPriority2 = Infinity) => {
    var i = 0;
    for (; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        break;
      }
    }
    this.list.splice(i, 1);
    this.insert(element, newPriority1, newPriority2);
  };

  this.show = () => {
    var elems = [];
    for (var i = 0; i < this.list.length; i++) {
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
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].element == element) {
        return true;
      }
    }
    return false;
  };
}
