//const axios = require('axios');
const { Dog } = require('../db');



// se resetea la PK y no se por que
const addDog = async function (name, height, weight, life_span, image = null){

    //voy a tener que consultar cual es la clave que sigue
    let newID = await Dog.max('id')
    newID = newID +1;

    const creaated = await Dog.create({
        id: newID,
        name: name,
        height: height,
        weight: weight,
        life_span: life_span,
        image: image
    }).catch(error =>{
        console.log(error);
    })
    return creaated
}

module.exports = {
    addDog
}