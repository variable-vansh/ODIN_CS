class BucketClass {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {

    constructor() {
        this.storage = new Array(84)
    }

    //takes a key and produces a hash code with it
    hash(key) {
        let hashCode = 0;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * 13) + key.charCodeAt(i);
        }

        return hashCode % this.storage.length;
    }

    set(key, value) {
        let hashCode = this.hash(key);

        if (this.storage[hashCode] == null) {
            this.storage[hashCode] = new BucketClass(key, value);
        } else {
            let currentBucket = this.storage[hashCode];
            let lastBucket = this.storage[hashCode];
            while (currentBucket != null) {
                if (currentBucket.key == key) {
                    currentBucket.value = value;
                    return
                }
                if (currentBucket.value == value) {
                    return
                }
                lastBucket = currentBucket;
                currentBucket = currentBucket.next;
            }
            lastBucket.next = new BucketClass(key, value);
        }
    }

    //returns the value that is assigned to this key
    get(key) {
        let value = this.storage[this.hash(key)]
        return ((value) ? value : null).value
    }

    //returns true or false based on whether or not the key is in the hash map
    has(key) {
        let hashCode = this.hash(key)

        return (this.storage[hashCode] != null)
    }

    //remove the entry with that key and return true. If the key isn’t in the hash map, it should return false
    remove(key) {
        let hashCode = hash(key);
        let currentBucket = this.storage[hashCode]
        while (currentBucket != null) {
            if (this.has(key) == true) {
                this.storage[hashCode] = null;
                return true;
            }
            currentBucket = currentBucket.next;
        }
        return false

    }

    //returns the number of stored keys in the hash map
    length() {
        let nonNullValues = 0;

        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i] != null) {
                nonNullValues++;
            }
        }

        return nonNullValues
    }

    // removes all entries in the hash map
    clear() {
        this.storage = [];
    }

    //returns an array containing all the keys inside the hash map
    keys() {
        let keys = [];
        for (let bucket of this.storage) {
            let currentBucket = bucket;
            while (currentBucket != null) {
                keys.push(bucket.key);
                currentBucket = currentBucket.next;
            }

        }
        return keys;
    }

    //returns an array containing all the values inside the hash map
    values() {
        let values = [];
        for (let bucket of this.storage) {
            values.push(bucket.value);
        }
        return values;
    }

    //returns an array that contains each key, value pair
    entries() {
        let entriesArray = [];
        for (let i = 0; i < this.storage.length; i++) {
            if (this.has(hash(i))) {
                let key = this.storage[i].key;
                let value = this.storage[i].value;

                entriesArray.push([key, value])
            }
        }
        return entriesArray;
    }

    // test() {
    //     console.log("calling from class in another module")
    // }
}

export { HashMap }