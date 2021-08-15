//const fetch = require('node-fetch');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { response } = require('express');

const {
    API_KEY, API_URL_BREEDS
  } = process.env; //donde pongo la api key???




const getDogsFromApi = async () =>{
   const allDogs = await axios.get(API_URL_BREEDS)
  .then(response => response.data)
  .then(data => {
    data.forEach(element => {

      //console.log(element.temperament.split(','))

      Temperament.create({
        id: element.id,
        name: element.temperament
      })

      Dog.create({
        id: element.id,
        name: element.name,
        height: element.height.metric,
        weight: element.weight.metric,
        life_span: element.life_span,
        image: element.image.url
      });
    })
  })
  //.then(data => console.log(data))
  .catch(error => console.log(error))
}
/*
const getTemperamentsFromApi = async () =>{
  const apiResponse = await fetch(API_URL_BREEDS)
  let allTemperaments = apiResponse.map((element)=> element.temperament);
  allTemperaments = allTemperaments.join().split(",");

  allTemperaments = allTemperaments.map((element)=>element.trim());
  let temperamentList = new Set(allTemperaments);
  temperamentList = [...temperamentList];

  await temperamentList.map((t)=>{
    Temperament.create({
      nombrre: t
    })
  })
}
*/

/* 
findOrCreate({
  where: {
    name: element, <-- temperaments
  },
  default: <-- no necesito
})
*/
module.exports = {
  getDogsFromApi,
  //getTemperamentsFromApi
}
