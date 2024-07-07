//https://docs.alchemy.com/docs/how-to-mint-an-nft-from-code
import { ethers } from "ethers";
import "dotenv/config";
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

import * as contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json" with { type: "json" };
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const abi = contract.default.abi;
//console.log(abi);

//to mint, we need a contract address from deploy.js
const myNFTContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

//pinata link:  "https://gateway.pinata.cloud/ipfs/QmSe4KMWG3MGuNdFXDEfJYSMpbfQq5Raxv63DQrKV3JXJF";
const tokenURI = "ipfs://QmQExDx5HpiHymDVNbDT7GCL7cWmLGDaMreZzSM3n7B1R9"
//myNFTContract.interface.fragments.filter(x => x.name == "safeMint").forEach(x => console.log(x.inputs));


const mintNFT = async () => {
  let nftTxn = await myNFTContract.safeMint(signer.address, tokenURI);
  await nftTxn.wait();
  console.log(`Minted NFT successfully! Txn: ${nftTxn.hash}`);
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
