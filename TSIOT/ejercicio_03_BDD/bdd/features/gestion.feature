# language: es
# encoding: utf-8

Característica: Altas

Escenario: Crear lista nueva
    Dada una nueva lista
    Entonces la lista tiene 0 elementos

Escenario: Agregar un nuevo elemento a la lista vacia
    Dada una lista vacia
    Cuando se agrega la pareja {"uno":1}
    Entonces la lista tiene 1 elemento

Escenario: Agregar un elemento con clave existente
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|
    Cuando se agrega la pareja {"uno":1}
    Entonces retornar false al insertar
    Y la lista tiene 2 elementos

