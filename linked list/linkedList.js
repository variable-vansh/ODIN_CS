class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {

    constructor() {
        this.head = null
    }
    // Build the following functions in your linked list class / factory:
    // append(value) adds a new node containing value to the end of the list
    append(value) {
        let thisList = this;

        //create a new Node with the provided value
        let newNode = new Node(value);

        //check if list is empty, then add a node
        if (thisList.head == null) {
            thisList.head = newNode;
        }
        // if not empty, run through all nodes and add the node when the list ends
        else {
            let node = this.head;
            while (node.next != null) {
                node = node.next;
            }
            node.next = newNode;
        }
    }
    // size returns the total number of nodes in the list
    size() {
        let counter = 0;
        let currentNode = this.head;
        while (currentNode != undefined) {
            currentNode = currentNode.next;
            counter++;
        }
        console.log("SIZE= " + counter)
    }
    // prepend(value) adds a new node containing value to the start of the list
    prepend(value) {
        let newNode = new Node(value, this.head);
        this.head = newNode;
    }
    // head returns the first node in the list
    headNode() {
        console.log("FIRST NODE= " + this.head.value)
    }
    // tail returns the last node in the list
    tailNode() {
        let currentNode = this.head;
        let lastNode;
        while (currentNode != undefined) {
            if (currentNode.next == undefined) {
                lastNode = currentNode
            }
            currentNode = currentNode.next;
        }
        console.log(lastNode.value)
    }
    // at(index) returns the node at the given index
    at(index) {
        let currentNode = this.head;
        let indexCounter = 0;
        let printed = false;
        while (currentNode != undefined) {
            if (indexCounter == index) {
                console.log(currentNode.value)
                printed = true;
            }
            indexCounter++;
            currentNode = currentNode.next;
        }
        if (!printed) {
            console.log("invalid index entered")
        }
    }
    // pop removes the last element from the list
    // contains(value) returns true if the passed in value is in the list and otherwise returns false.
    //     find(value) returns the index of the node containing value, or null if not found.
    // toString represents your LinkedList objects as strings, so you can print them out and preview them in the console.The format should be: (value) -> (value) -> (value) -> null
    // Extra credit
    // insertAt(value, index) that inserts a new node with the provided value at the given index.
    //     removeAt(index) that removes the node at the given index.

}

export { LinkedList }