const hre = require("hardhat");
require("dotenv").config();
import fxERC721RootContractABI from "ERC721FxRootContractABI.json";

const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = `${process.env.WALLET_ADDRESS}`;

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const JenetTokenFTFactory = await hre.ethers.getContractFactory(
    "JenetToken"
  );
  const ngaTokenNFT = await JenetTokenFTFactory.attach(
    process.env.CONTRACT_ADDRESS
  );

  const fxRootContract = await hre.ethers.getContractAt(
    fxERC721RootContractABI,
    fxERC721RootAddress
  );

  // Approve NFTs for transfer
  const approveTx = await ngaTokenNFT
    .connect(deployer)
    .setApprovalForAll(fxERC721RootAddress, true);

  await approveTx.wait();

  console.log("NFT approval confirmed");

  // Deposit NFTs to Polygon Mumbai bridge
  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRootContract
      .connect(deployer)
      .deposit(ngaTokenNFT.address, process.env.BRIDGE_ADDRESS, i, "0x6566");

    await depositTx.wait();
  }

  console.log("NFT deposited on Polygon Mumbai");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});