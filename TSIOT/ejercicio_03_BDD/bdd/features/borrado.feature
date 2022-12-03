# language: es
# encoding: utf-8

Característica: Borrado

Escenario: Borrar un elemento existente
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|
    Cuando borra la entrada con clave "uno"
    Entonces retornar true
Escenario: Borrar un elemento inexistente
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|
    Cuando borra la entrada con clave "tres"
    Entonces retornar false