const path = require('path'); //rutas de ficheros y carpetas
const solc = require('solc'); //compilador de solidity
const fs = require('fs-extra'); //manejar ficheros y carpetas

//Cogemos ruta de build. __dirname significa directorio actual
const buildPath = path.resolve(__dirname, 'build');

//En la libreria fs-extra tenemos esta funcion que elimina toda la carpeta
fs.removeSync(buildPath);

//Cogemos ruta del programa solidity
const programPath = path.resolve(__dirname,'contracts','ReputationControlV2.sol');

//Leemos el contenido del programa 
const source = fs.readFileSync(programPath,'utf8');


//Necesario para compilar
const input = {
    language: 'Solidity',
    sources: {
      'ReputationControlV2.sol': {
        content: source
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
};

function findImports(relativePath) {
  //my imported sources are stored under the node_modules folder!
  const absolutePath = path.resolve(__dirname, 'node_modules', relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  return { contents: source };
}

//Compilamos ambos contratos
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })).contracts['ReputationControlV2.sol'];

//Creamos de nuevo carpeta build. La crea si no existe dicha carpeta
fs.ensureDirSync(buildPath);

//output es un diccionario de contratos compilados. La clave es el nombre del contrato. 
for (let contract in output) {
    //Escribimos un JSON en el path que le mandamos con nombre contract.json
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}
