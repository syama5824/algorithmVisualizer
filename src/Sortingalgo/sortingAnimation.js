export function animateSorting(animations, array) {
    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdx, type] = animations[i];
        const arrayBars = document.getElementsByClassName('array-bar');

        if (type === 'compare') {
            setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'red';
                arrayBars[barTwoIdx].style.backgroundColor = 'red';
            }, i * 50);
            setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * 50);
        } else if (type === 'swap') {
            setTimeout(() => {
                const tempHeight = arrayBars[barOneIdx].style.height;
                arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
                arrayBars[barTwoIdx].style.height = tempHeight;

                arrayBars[barOneIdx].style.backgroundColor = 'red';
                arrayBars[barTwoIdx].style.backgroundColor = 'red';
            }, i * 50);
            setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
                arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
            }, (i + 1) * 50);
        } else if (type === 'overwrite') {
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${barTwoIdx}px`;
                barOneStyle.backgroundColor = 'turquoise';
            }, i * 50);
        }
    }
}
