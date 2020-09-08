const mergeSort = startArray => {
    const length = startArray.length;
    if (length === 1) {
        // Im not sure how two returns work in the same array but it does so...
        return startArray;
    }
    const mid = Math.floor(length / 2);
    const leftArray = startArray.slice(0, mid);
    const rightArray = startArray.slice(mid, length);
    return merge(mergeSort(leftArray), mergeSort(rightArray));
}

const merge = (leftArray, rightArray) => {
    let sortedArray = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
        leftArray[0] < rightArray[0] ? sortedArray.push(leftArray.shift()) : sortedArray.push(rightArray.shift());
    }
    return sortedArray.concat(leftArray, rightArray);
}

const unsortedList = [73, 103, 91, 93, 136, 108, 92, 104, 90, 78, 108, 93, 91, 78, 81, 130, 82, 86, 111, 93, 102, 111, 125, 107, 80, 90, 122, 101, 82, 115, 103, 110, 84, 115, 85, 83, 131, 90, 103, 106, 71, 69, 97, 130, 91, 62, 85, 94, 110, 85, 102, 109, 105, 97, 104, 94, 92, 83, 94, 114, 107, 94, 112, 113, 115, 106, 97, 106, 85, 99, 102, 109, 76, 94, 103, 112, 107, 101, 91, 107, 107, 110, 106, 103, 93, 110, 125, 101, 91, 119, 118, 85, 127, 141, 129, 60, 115, 80, 111, 79];

//const randomize = () => Math.floor(Math.random() * 40);
/*for (let i = 0; i < 10; i++) {
    unsortedList.push(randomize());
}*/
console.log('Unsorted List:', unsortedList);
const sortedList = mergeSort(unsortedList);


console.log('Sorted List', sortedList);
console.log('Range:', sortedList[sortedList.length - 1] - sortedList[0]);
const filteredList = sortedList.filter(individual => {
    return individual >= 67.8 && individual <= 132.2;
})
console.log(filteredList);
module.exports = filteredList;
