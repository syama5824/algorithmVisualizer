import React from 'react';
import './SortingVisualizer.css';
import { mergeSort,quickSort,heapSort,selectionSort,insertionSort,bubbleSort } from './sortingAlgorithms';
import { animateSorting } from './sortingAnimation';
import { Navbar,Nav } from 'react-bootstrap';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [], selectedAlgorithm: 'mergeSort' };
        this.resetArray = this.resetArray.bind(this);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.renderSorting = this.renderSorting.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.heapSort = this.heapSort.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 50; i++) {
            array.push(randomIntFromInterval(50, 500));
        }
        this.setState({ array }, this.resetArrayColors);
    }

    resetArrayColors() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = '#1e6091';
        }
    }

    handleAlgorithmChange(event){
        this.setState({selectedAlgorithm:event.target.value});
    }

    renderSorting(){
        const{selectedAlgorithm} = this.state;
        switch(selectedAlgorithm){
            case 'mergeSort':
                this.mergeSort();
                break;
            case 'quickSort':
                this.quickSort();
                break;
            case 'heapSort':
                this.heapSort();
                break;
            case 'bubbleSort':
                this.bubbleSort();
                break;
            case 'selectionSort':
                this.selectionSort();
                break;
            case 'insertionSort':
                this.insertionSort();
                break;
            default:
                break;
        }
    }

    mergeSort(){
        const animations=mergeSort(this.state.array.slice());
        animateSorting(animations);
    }

    quickSort(){
        const animations=quickSort(this.state.array.slice());
        animateSorting(animations);
    }

    heapSort() {
        const animations=heapSort(this.state.array.slice());
        animateSorting(animations);
    }

    bubbleSort() {
        const animations=bubbleSort(this.state.array.slice());
        animateSorting(animations);
    }

    selectionSort() {
        const animations=selectionSort(this.state.array.slice());
        animateSorting(animations);
    }

    insertionSort() {
        const animations=insertionSort(this.state.array.slice());
        animateSorting(animations);
    }

    render() {
        const { array, selectedAlgorithm } = this.state;

        // const algorithmOptions = [
        //     { key: 'mergeSort', text: 'Merge Sort' },
        //     { key: 'quickSort', text: 'Quick Sort' },
        //     { key: 'heapSort', text: 'Heap Sort' },
        //     { key: 'bubbleSort', text: 'Bubble Sort' },
        //     { key: 'selectionSort', text: 'Selection Sort' },
        //     { key: 'insertionSort', text: 'Insertion Sort' },
        // ];//Semantic-UI Dropdown search selection Type.

        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#">Sorting Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Dropdown onSelect={this.handleAlgorithmChange}>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {algorithmOptions.map(option => (
                                    <Dropdown.Item key={option.key} eventKey={option.key}>{option.text}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu> 
                         </Dropdown> */}
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            
                <div className="control-panel">
                    <select id="algorithm-select" value={selectedAlgorithm} onChange={this.handleAlgorithmChange}>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                        <option value="heapSort">Heap Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="selectionSort">Selection Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                    </select>
                    <button className='generate-button' onClick={this.resetArray}>Generate New Array</button>
                    <button className='sort-button' onClick={this.renderSorting}>Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
