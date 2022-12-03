module.exports = class Lista {

    elements;

    constructor() {
        this.elements = [];
    }


    count() {
        return this.elements.length;
    }

    add(key, value) {
        if (typeof(key) != 'string' || key == "") {
            return false;
        }
        if(!this.exists(key)) {
            this.elements.push({ 'key': key, 'value': value });
            
        } else {
            return false;
        }

        
    }

    exists(key) {
        if(!this.find(key)) {
            return false;
        } else {
            return true;
        }

    }

    getValue(key) {
        return this.find(key).value;
        
    }


    update(keyToUpdate, newValue) {
        var element = this.find(keyToUpdate);

        if(!element) {
            return false;
        } else {
            element.value = newValue;
            return element;
        }


    }

    find(key) {
        for (var index = 0; index < this.elements.length; index++) {
            if (this.elements[index].key === key) {
                return this.elements[index];
            }
        }

        return false;
    }

    getElementIndex(key) {
        for (var index = 0; index < this.elements.length; index++) {
            if (this.elements[index].key === key) {
                return index;
            }
        }

        return -1;
    }

    getKeys() {
        let keys = [];
        this.elements.forEach((elem) => {
            keys.push(elem.key);
        })
        return keys.sort();
    }

    delete(key) {
        var indexToDelete = this.getElementIndex(key);

        if (indexToDelete >=0) {
                this.elements.splice(indexToDelete, 1);
                return true;
        }

        return false;
    }


}