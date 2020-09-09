const prompt = require('prompt-sync')();
const mergeSort = require('./mergeSort');

class DataSet {
    constructor(array) {
        this.dataset = array;
    }

    original() {
        console.log('Original Data Set:', this.dataset);
    }

    sort() {
        console.log('Sorted Data Set:',mergeSort(this.dataset));
        return mergeSort(this.dataset);
    }

    getMean() {
        console.log('Mean:', mean(this.dataset));
        return mean(this.dataset);
    }

    getMedian() {
        if (this.dataset.length % 2 === 0) {
            const sortedData = mergeSort(this.dataset);
            const medMean = [];
            const data1 = Math.floor((sortedData.length - 1) / 2);
            const data2 = Math.floor(sortedData.length / 2);
            medMean.push(sortedData[data1], sortedData[data2]);
            const median = mean(medMean);
            console.log('median:',median)
        } else {
            const sortedData = mergeSort(this.dataset);
            const median = (sortedData.length - 1) / 2;
            console.log('Median:', sortedData[median]);
            return sortedData[median];
        }
    }
    getStdDev() {
        // prompt is not needed if parameters are set up
        let smplPop = prompt('Is the data set a population, or a sample of one? (s | sample OR p | population):');
        let stdVar = prompt('Would you like the Standard Deviation or the variance? (type sd | standard deviation OR v | variance):');
        const lowerSmplPop = smplPop.toLowerCase();
        const lowerStdVar = stdVar.toLowerCase();
        const sqdDevAboutMeanAdded = add(devAboutMean(this.dataset).map(individual => {
            return individual * individual;
        }));
        if (lowerSmplPop === 'p') { 
            if (lowerStdVar === 'sd') {
                const stdDev = sqdDevAboutMeanAdded => {
                    const result = sqdDevAboutMeanAdded / this.dataset.length;
                    return Math.sqrt(result);
                }
                console.log('Population Standard Deviation:', stdDev(sqdDevAboutMeanAdded));
            } else if (lowerStdVar === 'v') {
                const variance = sqdDevAboutMeanAdded => {
                    const result = sqdDevAboutMeanAdded / this.dataset.length;
                    return result;
                }
                console.log('Population Variance:', variance(sqdDevAboutMeanAdded));
            } else {
                console.log('Please choose either sd for standard deviation or v for variance.');
                this.getStdDev();
            }
        } else if (lowerSmplPop === 's') {
            if (lowerStdVar === 'sd') {
                const stdDev = sqdDevAboutMeanAdded => {
                    const result = sqdDevAboutMeanAdded / (this.dataset.length - 1);
                    return Math.sqrt(result);
                }
                console.log('Sample Standard Deviation:', stdDev(sqdDevAboutMeanAdded));
            } else if (lowerStdVar === 'v') {
                const variance = sqdDevAboutMeanAdded => {
                    const result = sqdDevAboutMeanAdded / (this.dataset.length - 1);
                    return result;
                }
                console.log('Sample Variance:', variance(sqdDevAboutMeanAdded));
            } else {
                console.log('Please choose either sd for standard deviation or v for variance.');
                this.getStdDev();
            }  
        } else {
            console.log('Please state whether the data set is a population or a sample of one.');
            this.getStdDev();
        }
    }
}
// HELPER FUNCTIONS
// helper function to add together all elements within a list
const add = population => {
    return population.reduce((acc, cur) => {
        return acc + cur;
    });
}

// helper function that finds the mean of a list
const mean = population => {
    const added = add(population);
    return added / population.length;
}

// helper function that returns
const devAboutMean = population => {
    const Mean = mean(population);
    const deviations = population.map(individual => {
        return individual - Mean;
    });
    return deviations;
}

const data = [];
const randomize = () => Math.floor(Math.random() * 10);
for (let i=0; i<15; i++) {
    data.push(randomize());
}
const dataSet = new DataSet(data);
dataSet.original();
dataSet.sort();
dataSet.getMean();
dataSet.getMedian();
dataSet.getStdDev();
dataSet.getStdDev();
dataSet.getStdDev();
dataSet.getStdDev();







