const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config();
const compiledContract = require('./build/ReputationControl.json');


//Construimos el nuevo provider que se engancha al nodo de la red Rinkeby de Infura
const provider = new HDWalletProvider(
  process.env.SEED_PHRASE, //Frase mneumónica
  process.env.INFURA_URL //Infura URL del nodo (en infura es proyecto, en mi caso Rinkeby API)
);

const web3 = new Web3(provider);

const deploy = async () => {
  
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledContract.abi)
    .deploy({ data: compiledContract.evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] });

//Necesitamos mostrarlo por pantalla para poder utilizar una copia del contrato en react
  console.log('Contract deployed to', result.options.address);
  
  try{
    const tx = await result.methods.newCompanies(["Telefonica","HP","BBVA","Deloitte","EY","KPMG","Movistar","MS","Santander","Westcon"]).send({
      gas: '10000000', from: accounts[0]
    });
  }catch(err){
    console.log(err.message);
  }
  
  provider.engine.stop();
};


deploy();
