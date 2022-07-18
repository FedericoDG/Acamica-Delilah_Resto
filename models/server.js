const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dataBase = require('../database/conection');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.EXPRESS_PORT || 3000;
    this.usersRoutes = '/v1/users';
    this.productsRoutes = '/v1/products';
    this.ordersRoutes = '/v1/orders';

    this.middlewares();
    this.routes();
    this.connection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use(this.usersRoutes, require('../routes/users.routes'));
    this.app.use(this.productsRoutes, require('../routes/products.routes'));
    this.app.use(this.ordersRoutes, require('../routes/orders.routes.js'));
    this.app.use((_, res) => res.status(404).send('Ruta no encontrada.'));
  }
  connection() {
    dataBase.connect((error) => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Connected to database: ${process.env.MARIADB_DATABASE}`);
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.clear();
      console.log(`Api live on: http://localhost:${this.port}`);
      console.log({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
      });
    });
  }
}

module.exports = Server;
