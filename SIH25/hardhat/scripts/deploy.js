async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  const Agri = await ethers.getContractFactory("AgriTrace");
  const agri = await Agri.deploy();
  await agri.deployed();
  console.log("AgriTrace deployed to:", agri.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});