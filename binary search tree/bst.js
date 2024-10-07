class Node {
    constructor(data) {
        this.data = data;
        this.leftBranch = null;
        this.rightBranch = null;;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed
    buildTree(arr, left = 0, right = arr.length) {
        let sArr = sortArray(arr)
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
    return arr;
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
let test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9])
// test.insert(5.5)
// test.delete(6)
// test.find(8)

console.log(prettyPrint(test.root))


// console.log(sortArray([1, 7, 4, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]))