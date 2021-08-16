require('dotenv').config(); // para manejar variables de entorno
const { Sequelize } = require('sequelize');
const fs = require('fs'); // para acceder, leer y crear archivos y carpetas 
const path = require('path'); // utilidades para trabajar con rutas de fichero
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_TYPE, DATABASE, API_KEY, API_URL
} = process.env;

const sequelize = new Sequelize(`${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Dog.belongsToMany(Temperament, {through: "Dog_Temperament", timestamps: false});
Temperament.belongsToMany(Dog, {through: "Dog_Temperament", timestamps: false});

/*
Dog.hasMany(Temperament, {foreingKey: 'dogId', sourceKey: 'id'})
Dog.hasOne(Temperament)
Temperament.belongsTo(Dog)
*/

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
