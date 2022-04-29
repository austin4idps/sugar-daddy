const {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} = require("@solana/web3.js");
require('dotenv').config()

const publicKeyStr =  process.env.PublicKey
const publicKey = new PublicKey(`${publicKeyStr}`);


const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Your Wallet Address is ${publicKeyStr}`)
    console.log(`Wallet current Balance is ${walletBalance}`);
  } catch (er) {
    console.log(er);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL * 2
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (er) {
    console.log("Error Here: " + er);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
