# Next.js Telo Shop
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d, significa __detached__

## ATENCION
Ante instalacion de paquetes nuevos de npm, es recomendable hace un backup del package.json para tener la version de los paquetes mas compatibles, ya que esta version del carrito de compras es legacy y actualizar versiones dispares de los diferentes paquetes causa conflictos para hacer un build de la aplicacion.


## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```#   t e s l o a p p - n e x t 1 2  
 