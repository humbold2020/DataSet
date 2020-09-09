const mergeSort = require('./mergeSort');
class DataSet {
    constructor(array) {
        this.dataset = array;
        this.size = 0;
    }
    sort() {
        console.log(mergeSort(this.dataset));
        return mergeSort(this.dataset);
    }
}




