import { Tree, Node, calculateHeight, sortArray, prettyPrint } from "./bst.js"

// Create a binary search tree from an array of random numbers < 100.
let numberOfElementsInBST = RandomNumberLessThan(20);
let arr = []
for (let i = 0; i <= numberOfElementsInBST; i++) {
    arr.push(RandomNumberLessThan(100))
}
let newTree = new Tree(arr);
prettyPrint(newTree.root)

//You can create a function that returns an array of random numbers every time you call it if you wish.
function RandomNumberLessThan(n) {
    return Math.floor(Math.random() * n)
}

// Confirm that the tree is balanced by calling isBalanced.
console.log("Balanced?:" + newTree.isBalanced())

let preOrderArr = [];
let postOrderArr = [];
let inOrderArr = [];

// Print out all elements in level, pre, post, and in order.
function orderPrints() {
    console.log("Level Order");
    console.log(newTree.levelOrder())

    console.log("PRE order")
    newTree.preOrder(newTree.root, (node) => {
        preOrderArr.push(node.data)
    })
    console.log(preOrderArr)

    console.log("POST order")
    newTree.postOrder(newTree.root, (node) => {
        postOrderArr.push(node.data)
    })
    console.log(postOrderArr)

    console.log("IN order")
    newTree.inOrder(newTree.root, (node) => {
        inOrderArr.push(node.data)
    })
    console.log(inOrderArr)
}

orderPrints()

// Unbalance the tree by adding several numbers > 100.
let noOfNewNumbers = RandomNumberLessThan(10);
let newNumbersArr = [];
for (let i = 0; i <= noOfNewNumbers; i++) {
    let newNumber = RandomNumberLessThan(100);
    newNumbersArr.push(newNumber)
    newTree.insert(newNumber)
}
console.log("New Numbers added => " + newNumbersArr)
prettyPrint(newTree.root)

orderPrints(0)

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("Balanced?:" + newTree.isBalanced())

// Balance the tree by calling rebalance.
if (newTree.isBalanced() == false) {
    newTree = newTree.rebalance();
    console.log("Balanced Tree:")
    prettyPrint(newTree.root)
}

// Confirm that the tree is balanced by calling isBalanced.
console.log("Balanced?:" + newTree.isBalanced())

// Print out all elements in level, pre, post, and in order.
orderPrints()