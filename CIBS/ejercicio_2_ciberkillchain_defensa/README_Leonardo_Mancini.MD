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
-Aplicación del cliente:
    -Agregar en la aplicación 2FA e informar al mail del cliente cada vez que se inicie una sesión nueva, al igual que cualquier cambio que se realice.
-Dispoitivo de CO
    - Al usar TLS sobre MQTT no se podría generar trafico fraudulento hacia el broker
-Cloud
    - Agregar lista de control de acceso (ACL) de nivel MQTT. La ACL limita qué dispositivos podrán conectarse al servidor MQTT. La ACL también     controla qué temas puede publicar y suscribirse un determinado par de nombre de usuario / contraseña, lo que brinda mayor seguridad.
    Habilitar unicamente los puertos 8883 y 443.

### Installation
Es posible firmar el firmware digitalmente antes de una actualización OTA para asegurarse de que procede de una fuente de confianza y no se ha manipulado. El Agente de OTA, que se ejecuta en sus dispositivos, realiza comprobaciones de integridad en el firmware cuando llega al dispositivo.

### Exploit
El servicio OTA Update Manager se basa en los mecanismos de seguridad existentes, como la autenticación mutua de Transport Layer Security (TLS), que utiliza AWS IoT. El tráfico de actualización OTA pasa a través de la puerta de enlace del dispositivo de AWS IoT y utiliza mecanismos de seguridad de AWS IoT.


### Delivery
- Utilizar técnicas de OTA seguro como por ejemplo técnicas de integridad.
- No se puede controlar las cuentas de mails que envían phishing pero se podría:
    - Para los empleados enviar a spam cualquier mail de origen desconocido.
    - Que los empleados reporten si llega algun mail con posible phishing (depende de la capacitación)
    - Para los clientes y usuarios en general no se podrá evitar esto, solo con campañas de concientización.


### Weaponization

####
Encriptar mediante HTTPS todos los endpoints de la apicación. También usar MQTTS para la comunicación entre el dispositivo y la nube. 
Actualizar periodicamente los certificados de seguridad que utiliza el dispositivo para identificarse contra el broker MQTT de AWS.
Agregar secure boot en el dispositivo para evitar actualizaciones fraudulentas mediante OTA.

### Reconnaissance

#### 
Realizar una campaña de prevención de phing enviando mails periodicamente a los distintos clientes, explicando y recomendando como evitar caer en este tipo de fraude.
#### 
Realizar capacitación en seguridad para todos los empleados de la empresa. Además periodicamente se podrían enviar mails fraudulentos en forma controlada para poderauditar el comportamiento de los empleados.
####
Encriptar el código del firmware para que no se pueda leer en caso de intentar hacer ingeniería inversa.
####
Tener una politica de eliminación segura de documentos y hardware que se podría usar para obtener información.



