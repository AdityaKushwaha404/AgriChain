// scripts/grantAllRoles.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x789Be1AbAEc6604445C6AE83BBA923F7D91352eB"; // Update if needed
  const walletAddress = "0xE095a42817f01D04868eD5E7B7973127719a8880";

  const AgriTrace = await ethers.getContractAt("AgriTrace", contractAddress);

  const FARMER_ROLE = await AgriTrace.FARMER_ROLE();
  const INSPECTOR_ROLE = await AgriTrace.INSPECTOR_ROLE();
  const DISTRIBUTOR_ROLE = await AgriTrace.DISTRIBUTOR_ROLE();
  const RETAILER_ROLE = await AgriTrace.RETAILER_ROLE();

  console.log("Granting all roles to:", walletAddress);
  await (await AgriTrace.grantRole(FARMER_ROLE, walletAddress)).wait();
  await (await AgriTrace.grantRole(INSPECTOR_ROLE, walletAddress)).wait();
  await (await AgriTrace.grantRole(DISTRIBUTOR_ROLE, walletAddress)).wait();
  await (await AgriTrace.grantRole(RETAILER_ROLE, walletAddress)).wait();
  console.log("All roles granted!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
