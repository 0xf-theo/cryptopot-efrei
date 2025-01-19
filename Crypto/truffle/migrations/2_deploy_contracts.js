const Factory = artifacts.require("Factory");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Factory);
};
