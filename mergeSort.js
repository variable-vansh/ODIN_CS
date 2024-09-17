
function sortThisUp(arr) {
    if (arr.length == 1) {
        return arr;
    }
    else {
        let halfLength = Math.floor(arr.length / 2)
        let left = arr.slice(0, halfLength)
        let right = arr.slice(halfLength, arr.length)

        return merge(sortThisUp(left), sortThisUp(right))
    }
}

function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        }
        else {
            result.push(right.shift())
        }
    }

    return result.concat(left).concat(right)
}
let arr = [105, 79, 100, 110]
console.log(sortThisUp(arr))