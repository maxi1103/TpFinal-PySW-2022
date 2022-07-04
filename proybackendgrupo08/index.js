const express = require('express');
const app = express();
const cors = require('cors');
const {mongoose} = require('./database');
const Dependencia = require('./models/dependencia');
const Oficina= require('./models/oficina');
const Empleado = require('./models/empleado');
const Usuario = require('./models/usuario');

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
app.use('/api/notificacion',require('./routes/notificacion.route'));

//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));

//cargando archivos necsarios
var dependencias = Dependencia.find();
if(dependencias==null){
   const dependencia1= new Dependencia({
    nombre: 'Contable'
   });
   dependencia1.save();
   const dependencia2= new Dependencia({
    nombre: 'Personal'
   });
   dependencia2.save();
   const dependencia3= new Dependencia({
    nombre: 'Auditoria'
   });
   dependencia3.save();
}

var oficinas= Oficina.find();
if(oficinas==null){
    const oficina1= new Oficina({
        numero: 1,
        estado: 'disponible',
        capacidad: 25
    });
    oficina1.save();
    const oficina2= new Oficina({
        numero: 2,
        estado: 'disponible',
        capacidad: 40
    });
    oficina2.save();
    const oficina3= new Oficina({
        numero: 3,
        estado: 'disponible',
        capacidad: 100
    }); 
    oficina3.save();
}
var empleados =Empleado.find();
var usuarios= Usuario.find();

if(empleados==null && usuarios == null){
    const empleado= new Empleado({
        Apellido: 'admin',
        Legajo: 123,
        Nombre: 'admin',
        Email: 'admin@gmail.com'
    });
    empleado.save();

    empleados=Empleado.find();
    const usuario= new Usuario({
      usurname: 'admin',
      password: 'admin',
      perfil: 'Administrador',
      empleado: empleado._id
    });
}


});