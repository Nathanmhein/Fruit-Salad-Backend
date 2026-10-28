const { resource, response } = require('../app');
const db = require('../database/db')

//OOP = Object Oriented Programming

class Fruit {
    constructor (fruit) {   
        this.id = fruit.id;  
        this.name = fruit.fruit_name;              // 
        this.genus = fruit.genus;        
        this.family = fruit.family;
        this.order = fruit.fruit_order;
        this.nutritutions = fruit.nutritutions;
    }

    static async showAll() {
        const response = await db.query('SELECT * FROM fruits ORDER BY fruit_name;') 
        return response.rows.map ( fruit => new Fruit(fruit))
    }

    static show(name) {
        const response = await db.query ('SELECT * FROM fruits WHERE LOWER (fruit_name) =$1;',(name))
        

        if (response.rows.length != 1) {
            throw 'The fruit does not exist'
        } else {
            return new Fruit (response.rows[0]);
        }
    }

    static async create (data){
        
        if (!data.name){
            throw 'A fruit needs a name'
        }

        const existing = await db.query ('SELECT * FROM fruits WHERE LOWER(fruit_name) = $1;', [data.name.toLowerCase()]);

    //    const fruit = fruits.find ((fruit)=> fruit.name.toLowerCase() == data.name.toLowerCase());
        if (existing.rows.length>1) {
            throw 'The fruit already exists'
        }
        

            new response = await db.query ('INSERT INTO fruits (fruit_name, genus, family, fruit_order, nurtitions) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [data.name,data.genus,data.family,data.order,data.nutritutions])
            // newFruit ['id'] = Math.max(...fruits.map (fruit => fruit.id)) + 1;
            // fruits.push (newFruit);

            // return new Fruit (newFruit); 
            return new Fruit(response.rows[0])

           //there's new becos its a new instance

    }

    async update (data){

        const name = data.name || this.name;
        const family = data.family || this.family;

        const response = await db.query ('UPDATE fruits SET fruit_name = $1, family = $2 WHERE id = $3 RETURNING *', [name, family, this.id]);

        return new Fruit (response.rows[0]);



        // const updateFruit=fruits.find (fruit =>fruit.name.toLowerCase()== this.name.toLowerCase())


        // if (updateFruit){
        //     if (data.name) updateFruit.name = data.name;
        //     if (data.family) updateFruit.family = data.family;

        //     return new Fruit (updateFruit)
        // } else {
        //     throw 'Fruit not found'
        // }

    }

    async destroy (data){

        await db.query('DELETE FROM fruits WHERE id = $1;', [this.id]);

        // const deleteFruit = fruits.find (fruit =>fruit.name.toLowerCase()== this.name.toLowerCase())

        // if (deleteFruit) {
        //     const index = fruits.indexOf(deleteFruit)
        //     fruits.splice (index,1)
        // } else {
        //     throw 'Fruit not Found'
        // }
    }
    
}

module.exports = Fruit;