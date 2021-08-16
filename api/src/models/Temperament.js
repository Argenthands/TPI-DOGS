const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    }
  },
  {
    timestamps: false //no crear los atributos de fecha de actualizacion y creacion
  });
};

/*
Temperamento con las siguientes propiedades:
  ID
  Nombre
*/