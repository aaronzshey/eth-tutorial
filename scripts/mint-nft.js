//https://docs.alchemy.com/docs/how-to-mint-an-nft-from-code
import { ethers } from "ethers";
import "dotenv/config";
const API_KEY = process.env.API_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
//console.log(process.env);
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

import * as contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json" with { type: "json" };

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const abi = contract.default.abi;
//console.log(abi);

const myNFTContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const tokenURI =
  "https://gateway.pinata.cloud/ipfs/QmSe4KMWG3MGuNdFXDEfJYSMpbfQq5Raxv63DQrKV3JXJF";

//console.log(myNFTContract.safeMint);

const mintNFT = async () => {
  let nftTxn = await myNFTContract.safeMint(signer.address);
  await nftTxn.wait();
  console.log(`Minted NFT successfully! Txn: ${nftTxn.hash}`);
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
