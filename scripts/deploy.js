async function main() {
  //deploying now requires address
  //https://ethereum.stackexchange.com/a/159210
  const MyNFT = await ethers.getContractFactory("MyNFT", [
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
  ]);

  /* Start deployment, returning a promise that resolves to a contract object */
  const myNFT = await MyNFT.deploy(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
  );
  //await myNFT.deployed() deprecated in v6
  //https://docs.ethers.org/v6/api/contract/#BaseContract-waitForDeployment
  await myNFT.waitForDeployment();
  const address = await myNFT.getAddress();
  console.log("Contract deployed to address:", address);
  //Contract deployed to address: 0xA5CE67961DB1bEe988959C0D0F56115fA4ab8319
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
