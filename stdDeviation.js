const filteredList = require('./mergeSort');
let population = [73, 103, 91, 93, 136, 108, 92, 104, 90, 78, 108, 93, 91, 78, 81, 130, 82, 86, 111, 93, 102, 111, 125, 107, 80, 90, 122, 101, 82, 115, 103, 110, 84, 115, 85, 83, 131, 90, 103, 106, 71, 69, 97, 130, 91, 62, 85, 94, 110, 85, 102, 109, 105, 97, 104, 94, 92, 83, 94, 114, 107, 94, 112, 113, 115, 106, 97, 106, 85, 99, 102, 109, 76, 94, 103, 112, 107, 101, 91, 107, 107, 110, 106, 103, 93, 110, 125, 101, 91, 119, 118, 85, 127, 141, 129, 60, 115, 80, 111, 79];
let sample;// =  filteredList;//[73, 103, 91, 93, 136, 108, 92, 104, 90, 78, 108, 93, 91, 78, 81, 130, 82, 86, 111, 93, 102, 111, 125, 107, 80, 90, 122, 101, 82, 115, 103, 110, 84, 115, 85, 83, 131, 90, 103, 106, 71, 69, 97, 130, 91, 62, 85, 94, 110, 85, 102, 109, 105, 97, 104, 94, 92, 83, 94, 114, 107, 94, 112, 113, 115, 106, 97, 106, 85, 99, 102, 109, 76, 94, 103, 112, 107, 101, 91, 107, 107, 110, 106, 103, 93, 110, 125, 101, 91, 119, 118, 85, 127, 141, 129, 60, 115, 80, 111, 79];

// function for adding data in dataSet
const add = population => {
    return population.reduce((acc, cur) => {
        return acc + cur;
    });
}
// function for retrieving the mean of dataSet
const mean = population => {
    const added = add(population);
    return added / population.length;
}
// function to return a list consisting of all the deviations about the mean within the population
const devAboutMean = population => {
    const deviations = [];
    const Mean = mean(population);
    population.forEach(individual => {
        deviations.push(individual - Mean);
    });
    return deviations;
}

// Code that populates a list with each individual in the population squared


if (!sample && !population) {
    console.log('Please input a population, or a sample of one. Or both.');
}

// Checks if population is truthy and runs code if so...
if (population) {
    // squaire each individual in the population and save it in a new list...
    // could perhaps make this .map() for better results. Research needed.
    const sqdDevAboutMean = [];
    devAboutMean(population).forEach(individual => {
        sqdDevAboutMean.push(individual * individual);
    })
    // Add together each squaired individual in the new list and save the result as a new variable...
    const sqdDevAboutMeanAdded = add(sqdDevAboutMean);

    // code that prints to the console the Population Standard Deviation...
    const popStdDev = sqdDevAboutMeanAdded => {
        // first it takes the result of adding together the list of deviations about the mean, and divides it by the number of observations
        const result = sqdDevAboutMeanAdded / population.length;
        // the functiion then returns the square root of the result of adding together the list of deviations about the mean, and dividing it by the number of observations
        return Math.sqrt(result);
    }
    console.log('Population Standard Deviation:', popStdDev(sqdDevAboutMeanAdded));
}

// Checks if sample is truthy and runs code if so...
if (sample) {
    // squaire each individual in the sample and save it in a new list...
    // could perhaps make this .map() for better results. Research needed.
    const sqdDevAboutMeanSmpl = [];
    devAboutMean(sample).forEach(individual => {
        sqdDevAboutMeanSmpl.push(individual * individual);
    })
    // Add together each squaired individual in the new list and save the result as a new variable...
    const sqdDevAboutMeanSmplAdded = add(sqdDevAboutMeanSmpl);
    // code that prints to the console the sample Standard Deviation...
    const smplStdDev = manipulatedPopulation => {
         // first it takes the result of adding together the list of deviations about the mean, and divides it by the number of observations
        const result = manipulatedPopulation / (sample.length - 1);
        // the functiion then returns the square root of the result of adding together the list of deviations about the mean, and dividing it by the number of observations
        return Math.sqrt(result);
    }
    console.log('Sample Standard Deviation:', smplStdDev(sqdDevAboutMeanSmplAdded));
} 

//console.log(mean(sample));
//console.log(filteredList.length / population.length);
