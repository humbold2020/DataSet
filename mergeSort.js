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
module.exports = mergeSort;
