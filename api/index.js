                //                       _oo0oo_
                //                      o8888888o
                //                      88" . "88
                //                      (| -_- |)
                //                      0\  =  /0
                //                    ___/`---'\___
                //                  .' \\|     |// '.
                //                 / \\|||  :  |||// \
                //                / _||||| -:- |||||- \
                //               |   | \\\  -  /// |   |
                //               | \_|  ''\---/''  |_/ |
                //               \  .-\__  '-'  ___/-. /
                //             ___'. .'  /--.--\  `. .'___
                //          ."" '<  `.___\_<|>_/___.' >' "".
                //         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
                //         \  \ `_.   \_ __\ /__ _/   .-` /  /
                //     =====`-.____`.___ \_____/___.-`___.-'=====
                //                       `=---='
                //     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');



const { getDogsFromApi } = require('./src/louder/loader');

/*
const express = require('express');
const routes = require('./src/routes/index');
const app = express();
app.use(express.json());
*/

// conn es la coneccion que traje de db y sync recive un force true para sobreescribir la tabla
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    getDogsFromApi();
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
