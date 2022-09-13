// SPDX-License-Identifier: CC0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ReksTokens is ERC20{

    address immutable owner;
    modifier onlyOwner{
        require(msg.sender == owner, "No permission");
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public onlyOwner{
        _mint(to,amount);
    }

    function burn(address to, uint256 amount) public onlyOwner{
        _burn(to,amount);
    }

    function transfer(address to, uint256 amount) public override onlyOwner returns (bool) {
        address _owner = _msgSender();
        _transfer(_owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

}

contract ReputationControl {

    struct CompanyData{
        address _address;
        //Posicion de la denuncia en el array (+1). Se utiliza para eliminar la denuncia
        uint pos;
        mapping(string => uint) posArray; 
        string[] hashComplaints;
    }

    ReksTokens tokenContract;
    mapping(string => CompanyData) infoCompanies;
    string[] companies;
    address immutable owner;
    string amountDonated;

     modifier onlyOwner{
        require(msg.sender == owner,"No allowances");
        _;
    }

    modifier isCompany(string memory _company){
        require(infoCompanies[_company]._address != address(0), "Not detected as a participant in our system");
        _;
    }

    constructor(){
        owner = msg.sender;
        tokenContract = new ReksTokens("Reks", "R");
        amountDonated = "0";
    }
    

    function newCompanies(string[] memory _companies) external onlyOwner{
        for(uint i = 0; i < _companies.length; ++i){
            if(infoCompanies[_companies[i]]._address == address(0)){
                address add = address(bytes20(keccak256(abi.encodePacked(_companies[i]))));
                infoCompanies[_companies[i]]._address = add;
                infoCompanies[_companies[i]].pos = companies.length;
                companies.push(_companies[i]);
            }
        }
    }

    function newCompany(string memory _company) external onlyOwner{
        require(infoCompanies[_company]._address == address(0),"Company is already in the system");
        address add = address(bytes20(keccak256(abi.encodePacked(_company))));
        infoCompanies[_company]._address = add;
        infoCompanies[_company].pos = companies.length;
        companies.push(_company);
    }

    function retireCompany(string memory _company) external onlyOwner isCompany(_company){
        address account = infoCompanies[_company]._address;
        tokenContract.burn(account, tokenContract.balanceOf(account));
        uint index = infoCompanies[_company].pos;
        string memory lastCompany = companies[companies.length - 1];
        companies[index] = lastCompany;
        infoCompanies[lastCompany].pos = index;
        companies.pop();
        delete infoCompanies[_company];
    }

    function getTotalComplaints() external view returns(uint){
        return tokenContract.totalSupply();
    }

    function getCompaniesNames() external view returns (string[] memory){
        return companies;
    }

    function getReputation(string memory _company) external view isCompany(_company) returns (uint){
        return tokenContract.balanceOf(infoCompanies[_company]._address);
    }

    function getAllReputations() external view returns (uint[] memory){
        uint [] memory _balances = new uint[](companies.length);
        for(uint i = 0; i<companies.length;++i){
            _balances[i] = tokenContract.balanceOf(infoCompanies[companies[i]]._address);
        }
        return _balances;
    }

    function getCompanyAddress(string memory _company) external view isCompany(_company) returns(address){
        return infoCompanies[_company]._address;
    }

    function getCompaniesAddresses() external view returns (address[] memory){
        uint l = companies.length;
        address [] memory accounts  = new address[](l);
        for(uint i = 0; i < l; ++i){
            accounts[i] = infoCompanies[companies[i]]._address;
        }
        return accounts;
    }

    function getCompanyComplaints(string memory _company) external view isCompany(_company) returns (string[] memory){
        return infoCompanies[_company].hashComplaints;
    }

    function newComplaint(string memory _company, string memory _hash) external isCompany(_company) onlyOwner{
        infoCompanies[_company].hashComplaints.push(_hash);
        infoCompanies[_company].posArray[_hash] = infoCompanies[_company].hashComplaints.length;
        tokenContract.mint(infoCompanies[_company]._address,1);
    }

    function retireComplaint(string memory _company, string memory _hash) external isCompany(_company) onlyOwner{
        uint index = infoCompanies[_company].posArray[_hash];
        require(index>0, "This complaint isn't registered");
        //Intercambiar esta denuncia con ultimo elemento del array
        uint last = infoCompanies[_company].hashComplaints.length - 1;
        string memory lastHash = infoCompanies[_company].hashComplaints[last];
        infoCompanies[_company].posArray[lastHash] = index;
        infoCompanies[_company].posArray[_hash] = 0;
        infoCompanies[_company].hashComplaints[index - 1] = lastHash;
        infoCompanies[_company].hashComplaints.pop();
        //Quemar el token de esa denuncia
        tokenContract.burn(infoCompanies[_company]._address,1);
    }

    function changeAmountDonated(string memory amount) external onlyOwner{
        amountDonated = amount;
    }

    function getAmountDonated() external view returns (string memory){
        return amountDonated;
    }
}