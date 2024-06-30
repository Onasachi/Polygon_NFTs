const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const JenetTokenFTFactory = await hre.ethers.getContractFactory(
    "JenetToken"
  );
  const ngaTokenNft = await JenetTokenFTFactory.attach(
    process.env.CONTRACT_ADDRESS
  );

  const mintTx = await ngaTokenNft.safeMint(5);
  await mintTx.wait();

  console.log(
    "Successfully minted: " +
      (await ngaTokenNft.balanceOf(process.env.WALLET_ADDRESS)) +
      " LIONS NFTs to " +
      process.env.WALLET_ADDRESS
  );
  console.log(await ngaTokenNft.promptDescription());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});