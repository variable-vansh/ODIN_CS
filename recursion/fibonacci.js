function fibs(num, originNum) {

    //if num is 0 or 1, save 0 or 1 to array
    //this part is not touched upon if num is greater than 1
    if (num < 2) {
        let prevFibs = [num - 1];
        if (prevFibs.length == originNum)
            console.log(prevFibs);
        return num
    }
    //if num=2, save 0,1 together, preventing from going down to fibs(1) and fibs(0)
    else if (num == 2) {
        let prevFibs = [0, 1]
        if (prevFibs.length == originNum)
            console.log(prevFibs);
        return [0, 1]
    }
    else {
        //prevFibs stores the previous fibbonaci
        let prevFibs = fibs(num - 1);

        //takes last 2 elements from seris to add up
        prevFibs.push(prevFibs[prevFibs.length - 1] + prevFibs[prevFibs.length - 2]);
        if (prevFibs.length == originNum)
            console.log(prevFibs);
        return prevFibs;
    }
}

// var num = 5;

// fibs(num, originNum = num)


