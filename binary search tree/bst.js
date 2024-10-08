class Node {
    constructor(data) {
        this.data = data;
        this.leftBranch = null;
        this.rightBranch = null;;
    }
}

class Tree {
    constructor(array) {
        if (array.length === 0) {
            this.root = null;
        } else {
            this.root = this.buildTree(sortArray(array));
        }
        this.inOrderArr = [];
    }

    // takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed
    buildTree(sArr, left = 0, right = sArr.length - 1) {
        // let sArr = sortArray(arr)
        if (left > right) {
            return null;
        }

        const mid = Math.floor((left + right) / 2);
        const node = new Node(sArr[mid]);
        node.leftBranch = this.buildTree(sArr, left, mid - 1);
        node.rightBranch = this.buildTree(sArr, mid + 1, right);
        return node;
    }

    //insert new value
    insert(value) {
        // take up a node
        // compare it with the value
        // decide wether to go into left or right branch of tree
        // check if selected side is null
        // if null, put in value
        // if not null, take up that node recursively 
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        //take up a node
        let currentNode = this.root;
        //compare with value
        function compare(currentNode) {
            let currentValue = currentNode.data;
            if (value < currentValue) {
                //go left
                //check if vacant/null
                if (currentNode.leftBranch == null) {
                    //fill in vacancy
                    currentNode.leftBranch = new Node(value)
                    return;
                } else {
                    //not null
                    compare(currentNode.leftBranch)
                }

            } else if (value > currentValue) {
                //go right
                //check if vacant/null
                if (currentNode.rightBranch == null) {
                    //fill in vacancy
                    currentNode.rightBranch = new Node(value)
                    return;
                } else {
                    //not null
                    compare(currentNode.rightBranch)
                }
            } else {
                // value is equal to currentNode
                return;
            }
        }

        compare(currentNode)
    }

    //delete some value
    delete(value) {
        this.root = deleteNode(this.root, value);

        function deleteNode(node, value) {
            if (node === null) {
                return null;
            }

            if (value < node.data) {
                node.leftBranch = deleteNode(node.leftBranch, value);
            } else if (value > node.data) {
                node.rightBranch = deleteNode(node.rightBranch, value);
            } else {
                // Case 1: No branches
                if (node.leftBranch === null && node.rightBranch === null) {
                    return null;
                }

                // Case 2: Single branch
                if (node.leftBranch === null) {
                    return node.rightBranch;
                }
                if (node.rightBranch === null) {
                    return node.leftBranch;
                }

                // Case 3: Two branches
                let smallestOnRight = findSmallest(node.rightBranch);
                node.data = smallestOnRight.data;
                node.rightBranch = deleteNode(node.rightBranch, smallestOnRight.data);
            }
            return node;
        }

        function findSmallest(node) {
            while (node.leftBranch !== null) {
                node = node.leftBranch;
            }
            return node;
        }
    }

    find(value) {

        let currentNode = this.root;
        while (currentNode != null) {
            let currentValue = currentNode.data;
            if (value < currentValue) {
                currentNode = currentNode.leftBranch;
            } else if (value > currentValue) {
                currentNode = currentNode.rightBranch;
            } else if (value == currentValue) {
                return currentNode;
            }
            else {
                console.log("not found")
                return
            }
        }
    }

    //level order traversal
    levelOrder(callback = this.root) {
        //take a node
        //put it in the queue
        //take it out
        //extract it's data and put it's left and right children nodes in the queue
        //do this untill the node is null

        let resultArr = [];
        //initialize queue array
        let queue = [];
        //push the first node into queue
        queue.push(callback);

        //keep looping untill the queue is empty
        while (queue.length > 0) {
            //store the front most element in result
            resultArr.push(queue[0].data)

            //select the frontmost element from queue
            let currentNode = queue[0];
            //remove the frontmost element
            queue.splice(0, 1);

            //if leftBranch exists, add it to the the queue
            if (currentNode.leftBranch != null) {
                queue.push(currentNode.leftBranch)
            }
            //similarly, add the right branch if it exists
            if (currentNode.rightBranch != null) {
                queue.push(currentNode.rightBranch)
            }

        }

        return resultArr;
    }


    inOrder(node = this.root, callback) {
        //if the current node is null, exit function
        if (node === null) {
            return;
        }

        //runtime arrives here only when the node is non null
        //the left node is treated separately
        this.inOrder(node.leftBranch, callback);
        //after dealing with the left node completely, the node is called upon
        callback(node); // or callback(node.data) if you only need the data
        //then the right node is dealt with
        this.inOrder(node.rightBranch, callback);
    }

    //visit node,left,right
    preOrder(node = this.root, callback) {
        if (node === null) {
            return;
        }

        callback(node)
        this.inOrder(node.leftBranch, callback);
        this.inOrder(node.rightBranch, callback);
    }

    //visit left,right,node
    postOrder(node = this.root, callback) {
        if (node === null) {
            return;
        }

        this.inOrder(node.leftBranch, callback);
        this.inOrder(node.rightBranch, callback);
        callback(node)
    }

    //number of edges in the longest path from a given node to a leaf node
    height(currentValue) {
        //get the node corresponding to value
        let currentNode = this.find(currentValue);
        return calculateHeight(currentNode);
    }

    //number of edges in the path from a given node to the tree’s root node
    depth(targetValue) {
        // let targetNode = this.find(currentValue);

        return calculateDepth(this.root, targetValue)

        function calculateDepth(currentNode, targetValue) {
            if (currentNode == null) {
                return 10;
            }
            else if (currentNode.data === targetValue) {
                return 0;
            }
            //if it is a leaf node, height=1
            else if (currentNode.leftBranch === null && currentNode.rightBranch === null) {
                return 10;
            } else {
                let leftDepth = calculateDepth(currentNode.leftBranch, targetValue);
                let rightDepth = calculateDepth(currentNode.rightBranch, targetValue);
                return Math.min(leftDepth, rightDepth) + 1;
            }
        }
    }

    // balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
    // for each Node, find height of left and right branch
    // return false if difference is not equal to 1
    //otherwise return true
    isBalanced() {
        //recursive function to check for each node
        function checkBalance(node) {
            //base condition
            //if node is null, return
            if (node === null) {
                return { balanced: true, height: -1 };
            }

            //recursive call, for left and right branches
            let left = checkBalance(node.leftBranch);
            let right = checkBalance(node.rightBranch);

            //if either of the branches is not balanced, return false
            if (!left.balanced || !right.balanced) {
                return { balanced: false, height: 0 };
            }

            //compare left and right heights
            let heightDiff = Math.abs(left.height - right.height);
            //boolean balanced
            let balanced = heightDiff <= 1;
            //height of this node calculated (important for recursive purpose)
            let height = Math.max(left.height, right.height) + 1;

            return { balanced, height };
        }

        return checkBalance(this.root).balanced;
    }

    //take in unbalanced tree
    //travers through each node
    //collect all values
    //create a new tree from all those values
    rebalance() {
        let extractedValues = (sortArray(this.levelOrder()))
        return new Tree(extractedValues)
    }


}
//take in node
function calculateHeight(node) {
    //if node is empty, height=0
    if (node === null) {
        return -1;
    }
    //if it is a leaf node, height=1
    else if (node.leftBranch === null && node.rightBranch === null) {
        return 0;
    } else {
        let leftHeight = calculateHeight(node.leftBranch);
        let rightHeight = calculateHeight(node.rightBranch);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

//sort array and remove duplicates
function sortArray(arr) {


    //remove duplicates
    for (let i = 0; i < arr.length; i++) {
        let pick = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] == pick) {
                arr.splice(j, 1)

            }
        }
    }

    //sort
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j <= arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightBranch !== null) {
        prettyPrint(node.rightBranch, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└─ " : "┌─ "}${node.data}`);
    if (node.leftBranch !== null) {
        prettyPrint(node.leftBranch, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

export { Tree, Node, calculateHeight, sortArray, prettyPrint }

//----------------------------------------------------------------------------------------------------------

// let test = new Tree([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324])
// let test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9])
// let test = new Tree([1, 2, 2, 3, 3, 4, 5])

// test.insert(5.5)
// test.delete(6)
// console.log(test.find(8))
// console.log(sortArray([1, 2, 2, 3, 3, 4, 5]))
// console.log("INORDER")
// test.inOrder(test.root, (node) => console.log(node.data));
// console.log("PREORDER")
// test.preOrder(test.root, (node) => console.log(node.data));
// console.log("POSTORDER")
// test.postOrder(test.root, (node) => console.log(node.data));
// console.log(test.height(7))
// console.log(test.depth(1))
// console.log(test.levelOrder(test.root))

// console.log(test.isBalanced())

//------------------wworking with unbalanced tree and rebalancing it------------------
// let unbalancedTree = new Tree([]);
// [10, 30, 20, 40, 50].forEach(val => unbalancedTree.insert(val));
// console.log(unbalancedTree.isBalanced()); // This should return false

// unbalancedTree.rebalance()
// prettyPrint(unbalancedTree.root)

// console.log(unbalancedTree.rebalance().isBalanced());
// prettyPrint(unbalancedTree.rebalance().root)

//------------------------------------------------------------------------------------

// prettyPrint(test.root)
// console.log(sortArray([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]))

// console.log(sortArray([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]))