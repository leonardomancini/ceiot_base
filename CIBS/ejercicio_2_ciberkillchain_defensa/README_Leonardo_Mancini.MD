# Ejercicio CiberKillChain - Defensa

Haga una copia de este documto

## Alumno

Leonardo Mancini

## Enunciado

Desarrollar la defensa en función del ataque planteado en el ejercicio 1. Se plantean en orden inverso.



## Resolución

### Actions on Objectives
Auditar clientes que estén enviando información falsa. En ese caso darlos de baja temporalmente para ver cual ha sido el problema de seguridad y evitar que se propague.
Atender todas las alarmas por mas que sean falsas dandole prioridad a la vida humana.


### Command & Control
-Dispoitivo de CO
    - Al usar TLS sobre MQTT no se podría generar trafico fraudulento hacia el broker
-Cloud
    - Agregar lista de control de acceso (ACL) de nivel MQTT. La ACL limita qué dispositivos podrán conectarse al servidor MQTT. La ACL también     controla qué temas puede publicar y suscribirse un determinado par de nombre de usuario / contraseña, lo que brinda mayor seguridad.
    Habilitar unicamente los puertos 8883 y 443.

### Installation
Es posible firmar el firmware digitalmente antes de una actualización OTA para asegurarse de que procede de una fuente de confianza y no se ha manipulado. El Agente de OTA, que se ejecuta en sus dispositivos, realiza comprobaciones de integridad en el firmware cuando llega al dispositivo.

### Exploit
AWS cuenta con el servicio OTA Update Manager el cual se basa en los mecanismos de seguridad existentes, como la autenticación mutua de Transport Layer Security (TLS). El tráfico de actualización OTA pasa a través de la puerta de enlace del dispositivo de AWS IoT y utiliza mecanismos de seguridad de AWS IoT.


### Delivery
- Utilizar técnicas de OTA seguro como por ejemplo técnicas de integridad mediante firma digital.
-

### Weaponization

####
Encriptar mediante HTTPS todos los endpoints de la apicación. También usar MQTTS para la comunicación entre el dispositivo y la nube. 
Actualizar periodicamente los certificados de seguridad que utiliza el dispositivo para identificarse contra el broker MQTT de AWS.
Agregar secure boot en el dispositivo para evitar actualizaciones fraudulentas mediante OTA.

### Reconnaissance


####
Encriptar el código del firmware para que no se pueda leer en caso de intentar hacer ingeniería inversa.




