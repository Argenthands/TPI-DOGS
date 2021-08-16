//const fetch = require('node-fetch');
const axios = require('axios');
const { Dog, Temperament, Dog_Temperament} = require('../db');
const { response } = require('express');
const e = require('express');

const {
    API_KEY, API_URL_BREEDS
  } = process.env; //donde pongo la api key???




const getDogsFromApi = async () =>{
   const allDogs = await axios.get(API_URL_BREEDS)
  .then(response => response.data)
  .then(data => {
    data.forEach(element => {

      //console.log(element.temperament.split(','))
      //let tempDogID = element.id;

    if(element.temperament){
      let separatedTemperaments = element.temperament.split(',');
      separatedTemperaments = separatedTemperaments.map((temp)=>temp.trim())
      //console.log(separatedTemperaments);
      separatedTemperaments.forEach(async temp =>{
        try{
          //si no lo encuentra lo agrega a la tabla Temperament
          await Temperament.findOrCreate({
            where: {
              name: temp,
            }
          });

          //consulto a la base de datos por el registro que coincida con el elemento que se intento agregar
          let idTemp = await Temperament.findOne({
            where:{
              name: temp
            }
          })

          //Transformo a Json la respuesta de la consulta anterior
          idTemp = await JSON.stringify(idTemp)
          idTemp = JSON.parse(idTemp)
          idTemp = idTemp.id
          //console.log(idTemp)
          
          //intento agregar una relacion a la tabla intermedia con las key de cada tabla
          
          await Dog_Temperament.create({
            DogId: element.id,
            TemperamentId: idTemp
          })
        }
        catch (error){
          console.log(error)
        }
      })
    }
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
