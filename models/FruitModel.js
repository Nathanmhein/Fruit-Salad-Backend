const fruits=require('../fruits.json')

//OOP = Object Oriented Programming

class Fruit {
    constructor (fruit) {                   // 
        this.genus = fruit.genus;
        this.name = fruit.name;
        this.id = fruit.id;
        this.family = fruit.family;
        this.order = fruit.order;
        this.nutritutions = fruit.nutritutions;
    }

    static showAll() {
        return fruits.map ( q => new Fruit(q))
    }

    static show(name) {

        const fruit = fruits.find ((fruit) => fruit.name.toLowerCase() == name) 

        if (fruit) {
            return new Fruit (fruit)
        
        } else {
            throw 'The fruit does not exist'
        }
    }

    static create (data){
        const newFruit = data;

        if (!data.name){
            throw 'A fruit needs a name'
        }

        const fruit = fruits.find ((fruit)=> fruit.name.toLowerCase() == data.name.toLowerCase());
        if (fruit) {
            throw 'The fruit already exists'
        }
        else {
            newFruit ['id'] = Math.max(...fruits.map (fruit => fruit.id)) + 1;
            fruits.push (newFruit);

            return new Fruit (newFruit); 
        }

           //there's new becos its a new instance

    }

    update (data){
        const updateFruit=fruits.find (fruit =>fruit.name.toLowerCase()== this.name.toLowerCase())

        if (updateFruit){
            if (data.name) updateFruit.name = data.name;
            if (data.family) updateFruit.family = data.family;

            return new Fruit (updateFruit)
        } else {
            throw 'Fruit not found'
        }

    }

    destroy (data){
        const deleteFruit = fruits.find (fruit =>fruit.name.toLowerCase()== this.name.toLowerCase())

        if (deleteFruit) {
            const index = fruits.indexOf(deleteFruit)
            fruits.splice (index,1)
        } else {
            throw 'Fruit not Found'
        }
    }
    
}

module.exports = Fruit;