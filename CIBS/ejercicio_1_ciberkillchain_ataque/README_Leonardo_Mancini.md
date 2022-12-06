# Ejercicio CiberKillChain - Ataque

Haga una copia de este documto

## Alumno

Leonardo Mancini

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para mi trabajo final "Alarma para detección de CO en el hogar"


## Datos trabajo práctico

El trabajo practico consiste en una alarma sensora de presencia de CO que estará conectada a Internet mediante Wi-Fi. El objetivo de la alarma es sensar peridicamente el nivel de CO y en caso de superarse el umbar de peligro se enviará un evento de alerta al servidor cloud. 
También cuenta con un módulo GSM con una SIM para enviar a contactos asociados un mensaje de alerta. La alarma puede ser configurada mediante una aplicación móvil que funciona en ANdroid y Ios. El cliente, luego de adquirir el producto, es dado de alta en el sistema para que pueda ser monitoreado, ya que la empresa al recibir un evento de alarama envia alguien al hogar para ver la situacion y proceder al auxilio.

Diagrama del sistema:

![](./images/trabajo_final.png)

## Resolución

### Reconnaissance

#### 
Se puede buscar en los sitios de la empresa los nombres de posibles empleados y buscar sus datos mediante redes sociales como linkedin.
#### 
Visitar redes sociales y los stores de la app para encontrar nombres, mails, de clientes a los cuales luego enviarles un mail con phishing
####
Si bien el hardware es sensillo, se puede adquirir el producto para probarlo un tiempo y realizar ingeniería inversa del mismo. Una vez adquirido se puede utilizar el puerto JTAG o soldar uno para recuperar el firmware y encontrar que certificado de seguridad utiliza y a que servidor se conecta.
En este caso se descubre que utiliza comunicación MQTT que se conecta a un servidor de google. Además se descubre que el frimware del dispositivo se puede acatualizar mediante OTA.
####
Enviar mail a la empresa solicitando información para de este modo obtener el templates utilizado en los mails.
####
Buscar en google algún manual o documentos que hay quedado accesibles al publico, aunque esten obsoletos igualmente pueden servir.
####
Realizar garbaging para buscar en la basura de la empresa cualquier documento o credenciales que permitan un ataque de fuerza bruta.

### Weaponization

####
Redactar mails falsos para realizar phshing a clientes y empleados. Para los cliente redactar un mail con el template correcto que tenga un link similar al sitio de la empresa invitando a cambiar de contraseña.
Para el caso de los empleados enviar mails falsos de propuestas laborales para conocer mas del producto. Luego con esa información enviar mail de phighin solictando acceso a la nube de desarrollo (en este caso AWS)
Utilizar analizadores de trafico como wireshark para sniffear el trafico de la alarma hacia la nube para luego con una herramienta como burp generar trafico falso.
Desarrollar una copia del firmware que, utilizando el certificado correcto, envíe información falsa a los servidores y ademas permita acceder remotamente al dispositivo. Esto último se podría realizar instalando un broker mqtt propio y que el dispostivo se suscriba ahí.

### Delivery
Enviar en forma masiva los mails diseñados en el paso anterior con el link de phihing para lograr obtener acceso a cuentas de clientes o de desarrolladores del producto.
Enviar mediante OTA la nueva version del firmware del dispositivo falso.

### Exploit
Cuando cada dispositivo descargue la nueva versión de firmware.

### Installation
Mediante OTA se instalará la nueva versión del firmware corrupto.

### Command & Control
-Aplicación del cliente:
    - El atacante se agrega a si mismo como contacto para recibir notificaciones de eventos
    - Se instala la aplicación y accede con las credenciales del cliente afectado.
-Dispoitivo de CO
    - El atacante accede a cada uno de los dispositivos mediante la puerta trasera instalada.

### Actions on Objectives
El atacante puede generar falsos eventos de alarma, eliminar contactos, puede saturar el sistema enviando alarmas falsos de clientes falsos todo esto para generar una mala imagen de la empresa. 
Por último al ser un producto del que depende la vida humana se corre el riesgo de perdidad muy valiosas.


