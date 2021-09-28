const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{ 

    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar', 
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',

        }

        // Conectar a Base de Datos
        this.conectarDB();
        
        // Middlewares
        this.middleware();

        // Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middleware(){
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'))

    }

    routes(){ // iran las rutas

        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.buscar,     require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos,  require('../routes/productos'));
        this.app.use(this.paths.usuarios,   require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;


