// import { test } from "./test.js"

// test();

import { LinkedList } from "./linkedList.js"

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
//------------------------------
list.prepend(0);
list.prepend(-1);
list.prepend(-2);

//------------------------------
// list.headNode()
//------------------------------
// list.tailNode()
//------------------------------
// list.at(6)
//------------------------------
// list.pop();
//------------------------------
// console.log(list.contains(3));
//------------------------------
// console.log(list.find(5))
//------------------------------
// console.log(list.toStrings());
//------------------------------
// list.insertAt(1000, 0)
//------------------------------
// list.removeAt()

// Print the linked list
let currentNode = list.head;
while (currentNode != undefined) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
}

// list.test();

// console.log("test")


//------------------------------
// console.log(list.size());
//------------------------------


