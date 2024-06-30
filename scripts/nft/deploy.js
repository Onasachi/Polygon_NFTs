const hre = require("hardhat");

async function main() {
  const JenetTokenFTFactory = await hre.ethers.getContractFactory("JenetToken");

  const JenetToken = await JenetTokenFTFactory.deploy();

  console.log("Lions NFT deployed to: ", JenetToken.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});