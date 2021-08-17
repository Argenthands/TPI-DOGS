const { Dog, Temperament } = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const temperament = await Temperament.findAll()
        .then(temperaments =>{
            return res.status(200).json(temperaments)
        })
    }
    catch(error) {
        error =>{
            console.log(error)
            return res.status(400).json(error)
        }  
    }
})

module.exports = router;