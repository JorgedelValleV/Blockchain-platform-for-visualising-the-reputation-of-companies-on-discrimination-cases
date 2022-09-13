// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <= 0.8.10;
pragma experimental ABIEncoderV2;

contract ReputationControl {
  
    //Informacion de denuncias
    struct complaint {
        string user;
        string text;
        string dateC;
        string typeC;
        string gender;
        string relation;
        bool consent;
    }

    //Informacion de la empresa -> denuncias + reputacion
    //La reputacion seria 100 - nºdenuncias recibidas
    struct companyData{
        uint reputation;
        bool participating;
        complaint[] complaints;
    }

    //Nombres de las empresas que se pueden denunciar para poder iterar en el mapping
    string[] private companies = new string[](0);

    //Mapping que devuelve los datos de las denuncias referentes a una empresa
    mapping(string => companyData) private companyMapping;

    //Dueños del sistema
    address immutable owner;

    modifier isNotCompany(string memory c_name){
        require(!companyMapping[c_name].participating, "This company doesn't exist in the system");
        _;
    }

    modifier isCompany(string memory c_name){
        require(companyMapping[c_name].participating, "This company doesn't exist in the system");
        _;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "No allowances");
        _;
    }

    //Se inicializa la reputacion
    constructor(string[] memory _companies) {
        companies = _companies;
        owner = msg.sender;
        for(uint i = 0; i < companies.length ; i++){ //Damos valor inicia
            companyMapping[companies[i]].reputation = 100;
            companyMapping[companies[i]].participating = true;
        }
    }
  
    //Function para devolver las empresas
    function getCompanies() external view returns (string[] memory){
        return companies;
    }

    //Funcion para devolver los datos de la empresa: Denuncias, futuras metricas
    function getComplaints(string memory c_name) external view returns (complaint[] memory) {
        return companyMapping[c_name].complaints;
    }

    //Funcion para anadir empresas <----- Chequear
    function newCompany(string memory c_name) external isNotCompany(c_name) onlyOwner{
        companies.push(c_name);
        companyMapping[c_name].reputation = 100;
        companyMapping[c_name].participating = true;
    }

    //Funcion para obtener todas las reputaciones
    function getAllReputations() external view returns (uint[] memory) {
        uint[] memory reputations = new uint[](companies.length);
        for(uint i=0; i< companies.length; i++){
            reputations[i] = (companyMapping[companies[i]].reputation);
        }
        return reputations;
    }

    function getReputations(string[] memory c_names) external view returns (uint[] memory){
        uint[] memory reputations = new uint[](c_names.length);
        for(uint i=0; i< c_names.length; i++){
            if(companyMapping[c_names[i]].participating)
                reputations[i] = (companyMapping[c_names[i]].reputation);
            else reputations[i] = 101; //Valor no válido, captar en front-end
        }
        return reputations;
    }

    //Funcion para insertar denuncia
    function newComplaint(string memory c_name, string memory u_name, string memory _text, string memory _date, string memory _type, string memory _gender, string memory _relation, bool _consent) external isCompany(c_name) onlyOwner{
        companyMapping[c_name].complaints.push(complaint(u_name, _text, _date, _type, _gender, _relation, _consent));
        uint ret = companyMapping[c_name].reputation;
        if(ret > 0) companyMapping[c_name].reputation -= 1; //0-1 en uint da un valor positivo enorme, no -1.
    }
}