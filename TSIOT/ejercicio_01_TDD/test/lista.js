const assert = require("chai").assert;
const Lista = require("../src/lista.js");

    describe(" En una lista vacia hay cero elementos almacenados", function() {
        var lista = new Lista();

        it("hay cero elementos", function() {
            assert.equal(lista.count(), 0);
        });
    });

    describe(" En una lista vacia, agrego un elemento y hay 1 elemento almacenado", function() {
        var lista = new Lista();
        lista.add("clave","valor");
        
        it("hay un elemento", function() {
            assert.equal(lista.count(), 1);
        });



    });

    describe(" En lista vacia agrego dos elementos y hay 2 elementos almacenados ", function() {
        var lista = new Lista();
        lista.add("clave","valor");
        lista.add("clave2","valor2");
        
        it("hay un elemento", function() {
            assert.equal(lista.count(), 2);
        });
    });

    describe(" En lista con elementos si trato de insertar una clave duplicada da error  y la cantidad de elementos no cambi", function() {
        var lista = new Lista();
        lista.add("clave","valor");
        
        


        it("hay un elemento", function() {
            lista.add("clave","valor2");
            assert.equal(lista.count(), 1);
        });

    });

    describe("cuando se agregan claves que no son string", function() {
        var lista = new Lista();
        var resultado = lista.add(1, 1);
        
        it("retorna un error", function() {
               assert.isFalse(resultado);
            });
            assert.equal(lista.count(), 0);
    });

    describe("cuando se agregan claves vacias", function() {
        var lista = new Lista();
        var resultado = lista.add("", 1);
        
         it("retorna un error", function() {
               assert.isFalse(resultado);
           });
           assert.equal(lista.count(), 0);
    });

    describe("cuando se busca una clave inexistente", function() {
        var lista = new Lista();
        
        it("retorna false como resultado de la operación", function() {
                assert.isFalse(lista.exists("clave"));
            });
    });

    describe("Cargar una clave con un valor conocido, consultar el valor asociado a la clave y ver en que coinciden", function(){
        var lista = new Lista();
        lista.add("clave1","valor1");

         it("Encuentra el valor insertado", function() {
                assert.equal("valor1",lista.getValue("clave1"));
        });

     });

    describe("Buscar una clave que no existe y comprobar el error.", function(){
        var lista = new Lista();
        lista.add("key1", "value1");

        it("No existe la clave a buscar", function(){
                assert.isFalse(lista.exists("key2"));
         });

    });

       

    describe(" En una lista con tres o mas elementos", function(){
        var lista = new Lista();

        lista.add("key1", "value1");
        lista.add("key2", "value2");
        lista.add("key3", "value3");
        lista.add("key4", "value4");

        it("Buscar valor de la primera clave y comprobar que coinciden", function(){
            assert.equal("value1",lista.getValue("key1"));
        });

        it("Buscar valor de la ultima clave y comprobar que coinciden", function(){
            assert.equal("value4", lista.getValue("key4"));
        });

        it("Buscar valor de una clave intermdia y comprobar que coinciden", function(){
            assert.equal("value2", lista.getValue("key2"));
        });

    });

    describe("En una lista con elementos, comprobar el error al tratar de actualizar una clave que no existe", function() {
        var lista = new Lista();

        lista.add("key1", "value1");
        lista.add("key2", "value2");
        lista.add("key3", "value3");
        lista.add("key4", "value4");

        it("Error al intentar actualizar valor inexistente", function(){
            assert.isFalse(lista.update("key5", "newValue"));
        });

    });

    describe(" En una lista con tres o mas elementos", function(){
        var lista = new Lista();

        lista.add("key1", "value1");
        lista.add("key2", "value2");
        lista.add("key3", "value3");
        lista.add("key4", "value4");

        it("Actualizar el valor de la primera clave, consultar el valor de la primera clave y comprobar que se actualizo", function(){
            lista.update("key1","newValue1")
            assert.equal("newValue1",lista.find("key1").value);
        });

        it("Actualizar el valor de la ultima clave, consultar el valor  y comprobar que se actualizo", function(){
            lista.update("key4","newValue4")
            assert.equal("newValue4",lista.find("key4").value);
        });

        it("Actualizar el valor de una clave intermedia, consultar el valor  y comprobar que se actualizo", function(){
            lista.update("key2","newValue2")
            assert.equal("newValue2",lista.find("key2").value);
        });

    });


    describe(" En una lista con tres o mas elementos, obtener ordenados los valores", function(){
        var lista = new Lista();

        lista.add("key1", "value1");
        lista.add("key2", "value2");
        lista.add("key7", "value3");
        lista.add("key8", "value4");

        it("Agregar una clave menor que todas las existentes, comprobar que la lista de claves se obtiene siempre ordenada", function(){
            lista.add("key0", "value1");
            var keys = lista.getKeys();

            assert.equal(keys[0], "key0");
            assert.equal(keys[1], "key1");
            assert.equal(keys[2], "key2");
            assert.equal(keys[3], "key7");
            assert.equal(keys[4], "key8");
        }); 

        it("Actualizar el valor de la ultima clave, consultar el valor  y comprobar que se actualizo", function(){
            lista.add("key9", "value1");
            var keys = lista.getKeys();

            assert.equal(keys[0], "key0");
            assert.equal(keys[1], "key1");
            assert.equal(keys[2], "key2");
            assert.equal(keys[3], "key7");
            assert.equal(keys[4], "key8");
            assert.equal(keys[5], "key9");
        });

        it("Actualizar el valor de una clave intermedia, consultar el valor  y comprobar que se actualizo", function(){
            lista.add("key5", "value1");
            var keys = lista.getKeys();


            assert.equal(keys[0], "key0");
            assert.equal(keys[1], "key1");
            assert.equal(keys[2], "key2");
            assert.equal(keys[3], "key5");
            assert.equal(keys[4], "key7");
            assert.equal(keys[5], "key8");
            assert.equal(keys[6], "key9");

        });

    });


    describe("En una lista con elementos, borrar una clave y comprobar que al buscarla no existe", function() {
        var lista = new Lista();
        lista.add("key1", "value1");
        lista.add("key2", "value2");

        it("Borrar un elemento y comprobar que no este mas en la lista", function(){
            lista.delete("key1");
            assert.isFalse(lista.find("key1"));

        });

    });

    describe("En una lista con elementos, comprobar el error al borrar una clave que no existe", function() {
        var lista = new Lista();
        lista.add("key1", "value1");
        lista.add("key2", "value2");

        it("Borrar un elemento y comprobar que no este mas en la lista", function(){
            assert.isFalse(lista.delete("key3"));

        });

    });

    describe("En una lista vacia, comprobar el error al borrar una clave", function() {
        var lista = new Lista();
       

        it("Borrar un elemento y comprobar que no este mas en la lista", function(){
            assert.isFalse(lista.delete("key3"));

        });
    });


    