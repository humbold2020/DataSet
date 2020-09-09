const prompt = require('prompt-sync')();

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
        let smplPop = prompt('Is the data set a population, or a sample of one? (s | sample OR p | population):');
        const lowerSmplPop = smplPop.toLowerCase();
        const sqdDevAboutMeanAdded = add(this.dataset.map(individual => {
            return individual * individual;
        }));
        if (lowerSmplPop === 'p') { 
          const stdDev = sqdDevAboutMeanAdded => {
              const result = sqdDevAboutMeanAdded / this.dataset.length;
              return Math.sqrt(result);
          }
          console.log('Population Standard Deviation:', stdDev(sqdDevAboutMeanAdded));  
        } else if (lowerSmplPop === 's') {
            const stdDev = sqdDevAboutMeanAdded => {
                const result = sqdDevAboutMeanAdded / (this.dataset.length - 1);
                return Math.sqrt(result);
            }
            console.log('Sample Standard Deviation:', stdDev(sqdDevAboutMeanAdded)); 
        } else {
            return 'Please state whether the data set is a population or a sample of one.';
        }
    }
}

const add = population => {
    return population.reduce((acc, cur) => {
        return acc + cur;
    });
}

const mean = population => {
    const added = add(population);
    return added / population.length;
}

const devAboutMean = population => {
    const deviations = [];
    const Mean = mean(population);
    population.forEach(individual => {
        deviations.push(individual - Mean);
    });
    return deviations;
}

const data = [];
const randomize = () => Math.floor(Math.random() * 100);
for (let i=0; i<15; i++) {
    data.push(randomize());
}
const dataSet = new DataSet(data);
dataSet.sort();
dataSet.getMean();
dataSet.getMedian();
dataSet.getStdDev();







