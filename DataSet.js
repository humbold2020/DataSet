//const prompt = require('prompt-sync')();
const mergeSort = require('./mergeSort');
const smplBellCurve = require('./diagrams');
let firstDevMinus;
let firstDevPlus;
let secondDevMinus;
let secondDevPlus;
let thirdDevMinus;
let thirdDevPlus;

class DataSet {
    constructor(array) {
        this.dataset = array;
    }

    original() {
        return this.dataset;
    }

    sort() {
        return mergeSort(this.dataset);
    }

    getMean() {
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
            return median;
        } else {
            const sortedData = mergeSort(this.dataset);
            const median = (sortedData.length - 1) / 2;
            console.log('Median:', sortedData[median]);
            return sortedData[median];
        }
    }
    getStdDev(smplPop, sdV) {
        // prompt is not needed if parameters are set up
        let result;
        const sqdDevAboutMeanAdded = add(devAboutMean(this.dataset).map(individual => {
            return individual * individual;
        }));
        if (smplPop === 'p' || smplPop === 'P') { 
            if (sdV === 'sd' || sdV === 'SD') {
                return stdDev(sqdDevAboutMeanAdded);
            } else if (sdV === 'v' || sdV === V) {
                return variance(sqdDevAboutMeanAdded);
            } else {
                return;
            }
        } else if (smplPop === 's' || smplPop === 'S' ) {
            if (sdV === 'sd' || sdV === 'SD') {
                const stdDev = sqdDevAboutMeanAdded => {
                    result = Math.sqrt(sqdDevAboutMeanAdded / (this.dataset.length - 1));
                    return result;
                }
                return stdDev(sqdDevAboutMeanAdded);
            } else if (sdV === 'v' || sdV === 'V') {
                const variance = sqdDevAboutMeanAdded => {
                    result = sqdDevAboutMeanAdded / (this.dataset.length - 1);
                    return result;
                }
                return variance(sqdDevAboutMeanAdded);
            } else {
                return;
            }  
        } else {
            console.log('Please state whether the data set is a population or a sample of one.');
            return;
        }
    }
    empericalRule(devInfo, printDiagram = false) {
        if (printDiagram === true) {
            return smplBellCurve(this.getMean(), this.getStdDev('s', 'sd'), true);
            
        }
        const Mean = this.getMean();
        const sd = parseFloat(this.getStdDev('s', 'sd').toFixed(2));
        let variables = smplBellCurve(Mean, sd);
        const assignVariables = varName => {
            switch (varName) {
                case 'fdm':
                    return variables[0];
                    break;
                case 'fdp':
                    return variables[1];
                    break;
                case 'sdm':
                    return variables[2];
                    break;
                case 'sdp':
                    return variables[3];
                    break;
                case 'tdm':
                    return variables[4];
                    break;
                case 'tdp':
                    return variables[5];
                    break;
            }
        }
        
        firstDevMinus = assignVariables('fdm');
        firstDevPlus = assignVariables('fdp');
        secondDevMinus = assignVariables('sdm');
        secondDevPlus = assignVariables('sdp');
        thirdDevMinus = assignVariables('tdm');
        thirdDevPlus = assignVariables('tdp');
        
        console.log("(if data's graph is not bell-shaped, emperical rule does not work)");
        if (devInfo === 1) {
            return `Approximately 68% of the data between ${firstDevMinus} and ${firstDevPlus} are within 1 standard deviation from the mean`;
        } else if (devInfo === 2) {
            return `Approximately 95% of the data between ${secondDevMinus} and ${secondDevPlus} are within 2 standard deviations from the mean`;
        } else if (devInfo === 3) {
            return `Approximately 99.7% of the data between ${thirdDevMinus} and ${thirdDevPlus} are withing 3 standard deviations from the mean`;
        } else {
            return 'Please enter the number of standard deviations you would like to return';
        }
        
    }
    getPercentage(startData = null, endData = null) {
        const sortedData = mergeSort(this.dataset);
        if (startData && endData) {
            if (startData < endData) {
                let trimmedData = sortedData.filter(individual => {
                    if (individual >= startData && individual <= endData) {
                        return individual;
                    }
                });
                const trimmedCount = trimmedData.length;
                const populationCount = sortedData.length;
                return (trimmedCount / populationCount) * 100; 
            } else {
                return '1 not less than 2';
            }
        } else if (!startData && endData) {
            let trimmedData = sortedData.filter(individual => {
                if (individual < endData) {
                    return individual;
                }
            });
            const trimmedCount = trimmedData.length;
            const populationCount = sortedData.length;
            return (trimmedCount / populationCount) * 100;
        } else if (!endData && startData) {
            let trimmedData = sortedData.filter(individual => {
                if (individual > startData) {
                    return individual;
                }
            });
            const trimmedCount = trimmedData.length;
            const populationCount = sortedData.length;
            return (trimmedCount / populationCount) * 100;
        } else {
            return 'need a value';
        }
            
    }

    getQuartiles() {
        let med = this.getMedian();
        return med;
    }
    dataBtwnDevs(deviations, mean = this.getMean(), sd = this.getStdDev('s', 'sd')) {
        const lowerDev = mean - (deviations * (sd));
        const upperDev = mean + (deviations * (sd));
        return `data between ${lowerDev} and ${upperDev} are within ${deviations} deviations of the mean`;
    }
    
    z_score(val1, mean = this.getMean(), sd = this.getStdDev('s', 'sd')) {
        const diff = val1 - mean;
        return diff / sd;
    }
    chebyIneq(deviations) {
        return (1 - (1 / (deviations * deviations))) * 100;
    }
    dispBellCurve() {
        console.log(smplBellCurve(Mean, sd, true))
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

const stdDev = sqdDevAboutMeanAdded => {
    result = Math.sqrt(sqdDevAboutMeanAdded / this.dataset.length);
    return result;
}

const variance = sqdDevAboutMeanAdded => {
    result = sqdDevAboutMeanAdded / this.dataset.length;
    return result;
}

const data = [];
let listNumbers = 100;
const randomize = () => Math.floor(Math.random() * 75);
for (let i=0; i<listNumbers; i++) {
    data.push(randomize());
}
//const population = new DataSet([87, 80, 82, 61, 64, 68, 89, 60, 86]);
//const sample1 = new DataSet([80, 86, 61]);
//const sample2 = new DataSet([64, 80, 89]);
const sample3 = new DataSet([0.99,
    0.86,
    0.81,
    0.82,
    0.81,
    0.87,
    0.99,
    0.87,
    0.93,
    0.94,
    0.81,
    0.86,
    0.78,
    0.88,
    0.97,
    0.85,
    0.71,
    0.81,
    0.75,
    0.82,
    0.92,
    0.76,
    0.75,
    0.92,
    0.81,
    0.95,
    0.86,
    0.88,
    0.84,
    0.76,
    0.99,
    0.82,
    0.78,
    0.77,
    0.82,
    0.78,
    0.84,
    0.85,
    0.89,
    0.77,
    0.73,
    0.94,
    0.74,
    0.72,
    0.81,
    0.82,
    0.89,
    0.93,
    0.93,
    0.81]);
const numbers = new DataSet(data);
console.log('Unsorted List', numbers.original());
console.log('sorted:', numbers.sort());
console.log(numbers.getQuartiles());
//console.log(Mean);
//console.log(sample3.empericalRule(1));





















