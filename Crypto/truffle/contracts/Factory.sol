// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Crowdfunding.sol";

contract Factory is Ownable {
    Crowdfunding[] deployedContracts;

    event PotCreated(address contractAddress);

    constructor() Ownable(msg.sender) {}

    function create(string memory title, string memory associationName, uint256 potId, uint256 associationId, address token, uint256 targetAmount) public onlyOwner {
        Crowdfunding t = new Crowdfunding(msg.sender, title, associationName, potId, associationId, IERC20(token), targetAmount);
        emit PotCreated(address(t));
        deployedContracts.push(t);
    }

    function get() public view returns (uint256 contractCount) {
        return deployedContracts.length;
    }

    function see(uint256 pos) public view returns (address contractAddress) {
        return address(deployedContracts[pos]);
    }
}
