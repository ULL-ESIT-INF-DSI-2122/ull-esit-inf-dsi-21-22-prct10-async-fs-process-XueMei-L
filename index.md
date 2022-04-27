# Práctica 10 - Sistema de ficheros y creación de procesos en Node.js
```
Autora: Xue Mei Lin
Curso: 2021- 2022
Universidad: Universidad de La laguna
Asignatura: Desarrollo de Sistemas Informaticos
Herramienta: Visual Studio Code
Lenguaje de programción: TypeScipt
```
## 1. Introducción

Hemos aprendido en esta practica  como hacer una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node y js para actuar el sistema de ficheros.

## 2. Objetivos

## 3. Ejercicios realizados
### 3.1 Ejercicio 1

En este ejercicio, lo que vamos a hacer es lo siguiente. Por un lado se realiza una traza de ejercicio respecto al siguiente programa, mostrará cada iteración sobre el contenido de la pila de llamadas, el registro de eventos de la API, la cola de manejadores de Node.js y la información que muestra por la consola.

```
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```



**La traza de ejecución es lo siguiente:**


> En el inicio, todos están en un estado vació: 
>
> - Pila de llamadas: nada
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: nada

> En la 1 iteración, main entra a la pila de llamadas para empezar a funcionar
>
> - Pila de llamadas: main
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: nada

> En la 2 iteración, es la comprobación del fichero, atraves de la constante F_OK, y la función de access entra a la pila de llamada: 
>
> - Pila de llamadas: access, main
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: nada

> En la 3 iteración, como access no es un elemento de JavaScript, por lo tanto, pasa a ser un registro de eventos: 
>
> - Pila de llamadas: main
> - Registro de eventos: access
> - Cola de manejadores: nada
> - Consola: nada


> En la 4 iteración, el manejador de access pasa a la cola de manejadores, asimismo, access sale de Registro de eventos
>
> - Pila de llamadas: main
> - Registro de eventos: nada
> - Cola de manejadores: manejador access
> - Consola: nada

> En la 5 iteración, el manejador access pasa a la pila de llamadas, puesto que es el primer de la cola de manejadores
>
> - Pila de llamadas: manejador access
>
> - Registro de eventos: nada
>
> - Cola de manejadores: nada
>
> - Consola: nada

>   En la 6 iteración, se ejecuta el manejador access, y ejecuta también el primer console.log(File ${filename} does not exist);
>
>   - Pila de llamadas: manejador access, console.log(Starting to watch file ${filename})
>   - Registro de eventos: nada
>   - Cola de manejadores: nada
>   - Consola: nada

>   - En la 7 iteración, es la ejecucuion del console.log, mostrará mensaje por la pantalla: 
>   - Pila de llamadas: manejador access
>   - Registro de eventos: nada
>   - Cola de manejadores: nada
>   - Consola: Starting to watch file helloworld.txt

> En 8 iteración, entra const watcher = watch(process.argv[2]) a la pila de llamadas: 
> - Pila de llamadas: what(process,argv[2]) manejador access
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

> En la 9 iteración, como watch tampoco es un elemento de JavaScript, entonces pasa a ser un resgitro de eventos: 
> - Pila de llamadas: manejador access
> - Registro de eventos: watch(process.argv[2])
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

> En la 10 iteración, watch() sale del registro de eventos: 
>
> - Pila de llamadas: manejador access
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

> En la 11 iteración, watcher.on("change") pasa a la pila de llamadas: 
> - Pila de llamadas:  wtach.on("change") manejador access
> - Registro de eventos: nada
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

> En la 12 iteración, watcher pasa al registros de eventos, con el mismo motivo que antes(no pertenece a JavaScript): 
>
> - Pila de llamadas: manejador access
> - Registro de eventos: watcher.on("change")
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

>  En la 13 iteración, watcher.on sigue en la ejercución, y console.log pasa a la pila de llamadas: 
>
> - Pila de llamadas:  console.log(File ${filename} is no longer watched); manejador access 
> - Registro de eventos: watcher.on("change")
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt

> En la 14 iteración, se ejecuta el console.log(File ${filename} is no longer watched);
> - Pila de llamadas:  manejador access
> - Registro de eventos: watcher.on("change")
> - Cola de manejadores: nada
> - Consola: Starting to watch file helloworld.txt File helloworld.txt is no longer watched

>  En la 15 iteración, el manejador access sale de la pila, y la pila se cuentra en un estado vacío, el programa espera que realiza algún cambio sobre el fichero introducido: 
>
> - Pila de llamadas:  nada
>
> - Registro de eventos: watcher.on("change")
>
> - Cola de manejadores: console.log(File ${filename} has been modified somehow);
>
> - Consola: Starting to watch file helloworld.txt File helloworld.txt is no longer watched

>  En la 16 iteración, lo que está en la cola de manejadroes pasa a la pila  y realiza su ejercucion: 
>
> - Pila de llamadas:  console.log(File ${filename} has been modified somehow);
>
> - Registro de eventos: watcher.on("change")
>
> - Cola de manejadores: nada
>
> - Consola: Starting to watch file helloworld.txt File helloworld.txt is no longer watched

>  En la 17 iteración ejecuta el console.log y mostrando el mensaje por la pantalla: 
>
>  - Pila de llamadas:  nada
>
>  - Registro de eventos: watcher.on("change")
>
>  - Cola de manejadores: nada
>
>  - Consola: Starting to watch file helloworld.txt File helloworld.txt is no longer watched 
>
>   ​                       console.log(File ${filename} has been modified somehow);

>  En la 18 iteración, si modificamos otra vez el fichero, se repite el mismo que lo las iteraciones anteriores: 
>  - Pila de llamadas:  nada
>
>  - Registro de eventos: watcher.on("change")
>
>  - Cola de manejadores: nada
>
>  - Consola: Starting to watch file helloworld.txt File helloworld.txt is no longer watched 
>
>    ​                console.log(File ${filename} has been modified somehow); 
>
>    ​                console.log(File ${filename} has been modified somehow);
>
>  En la ultima iteración, se cerra el programa, todos los elementos salen de registro de eventos.



**El resultado final es lo siguiente:**

![image-20210503003136032](C:\Users\linyouzi\AppData\Roaming\Typora\typora-user-images\image-20210503003136032.png)

### 3.2 Ejercicio 2

En esta ejercicio creamos una aplicación que divide  información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto y  la ruta debe ser  un parámetro pasado a la aplicación  desde la línea de comando. Y si queremos  visualizar el número de líneas, palabras, caracteres o combinaciones de ellas, tenemos que  hacer uso de [`yargs`](https://www.npmjs.com/package/yargs).

> En el ejercicio del anterior podemos  hacer en dos maneras: 
> - Haciendo uso del método `pipe` de un `Stream` para poder redirigir la salida de un comando hacia otro.
> - Sin hacer uso del método `pipe`, tenemos que  creando los subprocesos necesarios y registrando a la funcionalidad solicitada.



### 3.3 Ejercicio 3 ###

En este ejercicio que hemos visto en la practica 8 ,cómo almacenar  y gestionar de una nota ,que podemos hacer con el uso de `yargs`. Para controlar los cambios del  desarrollo  sobre el directorio  tenemos que especificar en el  mismo tiempo al usuario interactúa con la aplicación de procesamiento de notas. Utilizamos la función de `watch` y no la función `watchFile`,y la función `watch` devuelve un objeto `Watcher`, que también es un objeto `EventEmitter`. 



### 3.4 Ejercicio 4  ###

En esta ejercicio tenemos que hacer  una aplicación que permita hacer de **wrapper** de los distintos comandos empleados en Linux para el manejo de ficheros y directorios, En la aplicación debe permite en siguientes acciones  : 

 1-  una ruta concreta, mostrar si es un directorio o un fichero.

2- Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.

3- listar los ficheros dentro de un directorio.

4- Mostrar el contenido de un fichero (similar a ejecutar el comando `cat`).

5- Borrar ficheros y directorios.

6- Mover y copiar ficheros y/o directorios de una ruta a otra.



## 4. Conclusiones

En esta practica hemos aprendido muchas cosas como por ejemplo: cómo manejar los ficheros, la utilización sobre el método de  `pipe` de un `Stream`.

## 5. Bibliografía

> - [El comportamiento del bucle de eventos de Node.js](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

## 5. Resultados
![testingadd](img/add.png)
![testingremove](img/remove.png)
![testingmodify](img/modify.png)


## 6. Testing
![testing](img/Testing.png)


## 5. Bibliografía
- [Apuntes de la clases](https://ull-esit-inf-dsi-2122.github.io/typescript-theory/)
- [Guión de la práctica](https://ull-esit-inf-dsi-2122.github.io/prct07-music-dataModel/)
- [Inquirer.js](https://www.npmjs.com/package/inquirer)
- [Lowdb](https://www.npmjs.com/package/lowdb)
- [Coveralls](https://coveralls.io/)
- [SounarCould](https://sonarcloud.io/)
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)

