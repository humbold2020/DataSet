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
        const sorted = this.sort();
        const medIndex = medianIndex(this);
        let med;
        if (sorted.length % 2 === 0) {
            med = (sorted[medIndex] + sorted[medIndex + 1]) / 2;
        } else {
            med = sorted[medIndex];
        }
        return med;
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

    getOutliers(ret, type) {
        let lowerOutliers;
        let upperOutliers;
        const Q1 = this.getQuartiles('Q1', true);
        const Q3 = this.getQuartiles('Q3', true);
        const IQR = this.getIQR();
        const LF = Q1 - (1.5 * IQR);
        const UF = Q3 + (1.5 * IQR);
        if (ret === 'lf') {
            return LF;
        } else if (ret === 'uf') {
            return UF;
        } else if (ret === 'info') {
            console.log(`Data that is less than the Lower Fence of ${LF} and greater than the Upper Fence of ${UF} are considered outliers`);
        } else if (ret === 'outliers') {
            if (type === 'lf') {
                lowerOutliers = this.sort().filter(individual => {
                    if (individual < LF) {
                        return individual;
                    }
                });
                return 'Outliers Below Lower Fence:', lowerOutliers;
            } else if (type === 'uf') {
                upperOutliers = this.sort().filter(individual => {
                    if (individual > UF) {
                        return individual;
                    }
                });
                return 'Outliers Above Upper Fence:', upperOutliers;
            } else {
                return 'Please specify which outlier you would like to return. (after first argument: outliers, specify: lf | for list of lower outliers OR uf | for list of upper outliers.';
            }  
        } else { 
            return 'Please specify whether to return the lower fence, upper fence, or a list of outliers. (give as argument: lf | lower fence  uf | upper fence  outlier | list of outliers)';
        }
    }

    quickStats() {
        return `N: ${this.dataset.length}  Mean: ${this.getMean()}  StDev: ${this.getStdDev('s', 'sd')}  Minimum: ${this.sort()[0]}  Q1: ${this.getQuartiles('Q1', true)}  Median: ${this.getMedian()}  Q3: ${this.getQuartiles('Q3', true)}  Maximum: ${this.sort()[this.sort().length - 1]}`;
    }

    getQuartiles(quartiles, vals = false) {  
        const sorted = this.sort();
        const length = sorted.length;
        let medIndex = medianIndex(this);
        let leftArray;
        let rightArray;
        let Q1;
        let Q2;
        let Q3;
        if (length % 2 === 0) {
            leftArray = sorted.slice(0, medIndex + 1);
            rightArray = sorted.slice(medIndex + 1, length);
            Q2 = (sorted[medIndex] + sorted[medIndex + 1]) / 2;
        } else {
            leftArray = sorted.slice(0, medIndex);
            rightArray = sorted.slice(medIndex + 1, sorted.length);
            Q2 = (sorted[medIndex]);  
        }
        if (leftArray.length % 2 === 0) {
            Q1 = (leftArray[medianIndex(leftArray)] + leftArray[medianIndex(leftArray) + 1]) / 2;
            Q3 = (rightArray[medianIndex(rightArray)] + rightArray[medianIndex(rightArray) + 1]) / 2;
        } else {
            Q1 = leftArray[medianIndex(leftArray)];
            Q3 = rightArray[medianIndex(rightArray)];
        }
        if (vals === false) {
            switch (quartiles) {
                case 'Q1':
                    return `25% of the data are less than or eqaul to the first quartile, ${Q1}, and 75% of the data is greater than ${Q1}.`;
                    break;
                case 'Q2':
                    return `50% of the data are less than or eqaul to the second quartile, ${Q2}, which is also the median of the dataset, and 50% of the data is greater than ${Q2}.`;
                    break;
                case 'Q3':
                    return `75% of the data are less than or eqaul to the third quartile, ${Q3}, and 25% of the data is greater than ${Q3}.`;
                    break;
                default:
                    return 'Please specify which quartile you would like to return';
            }
        } else {
            switch (quartiles) {
                case 'Q1':
                    return Q1;
                    break;
                case 'Q2':
                    return Q2;
                    break;
                case 'Q3':
                    return Q3;
                    break;
                default:
                    return 'Please specify which quartile you would like to return';
            }
        }
        
    }
    getIQR() {
        return this.getQuartiles('Q3', true) - this.getQuartiles('Q1', true);
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
const medianIndex = dataset => {
    let sorted;
    let medIndex;
    if (dataset instanceof DataSet) {
        sorted = this.sort();
    } else {
        sorted = mergeSort(dataset);
    }
    medIndex = Math.floor((sorted.length - 1) / 2);
    return medIndex;
} 

const data = [];
let listNumbers = 10;
const randomize = () => Math.floor(Math.random() * 100);
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
const numbers = new DataSet([2.12, 0.28, 1.48, 0.36, 0.23, 2.52, 1.7, 2.56, 0.23, 1.02, 0, 1.8, 3.23, 0.44, 2.36, 3.64, 0.79, 0.7, 1.07, 3.16, 0, 0.28, 0, 2.32, 2.93, 0, 2.04, 2.74]);
console.log(numbers.quickStats());
console.log(numbers.sort());
console.log(numbers.getQuartiles('Q3', true));
//console.log('Median Index', medianIndex(numbers));
//console.log('Median', numbers.getMedian());
//console.log(Mean);
//console.log(sample3.empericalRule(1));





















