export function bubbleSort(arr) {
    const animations=[];
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<(arr.length-i-1);j++){
            animations.push([j,j+1,'compare']);
            if(arr[j]>arr[j+1]){
                animations.push([j,j+1,'swap']);
                swap(arr,j,j+1);
            }
            animations.push([j,j+1,'uncompare']);
        }
    }
    return animations;
}

export function insertionSort(arr){
    const animations=[];
    let len=arr.length;
    let i,key,j;

    for(i=1;i<len;i++){
        key=arr[i];
        j=i-1;

        animations.push([i,-1,'select']);
        while(j>=0 && arr[j]>key){
            animations.push([j,j+1,'compare']);
            arr[j+1]=arr[j];
            animations.push([j+1,arr[j],'overwrite']);
            j=j-1;
            animations.push([j,j+1,'uncompare']);
        }
        arr[j+1]=key;
        animations.push([j+1,key,'overwrite']);
        animations.push([i,-1,'deselect']);
    }
    return animations;
}

export function selectionSort(arr){
    const animations=[];
    let len = arr.length;

    for(let i=0;i<len-1;i++){
        let min_idx=i;
        for(let j=i+1;j<len;j++){
            animations.push([min_idx,j,'compare']);
            if(arr[j]<arr[min_idx]){
                min_idx=j;
            }
            animations.push([min_idx,j,'uncompare']);
        }
        animations.push([i,min_idx,'swap']);
        swap(arr,min_idx,i);
    }
    return animations;
}

export function quickSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray=array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    let pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;

    for (let i = startIdx; i < endIdx; i++) {
        animations.push([i, endIdx, 'compare']);
        animations.push([i, endIdx, 'uncompare']);
        if (array[i] < pivotValue) {
            animations.push([i, pivotIdx, 'swap']);
            swap(array, i, pivotIdx);
            pivotIdx++;
        }
    }
    animations.push([pivotIdx, endIdx, 'swap']);
    swap(array, pivotIdx, endIdx);
    return pivotIdx;
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j, 'compare']); // Color change for comparison
        animations.push([i, j, 'uncompare']); // Revert color change
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i], 'overwrite']); // Overwrite value
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j], 'overwrite']); // Overwrite value
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i, 'compare']); // Color change for comparison
        animations.push([i, i, 'uncompare']); // Revert color change
        animations.push([k, auxiliaryArray[i], 'overwrite']); // Overwrite value
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j, 'compare']); // Color change for comparison
        animations.push([j, j, 'uncompare']); // Revert color change
        animations.push([k, auxiliaryArray[j], 'overwrite']); // Overwrite value
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function heapSort(arr) {
    const animations = [];
    let len = arr.length;

    for (let i = parseInt(len / 2) - 1; i >= 0; i--) {
        heapify(arr, len, i, animations);
    }

    for (let i = len - 1; i > 0; i--) {
        animations.push([0, i, 'swap']);
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0, animations);
    }

    return animations;
}

function heapify(arr, len, i, animations) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < len && arr[l] > arr[largest]) {
        largest = l;
        animations.push([l, largest, 'compare']);
    }
    if (r < len && arr[r] > arr[largest]) {
        largest = r;
        animations.push([r, largest, 'compare']);
    }
    if (largest !== i) {
        animations.push([i, largest, 'swap']);
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        heapify(arr, len, largest, animations);
    }
}
