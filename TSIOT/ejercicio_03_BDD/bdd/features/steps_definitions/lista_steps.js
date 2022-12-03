const { defineParameterType,Given, When, Then} = require('@cucumber/cucumber');
const assert = require('chai').assert;
const Lista  = require("../../src/list.js");

let lista;
let deleteResponse;
let addResponse;
let keys;
let element;

defineParameterType({
    name: "boolean",
    regexp: /true|false/,
    transformer: (s) => s === "true" ? true : false
  });


Given('una nueva lista', function() {
    lista = new Lista();
});


Given('una lista vacia', function() {
    lista = new Lista();
});

Given('una lista con elementos', function (dataTable) {
    lista = new Lista();
    var elementos = Object.values(dataTable)[0][0];
    for(var j = 0; j < elementos.length; j++) {
        obj = JSON.parse(elementos[j]);
        var clave = Object.keys(obj)[0];
        var valor = Object.values(obj)[0];
        lista.add(clave, valor);
        
    }

  });



When('se agrega la pareja {}', function(pareja){
    obj = JSON.parse(pareja);
    var clave = Object.keys(obj)[0];
    var valor = Object.values(obj)[0];
    addResponse = lista.add(clave, valor);
});

When('borra la entrada con clave {string}',function(clave){
    deleteResponse =lista.delete(clave);

});

When('se obtengan todas las claves', function() {
    keys = lista.getKeys();
});

When('se busca la clave {string}', function(clave){
    element = lista.getValue(clave);
});


When('se actualiza la clave {string} con el valor {int}', function (clave, newValue) {
    lista.update(clave, newValue);
    element = lista.getValue(clave);

});


Then('la lista tiene {int} elemento(s)', function(count) {
    assert.equal(lista.count(), count);
});


Then('retornar {boolean}', function(boolean){
    assert.equal(deleteResponse, boolean);
   
});

Then('retornar {boolean} al insertar', function(boolean){
    assert.equal(addResponse, boolean);
   
});

Then('la lista esta ordenada |{string}|{string}}|', function (string, string2){
     assert.isTrue((keys[0]===string && keys[1]===string2));

    
});

Then('se obtiene el valor {boolean}', function (valor) {
    console.log('element'+element);
    assert.equal(element, valor);


});


Then('se obtiene el valor {int}', function (valor) {
    assert.equal(element, valor);
});
