const readline = require('readline')
const fs = require('fs')
const yargs = require('yargs')

const rl = readline.createInterface( {
    input : process.stdin ,
    output : process.stdout
})

const pedirDatos = (pregunta) => {
    return new Promise( (resolve) => {
        rl.question(pregunta , (respuesta ) => resolve(respuesta))
    } )
}


const main = async () => {
    try {
        const producto = await pedirDatos('Ingrese nombre del producto: ')
        const precio = await pedirDatos('Ingrese precio del producto: ')
        const cantidad = await pedirDatos('Ingrese la cantidad de unidades del producto: ')

        const datosUnidos = {
            nombre : producto,
            precio : parseFloat(precio),
            cantidad : parseInt(cantidad)
        }

        guardarProductos(datosUnidos)

        rl.close()

    } catch (error) {
        if(error) throw error
    }
}

main()


const argv = yargs
    .option('file', {
        alias: 'f',
        describe: 'Nombre del archivo donde se guardarán los productos',
        type: 'string',
        default: 'productos.json' 
    })
    .argv;


    function guardarProductos(producto) {
        const filename = argv.file;
    
        fs.readFile(filename, "utf-8", (error, data) => {
            let productos = [];
    
            // Validar si hay error al leer el archivo
            if (!error) {
                try {
                    // Intentar parsear el contenido del archivo JSON
                    productos = JSON.parse(data);
                } catch (parseError) {
                    console.error("Error al parsear el archivo JSON. El contenido podría estar vacío o malformado.");
                }
            }
    
            // Agregar el nuevo producto
            productos.push(producto);
    
            // Escribir nuevamente el archivo
            fs.writeFile(filename, JSON.stringify(productos, null, 2), (writeError) => {
                if (writeError) {
                    console.log("Error al escribir el archivo");
                    throw writeError;
                }
    
                console.log("El archivo se guardó correctamente");

                console.log("Mostrando archivo.... \n" + leerArchivo(filename))
            });
        });
    }
    



function leerArchivo (fileName) {

    fs.readFile(fileName , "utf-8" , (error , data ) => {

        if (error){
            console.log("Error leyendo el archvo")
            throw error
        }

        const productos = JSON.parse(data)

        console.log(productos)
    })
}