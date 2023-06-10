// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutoHoldingPlatform {
    
    struct Car {
        string brand;
        string model;
        uint year;
        address owner;
        bool inService;
        address dealer;
    }
    
    struct Dealer {
        string name;
        string city;
        address dealerAddress;
    }
    
    mapping(address => Car[]) private carsByOwner;
    mapping(address => Dealer) private dealers;
    mapping(string => Dealer) private dealersN;
    mapping(string => Dealer[]) private dealersList;
    
    function registerDealer(string memory _name, string memory _city, address _address) public {
        require(dealers[_address].dealerAddress == address(0), "Dealer already registered");
        
        dealers[_address] = Dealer({
            name: _name,
            city: _city,
            dealerAddress: _address
        });
        dealersN[_name] = Dealer({
            name: _name,
            city: _city,
            dealerAddress: _address
        });
        Dealer memory newDealer = Dealer({
            name: _name,
            city: _city,
            dealerAddress: _address
        });
        dealersList[_name].push(newDealer);
    }
    
    function addCar(string memory _brand, string memory _model, uint _year) public {
        Car memory newCar = Car({
            brand: _brand,
            model: _model,
            year: _year,
            owner: msg.sender,
            inService: false,
            dealer: address(0)
        });
        
        carsByOwner[msg.sender].push(newCar);
    }
    
    function requestService(address _dealer, uint _carIndex, uint _price) public payable {
        require(carsByOwner[msg.sender][_carIndex].owner == msg.sender, "You don't own this car");
        require(!carsByOwner[msg.sender][_carIndex].inService, "Car is already in service");
        require(carsByOwner[msg.sender][_carIndex].dealer == address(0), "Car is already assigned to a dealer");
        
        carsByOwner[msg.sender][_carIndex].inService = true;
        carsByOwner[msg.sender][_carIndex].dealer = _dealer;
        payable(_dealer).transfer(_price);
    }
    
    function cancelRequest(uint _price, address _client, uint _carIndex) public payable {
        require(carsByOwner[_client][_carIndex].inService, "Car is not in service");
        carsByOwner[_client][_carIndex].inService = false;
        carsByOwner[_client][_carIndex].dealer = address(0);
        payable(_client).transfer(_price);
    }
    
    function getServiceStatus(uint _carIndex) public view returns (bool inService, address dealer) {
        inService = carsByOwner[msg.sender][_carIndex].inService;
        dealer = carsByOwner[msg.sender][_carIndex].dealer;
    }

   function getDealers(string memory _name) public view returns (Dealer[] memory){
        uint count = dealersList[_name].length;
        Dealer[] memory newDealersList = new Dealer[](count);
        for (uint i=0;i<count;i++){
            Dealer storage car = dealersList[_name][i];
           newDealersList[i] = car;
        }
        return newDealersList;
    }

    function getDealerByAddress(address _address) public view returns (string memory name){
        name = dealers[_address].name;
    }

    function getCar() public view returns (Car[] memory){
        uint count =  carsByOwner[msg.sender].length;
        Car[] memory carsList = new Car[](count);
        for (uint i=0;i<count;i++){
            Car storage car = carsByOwner[msg.sender][i];
            carsList[i] = car;
        }
        return carsList;
    }


    
}
    