const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const JenetToken = await hre.ethers.getContractFactory("JenetToken");

  const nftTokenNft = await NGATokenNFT.attach(process.env.CONTRACT_ADDRESS);
  const balance = (
    await nftTokenNft.balanceOf(process.env.WALLET_ADDRESS)
  ).toString();

  console.log("Balance: ", balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});