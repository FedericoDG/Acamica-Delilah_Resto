![Logo](https://nazgul.com.ar/images/delilah_resto.png)

# Delilah Restó

REST API desarrollada en Node.js para un sistema de pedidos online para un restaurante.

## Autor

- [Federico González](https://www.linkedin.com/in/fededg/)

## Instalación

Para correr este proyecto es necesario estar ejecutando MariaDB e importar, vía algún gestor como PhpMyAdmin, el archivo:

```
  /examples/dalilah_resto.sql

```

Automáticamente se creará una base de datos llamada "deliah_resto", las tablas y ciertos datos de ejemplo.

Clonar el repositorio:

```
  git clone https://github.com/FedericoDG/Acamica-Delilah_Resto.git
```

Acceder a la carpeta del proyecto:

```
  cd Acamica-Delilah_Resto
```

Instalar las dependencias:

```bash
  npm install
```

Arrancar el servidor:

```bash
  node app.js
```

### Credenciales del administrador:

```
username: Admin
password: Password1234!
```

### Credenciales de un usuario:

```
username: User2
password: Password1234!
```

## Variables de Entorno

En caso de ser necesario editar el archivo ".env":

`EXPRESS_PORT=3000` Puerto donde correrá el servidor.

`MARIADB_HOST=localhost` Host de la base de datos.

`MARIADB_USER=root` Usuario de la base de datos.

`MARIADB_PASSWORD=` Contraseña de la base de datos.

`MARIADB_DATABASE=delilah_resto` Nombre de la base de datos.

`SECRET=AD"!#!123ad23512&/%terfa$#%"ASFD#$Q%324"#$sadff` Llave secreta para generar JWT.

## Postman - Documentación

En la carpeta "examples" se encuentran las colecciones de Postman, en versión v2.10 y v2.00.

```
/examples/delilah_resto.postman_collection_v21.json
/examples/delilah_resto.postman_collection_v21.json
```

La colección incluye todos los ejemplos de uso y sus respectivas respuestas.

## API Referencia

#### Login

```
  POST /v1/users/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

#### Register

```
  POST /v1/users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |
| `name`     | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `phone`    | `number` | **Required**. Your phone    |
| `address`  | `string` | **Required**. Your address  |

#### Get all users

```
  GET /v1/users
```

#### Get a user

```
  GET /v1/users/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User id |

#### Edit a user

```
  PUT /v1/users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `password` | `string` | **Required**. User password |
| `name`     | `string` | **Required**. User name     |
| `phone`    | `number` | **Required**. User phone    |
| `address`  | `string` | **Required**. User address  |

#### Delete a user

```
  DELETE /v1/users/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User id |

#### Get all products

```
  GET /v1/products
```

#### Get a product

```
  GET /v1/products/${id}
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. Product id |

#### Create a product

```
  POST /v1/products
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `name`        | `string` | **Required**. Product name        |
| `description` | `string` | **Required**. Product description |
| `image`       | `string` | **Required**. Product image       |
| `price`       | `number` | **Required**. Product price       |

#### Update a product

```
  PUT /v1/products/${id}
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `id`          | `string` | **Required**. Product id          |
| `name`        | `string` | **Required**. Product name        |
| `description` | `string` | **Required**. Product description |
| `image`       | `string` | **Required**. Product image       |
| `price`       | `number` | **Required**. Product price       |

#### Delete a product

```
  DELETE /v1/products/${id}
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. Product id |

#### Get all orders

```
  GET /v1/orders
```

#### Get a order

```
  GET /v1/orders/${id}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `id`      | `string` | **Required**. Order id |

#### Get all user orders

```
  GET /v1/orders/user/${id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User id |

#### Create a order

```
  POST /v1/orders
```

| Parameter        | Type     | Description                               |
| :--------------- | :------- | :---------------------------------------- |
| `payment_method` | `string` | **Required**. Payment method              |
| `order`          | `array`  | **Required**. List of products and prices |

```
payment_method: CASH | DEBIT | CREDIT
```

```
"order":
  [
    {
      "quantity": 1,
      "product_id": 2
    },
    {
      "quantity": 1,
      "product_id": 6
    }
  ]
```

#### Update a order

```
  PUT /v1/orders/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Order id     |
| `status`  | `array`  | **Required**. Order status |

```
status: NEW |CONFIRMED | PREPARING | DELIVERED | CANCELED
```

#### Delete a order

```
  DELETE /v1/orders/${id}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `id`      | `string` | **Required**. Order id |

## Stack de Dependencias

- [Express](https://expressjs.com/)
- [JsonWebTokens](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [MySQL](https://github.com/mysqljs/mysql#readme)
- [CORS](https://github.com/expressjs/cors#readme)
- [DotEnv](https://github.com/motdotla/dotenv#readme)
