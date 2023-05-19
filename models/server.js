const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //** Connect to database */
        this.database();

        //** Path for router */
        this.path = {
            product: '/api/product',
        }

        //** Middleware */
        this.middleware();

        //** Routes for application */
        this.routes();
    }

    async database() {
        await dbConnection()
    }

    middleware() {
        //** Cors */
        this.app.use(cors())

        //** Reading and parsing */
        this.app.use(express.json());

        //** Public directory */
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.product, require('../routes/product'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`SERVER LISTEN IN PORT`, this.port)
        })
    }
}

module.exports = Server