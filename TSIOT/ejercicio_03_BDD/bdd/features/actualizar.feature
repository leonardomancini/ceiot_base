# language: es
# encoding: utf-8

Característica: Actualizar
    Esquema del escenario: Lista con varios elementos
    Dada una lista con elementos
    |{"uno":1}|{"dos":2}|{"tres":3}|{"cuatro":4}|
    Cuando se actualiza la clave <clave> con el valor <nuevoValor>
    Entonces se obtiene el valor <valor>
    Ejemplos:
    | clave | nuevoValor|valor|
    |"uno"|11|11|
    |"dos"|22|22|
    |"tres"|33|33|
    |"cuatro"|44|44|
    |"5"|5|false|