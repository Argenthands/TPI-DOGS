const express = require('express');
const { addDog } = require('../controlers/addDog');

const { Dog, Temperament } = require('../db');

const router = express.Router();

/*
[ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/


//Muestra todos los perros faltaria incluir los temperamentos de la otra tabla y la imagen de la api
router.get('/', async function (req, res){
    try {
        //const temperaments = await Temperament.findAll({})
        const dogs = await Dog.findAll({
            attributes: ['image','name'],
            include: {
                model: Temperament,
                attributes: ['name']
            }
        })
        .then(dogs =>{
            return res.json(dogs)
        })
    }
    catch(error) {
        error =>{
            console.log(error)
            return res.json(error)
        }
    }
})

//Agrega un perro en la base de dato
router.post('/add', (req, res)=>{
    const {name, height, weight, life_span, image} = req.body;
    return res.status(200).json(addDog(name, height, weight, life_span, image));
})

//borra un perro
router.delete('/delete', async (req, res)=>{
    const { id, name } = req.body;
    return res.status(200).json(deleteDog(name))
})


module.exports = router;