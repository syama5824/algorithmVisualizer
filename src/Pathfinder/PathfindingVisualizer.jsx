import React, { Component } from "react";
import Node from './Node/Node';
import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
    }

    componentDidMount() {
        this.createGrid();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.createGrid();
    }

    createGrid() {
        const nodes = [];
        const numRows = 30;
        const numCols = 20;

        for (let row = 0; row < numRows; row++) {
            const currentRow = [];
            for (let col = 0; col < numCols; col++) {
                const node = {
                    row,
                    col,
                    isStart: row === Math.floor(numRows / 2) && col === Math.floor(numCols / 4),
                    isFinish: row === Math.floor(numRows / 2) && col === Math.floor((3 * numCols) / 4),
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null,
                };
                currentRow.push(node);
            }
            nodes.push(currentRow);
        }
        this.setState({ nodes });
    }

    render() {
        const { nodes } = this.state;

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="node-row">
                            {row.map((node, nodeIdx) => (
                                <Node
                                    key={nodeIdx}
                                    row={node.row}
                                    col={node.col}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                    distance={node.distance}
                                    isVisited={node.isVisited}
                                    isWall={node.isWall}
                                    previousNode={node.previousNode}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }
}
