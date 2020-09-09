const mergeSort = require('./mergeSort');
class DataSet {
    constructor(array) {
        this.dataset = array;
    }
    sort() {
        console.log('Sorted Data Set:',mergeSort(this.dataset));
        return mergeSort(this.dataset);
    }

    getMean() {
        const added = add(this.dataset);
        console.log('Mean:', (added / this.dataset.length));
        return added / this.dataset.length;
    }

    getMedian() {
        if (this.dataset.length % 2 === 0) {
            const sortedData = mergeSort(this.dataset);
            const medMean = [];
            const data1 = Math.floor((sortedData.length - 1) / 2);
            const data2 = Math.floor(sortedData.length / 2);
            medMean.push(sortedData[data1], sortedData[data2]);
            const added = add(medMean);
            const median = added / medMean.length;
            console.log('median:',median)
        } else {
            const sortedData = mergeSort(this.dataset);
            const median = (sortedData.length - 1) / 2;
            console.log('Median:', sortedData[median]);
            return sortedData[median];
        }
    }
}

const add = population => {
    return population.reduce((acc, cur) => {
        return acc + cur;
    });
}






