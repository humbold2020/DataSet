const mergeSort = require('./mergeSort');
class DataSet {
    constructor(array) {
        this.dataset = array;
        this.size = 0;
    }
    sort() {
        console.log('Sorted Data Set:',mergeSort(this.dataset));
        return mergeSort(this.dataset);
    }

    getMean() {
        const add = population => {
            return population.reduce((acc, cur) => {
                return acc + cur;
            });
        }
        const added = add(population);
        console.log('Mean:', (added / population.length));
        return added / population.length;
    }
}




