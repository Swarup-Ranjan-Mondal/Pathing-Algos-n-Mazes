export function Subset() {
  this.subset = [];

  this.insert = (element) => {
    this.subset.push(element);
  };

  this.insertMany = (elementsArray) => {
    for (let i = 0; i < elementsArray.length; i++) {
      this.subset.push(elementsArray[i]);
    }
  };

  this.getElements = () => {
    return this.subset;
  };

  this.modifyElementsId = (newId) => {
    for (let i = 0; i < this.subset.length; i++) {
      this.subset[i].subsetId = newId;
    }
  };
}
