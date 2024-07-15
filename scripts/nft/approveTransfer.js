import hre from "hardhat";
import dotenv from "dotenv";
import fxERC721RootContractABI from "../fxErc721RootContractAbi.json"

dotenv.config();

const fxERC721RootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = process.env.WALLET_ADDRESS;

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const JenetTokenFTFactory = await hre.ethers.getContractFactory("JenetToken");
  const ngaTokenNFT = await JenetTokenFTFactory.attach(process.env.CONTRACT_ADDRESS);

  const fxRootContract = await hre.ethers.getContractAt(fxERC721RootContractABI, fxERC721RootAddress);

  // Approve NFTs for transfer
  const approveTx = await ngaTokenNFT.connect(deployer).setApprovalForAll(fxERC721RootAddress, true);
  await approveTx.wait();

  console.log("NFT approval confirmed");

  // Deposit NFTs to Polygon Amoy bridge
  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRootContract.connect(deployer).deposit(
      ngaTokenNFT.address,
      process.env.BRIDGE_ADDRESS,
      i,
      "0x6566"
    );
    await depositTx.wait();
  }

  console.log("NFT deposited on Polygon Amoy");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
