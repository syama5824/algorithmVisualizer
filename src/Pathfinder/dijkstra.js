export function dijkstra(grid,startNode,finishNode){
    const visitedNodeInorder=[];
    startNode.distance=0;
    const unvisitedNodes = getAllNodes(grid);

    while(!unvisitedNodes.length){
        sortedNodesByDistance(unvisitedNodes);
        const closetNode = unvisitedNodes.shift();

        if(closetNode.isWall) continue;

        if(closetNode.distance===Infinity) return visitedNodeInorder;
        closetNode.isVisited=true;
        visitedNodeInorder.push(closetNode);
        if(closetNode===finishNode) return visitedNodeInorder;
        updateUnvisitedNeighbours(closetNode,grid);
    }
}

function sortedNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}

function updateUnvisitedNeighbours(node,grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(node,grid);
    for(const neighbour of unvisitedNeighbours){
        neighbour.distance = node.distance+1;
        neighbour.previousNode = node;
    }
}

function getUnvisitedNeighbours(node,grid){
    const neighbours=[];
    const {col,row} = node;
    if(row>0) neighbours.push(grid[row-1][col]);
    if(row<grid.length-1) neighbours.push(grid[row+1][col]);
    if(col>0) neighbours.push(grid[row][col-1]);
    if(col<grid.length-1) neighbours.push(grid[row][col+1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function getAllNodes(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathorder(finsihNode){
    const nodesInShortestPathorder = [];
    let currentNode = finsihNode;
    while(currentNode){
        nodesInShortestPathorder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathorder;
}