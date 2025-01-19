const ethers = require("ethers");
const Web3 = require("web3");
const { JsonRpcProvider } = require("@ethersproject/providers");
require("dotenv").config();

const prompt = require("prompt-sync")({ sigint: true });

const privateKey = process.env.DEV;
const provider = new JsonRpcProvider("https://testnet-v2.xai-chain.net/rpc/xaidd3920b8ecd8dacba2f3bcaa30e29");
const signer = new ethers.Wallet(privateKey, provider);

const usdc = "0x7d57A692bdA9E7aE488f1de861bF87e45F457FE3";

(async () => {
  const factory = new ethers.Contract(
    "0xD957A33bD1C073b4a944537B73bD6826873f0474",
    require("../truffle/build/contracts/Factory.json").abi,
    signer
  );

  const count = Number(await factory.get());

  for (var i = 0; i < count; i++) {
    const addr = await factory.see(i);
    const pot = new ethers.Contract(
      addr,
      require("../truffle/build/contracts/Crowdfunding.json").abi,
      signer
    );
    console.log("Pot detected : " + addr);

    const creator = await pot.creator();
    const totalCollected = Number(await pot.totalCollected());
    const targetAmount = Number(await pot.targetAmount());
    const isFinished = await pot.isFinished();

    console.log({
      creator,
      totalCollected,
      targetAmount,
      isFinished,
    });
  }

  const createContract = prompt("Créer une cagnotte (o/n) ? ");

  if (createContract == "o") {
    const amount = prompt("Montant a atteindre : ");
    const name = prompt("Nom de l'association : ");
    const title = prompt("Titre de la cagnotte : ");
    const idPot = prompt("Id de la cagnotte : ");
    const idAssociation = prompt("Id de l'association : ");

    const receipt = await (await factory.create(title, name, idPot, idAssociation, usdc, amount)).wait();
    console.log("Addresse de la cagnotte : " + receipt.logs[0].address);
  }
})();
