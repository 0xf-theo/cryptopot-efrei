// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// On définit notre contrat de cagnotte
contract Crowdfunding is Ownable {
    // On stocke l'adresse du créateur de la cagnotte
    address public creator;
    // On stocke le montant total collecté
    uint256 public totalCollected;
    // On stocke le montant ciblé pour la cagnotte
    uint256 public targetAmount;
    // Nom de la cagnotte
    string public title;
    // Nom de l'association
    string public associationName;
    // Id de la cagnotte
    uint256 public potId;
    // Id de l'association
    uint256 public assocationId;
    // On stocke l'état de la cagnotte (en cours ou terminée)
    bool public isFinished;
    // On stocke l'adresse du contrat ERC20 utilisé pour la cagnotte
    IERC20 public token;
    // On stocke les contributions de chaque participant
    mapping(address => uint256) public contributions;

    // On définit le constructeur du contrat
    constructor(
        address _owner,
        string memory _title,
        string memory _associationName,
        uint256 _potId,
        uint256 _associationId,
        IERC20 _token,
        uint256 _targetAmount
    ) public Ownable(_owner) {
        creator = _owner;
        token = _token;
        targetAmount = _targetAmount;
        title = _title;
        associationName = _associationName;
        potId = _potId;
        assocationId = _associationId;
    }

    // Fonction pour participer à la cagnotte
    function contribute(uint256 value) public {
        // On vérifie que la cagnotte est en cours
        require(!isFinished, "Crowdfunding finished");
        // On vérifie que le participant envoie au moins 1 token
        require(value > 0, "Invalid contribution amount");
        // On vérifie que le participant a assez de fonds pour effectuer la transaction
        require(
            token.balanceOf(msg.sender) >= value * 10**18,
            "Insufficient funds"
        );
        // On envoie les fonds au contrat de cagnotte
        token.transferFrom(msg.sender, address(this), value * 10**18);
        // On incrémente le montant total collecté
        totalCollected += value;
        // On met à jour les contributions du participant
        contributions[msg.sender] += value;
        // On met à jour l'état de la cagnotte si le montant ciblé est atteint
        if (totalCollected >= targetAmount) {
            isFinished = true;
        }
    }

    // Fonction pour récupérer les fonds de la cagnotte
    function collect() public onlyOwner {
        // On vérifie que la cagnotte est terminée
        require(isFinished, "Crowdfunding not finished");
        // On vérifie que le demandeur est bien le créateur de la cagnotte
        require(
            msg.sender == creator,
            "Only the creator can collect the funds"
        );
        // On envoie les fonds au créateur de la cagnotte
        token.transfer(creator, totalCollected);
        // On remet le montant total collecté à zéro
        totalCollected = 0;
    }

    // Fonction pour vérifier si la cagnotte est terminée
    function state() public view onlyOwner returns (bool) {
        // On vérifie si le montant ciblé a été atteint
        return totalCollected >= targetAmount;
    }

    // Fonction pour cloturer la cagnotte
    function close() public onlyOwner {
        // On vérifie que le demandeur est bien le créateur de la cagnotte
        require(
            msg.sender == creator,
            "Only the creator can close the crowdfunding"
        );
        // On met à jour l'état de la cagnotte
        isFinished = true;
    }

    // Fonction pour rembourser les participants
    function refund() public onlyOwner {
        // On vérifie que la cagnotte est terminée
        require(isFinished, "Crowdfunding not finished");
        // On vérifie que le demandeur est bien le créateur de la cagnotte
        require(
            msg.sender == creator,
            "Only the creator can refund the participants"
        );
        // On parcourt les contributions de chaque participant
        //for (address participant in contributions) {
        // On envoie les fonds correspondants au participant
        //token.transfer(participant, contributions[participant]);
        //}
        // On remet le montant total collecté à zéro
        totalCollected = 0;
    }
}
