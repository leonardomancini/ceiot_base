var express = require('express');
var routerMedicion = express.Router();
var pool = require('../../mysql');
var jwtValidator = require('../../middleware/auth');

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
routerMedicion.post('', jwtValidator, function(req, res) {
    let query = 'Select * from Dispositivos d  WHERE d.dispositivoId = ? AND d.deleted = false'
        pool.query(query, [req.body.dispositivoId], function(err, result, fields) {
                if (err) {
                    res.send(err).status(400);
                    return;
                } else {
                    if(result.length == 0) {
                        res.status(400).send({code:'DEVICE_NOT_FOUND', message:'device not found',rows:result });
                        return;
                    }
                }
                pool.query('Insert into Mediciones (fecha,valor,dispositivoId) values (?,?,?)', [req.body.fecha, req.body.valor, req.body.dispositivoId], function(err, result, fields) {
                    if (err) {
                        res.send(err).status(400);
                        return;
                    }
                    res.send(result);
                });
            });
    
  
});

module.exports = routerMedicion;