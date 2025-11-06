import { ethers } from "ethers";
import fs from "fs";

const main = async () => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(
    "4902b3e59a840ac67d560d86be4fb3545ca30e8003afa76e87d065529544eda8",
    provider
  );

  const abi = JSON.parse(
    fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  );
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  console.log("Deploying contract...");
  const factory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", await contract.getAddress());
};

main().catch(console.error);
