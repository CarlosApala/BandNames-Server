const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands=new Bands();
bands.addbands(new Band('rolling stone'))
bands.addbands(new Band('Queen'));
bands.addbands(new Band('scorpions'))
bands.addbands(new Band('metalica'))

console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });

    /* client.on('emitir-mensaje',(payload)=>{
        //client.broadcast.emit('nuevo-mensaje',payload);
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje',payload);
    }) */
    client.on('add-bands',(payload)=>{
        console.log(payload);
        bands.addbands(new Band(payload.name));
        io.emit('active-bands',bands.getBands());
    })

    client.on('vote-bands',(payload)=>{
        bands.voteBands(payload.id)
        io.emit('active-bands',bands.getBands());
    })

    client.on('delete-bands',(payload)=>{
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    })

});
