pragma solidity ^0.4.21;

import '../token/MuzikaCoin.sol';
import '../../zeppelin-solidity/contracts/ownership/Heritable.sol';

contract MuzikaPaperContract is Heritable {
    struct Paper {
        uint id;
        address seller;
        string title;
        uint price;
    }

    mapping (address => mapping (uint => bool)) public purchased;
    mapping (uint => Paper) public registeredPaper;

    uint public totalPapers;
    uint public lastPaperID;

    MuzikaCoin _token;

    modifier onlySeller(uint paperID) {
        require(
            msg.sender == registeredPaper[paperID].seller
            // "Only seller can call this."
        );
        _;
    }

    function MuzikaPaperContract(MuzikaCoin __token, uint _heartbeatTimeout) Heritable(_heartbeatTimeout) public {
        totalPapers = 0;
        lastPaperID = 0;
        _token = __token;
    }

    function isPurchased(address user, uint paper) public view returns (bool) {
        return registeredPaper[paper].seller == user || purchased[user][paper] == true;
    }

    function sale(string title, uint price) public returns (uint) {
        require(price > 0/*, "Price must be bigger than zero"*/);

        ++lastPaperID;
        registeredPaper[lastPaperID] = Paper(
            lastPaperID,
            msg.sender,
            title,
            price
        );

        return lastPaperID;
    }

    function purchase(uint paperID) public {
        require(
            registeredPaper[paperID].id != 0
            // "This paper is not for sale"
        );

        Paper memory paper = registeredPaper[paperID];

        purchased[msg.sender][paperID] = true;

        _token.transferFrom(msg.sender, paper.seller, paper.price);
    }
}
