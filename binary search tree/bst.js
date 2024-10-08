class Node {
    constructor(data) {
        this.data = data;
        this.leftBranch = null;
        this.rightBranch = null;;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(sortArray(array));
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
                console.log("mil gaya")
                console.log(currentNode)
                return
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
                temp = arr[j];
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

// let test = new Tree([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324])
// let test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9])
let test = new Tree([1, 2, 2, 3, 3, 4, 5])

// test.insert(5.5)
// test.delete(6)
// test.find(8)
// console.log(sortArray([1, 2, 2, 3, 3, 4, 5]))
// console.log("INORDER")
// test.inOrder(test.root, (node) => console.log(node.data));
// console.log("PREORDER")
// test.preOrder(test.root, (node) => console.log(node.data));
// console.log("POSTORDER")
// test.postOrder(test.root, (node) => console.log(node.data));

// console.log(test.levelOrder(test.root))

console.log(prettyPrint(test.root))
// console.log(sortArray([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]))

// console.log(sortArray([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]))