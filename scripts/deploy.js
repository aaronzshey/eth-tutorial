import { ethers } from "ethers";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
/*
We're going to manipulate the tech stack a little here, diverging from the original tutorial.
To help make it less confusing, we're only going to use Ethers.js in the code.

Hardhat will be for compiling and testing.  That way, we don't need @nomiclabs/hardhat-ethers.
 */

import * as contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json" with { type: "json" };

async function main() {
  const provider = new ethers.AlchemyProvider("sepolia", API_KEY);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  //needs interface (abi) and bytecode
  //https://docs.ethers.org/v5/api/contract/contract-factory/#ContractFactory--creating
  const MyNFT = new ethers.ContractFactory(
    contract.default.abi,
    contract.default.bytecode,
    signer,
  );
  //console.log(contract.default.abi.filter(x => x.name == "safeMint"));

  //Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
  );
  //await myNFT.deployed() deprecated in v6
  //https://docs.ethers.org/v6/api/contract/#BaseContract-waitForDeployment
  await myNFT.waitForDeployment();
  const address = await myNFT.getAddress();
  console.log("Contract deployed to address:", address);
  //Contract deployed to address: 0xA5CE67961DB1bEe988959C0D0F56115fA4ab8319
  //rewritten with ethers: contract deployed to address 0x40035C952Da77097872FA804F1dDB1c75CCb21b8
  //testing again: contract deployed to  0xB2fF31A12C234715502efDbA16C4Ada61270c9da
  //this time should work: contract deployed to 0xe49A13ad27c56034cAbB825d6385f332A24e7065
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
