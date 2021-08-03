const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dataBase = require('../database/conection');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.EXPRESS_PORT;
    this.apiRoute = '/api';

    this.middlewares();
    this.routes();
    this.connection();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
  routes() {
    this.app.use(this.apiRoute, require('../routes/api.routes'));
  }
  connection() {
    dataBase.connect((error) => {
      if (error) {
        throw new Error(error);
      }
      console.log('Connected to MariaDB. Database:', process.env.MARIADB_DATABASE);
    });
  }
  listen() {
    this.app.listen(this.port, () => {
      console.clear()
      console.log('Server live on port:', this.port);
    });
  }
}

module.exports = Server;