# language: es
# encoding: utf-8

Característica: Busqueda
    Escenario: Buscar claves ordenadas
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|
    Cuando se obtengan todas las claves
    Entonces la lista esta ordenada |"dos"|"uno"}|

    Esquema del escenario: Lista con varios elementos
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|{"tres":3}|{"cuatro":4}|
    Cuando se busca la clave <clave>
    Entonces se obtiene el valor <valor>
    Ejemplos:
    | clave | valor|
    |"uno"|1|
    |"dos"|2|
    |"tres"|3|
    |"cuatro"|4|
    |"5"|false|

   