const express = require('express');
const app = express();
const cors = require('cors');
const {mongoose} = require('./database');

const bodyparser = require('body-parser');

//para correo
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/empleado', require('./routes/empleado.route.js'));
app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/dependencia', require('./routes/dependencia.route'));
app.use('/api/reunion/',require('./routes/reunion.route'));
app.use('/api/oficina/',require('./routes/oficina.route'));
app.use('/api/recurso/',require('./routes/recurso.route'));
app.use('/api/correo', require('./routes/correo.route'));

//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});