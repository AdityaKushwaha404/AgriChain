require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
   sepolia: {
  url: "https://eth-sepolia.g.alchemy.com/v2/r4uvvEnp5n3wB93JYndFP", // or Alchemy URL
  accounts: ["766bec90f27a7bed5280fa15c31f86c5317e8da343c1fe787364877b07a148e8"]
}
  },
};