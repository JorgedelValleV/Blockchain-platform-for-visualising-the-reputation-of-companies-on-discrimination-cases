# TFGI-Plataforma-blockchain-para-visualizar-la-reputacion-de-empresas-sobre-casos-de-discriminacion
TFG de la Facultad de Informática de la UCM - Curso 2021-2022

Plataforma (**Dapp**) open source construida mediante una arquitectura **híbrida** (elementos descentralizados y centralizados) que permite realizar denuncias a empresas sobre casos de discriminación así como observar su reputación.

# Estudiantes
* Javier Verde Marín
* Jorge del Valle Vázquez
* Alejandro Ramírez Rodríguez
* Ana Belén Duarte León
* María de los Ángeles Plaza Gutiérrez
* David Seijas Pérez

# Licencias
|  Tipo                                                    | Fichero               |
|----------------------------------------------------------|-----------------------|
|   Licencia del proyecto                                  | LICENSE               |
|   Licencias software de terceros y atribución            | ThirdPartyNotices     |
|   Licencia software de terceros y atribución (plantilla) | /cliente/LICENSE.MIT  |


# Tags
![](https://img.shields.io/badge/-React-61DAFB) ![](https://img.shields.io/badge/Material_UI-007FFF) ![](https://img.shields.io/badge/Semantic_UI-35BDB2)
![](https://img.shields.io/badge/Blockchain-grey) ![](https://img.shields.io/badge/-Smart_Contract-orange) ![](https://img.shields.io/badge/Ethereum-3C3C3D) ![](https://img.shields.io/badge/IPFS-65C2CB)  ![](https://img.shields.io/badge/Tokens-C2A633) ![](https://img.shields.io/badge/-Nginx-009639) ![](https://img.shields.io/badge/-Docker-2496ED) ![](https://img.shields.io/badge/-Node.js-339933) ![](https://img.shields.io/badge/MongoDB-47A248) ![](https://img.shields.io/badge/Express.js-000000)

# Requerimientos

Para poder ejecutar este proyecto es necesario disponer de:
  * Node.js
  * Python 3 junto con bs4, requests y pymongo.
  * Docker (Linux) o Docker Desktop (Windows/MAC).
  * Metamask u otro wallet.

# Instalación y ejecución del proyecto

A causa de que las credenciales son personales, no se han incluido los ficheros **.env** que  las contienen. Debido a esto, no es posible la ejecución por parte de usuarios no atutorizados. De estar en posesión de estos solo sería necesario:

  1. Descargar el contenido de este repositorio.
  2. (Iniciar back-end) Abrir una terminal  en la carpeta del proyecto y realizar una de las siguientes opciones:
     * Realizar: cd server, npm install (el cuál descargará las dependencias mediante el package.json) y npm start.
     * En caso de tener docker, realizar docker-compose up, el cuál levantará 3 servidores y un balanceador de carga con todas sus dependencias.
  3. (Iniciar front-end) Abrir otra terminal en la carpeta del proyecto y ejecutar los siguientes comandos: cd cliente, npm install  y finalmente npm start.
 
 # ⚠️ Aviso

El proyecto se ejecuta en local y se utilizan redes de prueba; nunca se envía a producción ya que esto se encuentra fuera de la finalidad del TFG. Ninguna de las denuncias realizadas en la aplicación son reales y su único propósito ha sido el de probar funcionalidades y poblar la aplicación con datos de forma que se pueda comprobar el correcto funcionamiento de esta.
