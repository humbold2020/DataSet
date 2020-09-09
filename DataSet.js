const mergeSort = require('./mergeSort');
class DataSet {
    constructor(array) {
        this.dataset = array;
        this.size = 0;
    }
    sort() {
        console.log(mergeSort(this.dataset));
    }
}
const data = [];
const randomize = () => Math.floor(Math.random() * 40);
for (let i = 0; i < 15; i++) {
    data.push(randomize());
}
const dataSet = new DataSet(data);
dataSet.sort();


