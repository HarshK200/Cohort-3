import {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
  TransactionConfirmationStrategy,
} from "@solana/web3.js";

const connection = new Connection("http://localhost:8899");

async function airdrop(publicKey: string, amount: number) {
  const airdropSignature = await connection.requestAirdrop(
    new PublicKey(publicKey),
    amount,
  );

  const latestBlockhash = await connection.getLatestBlockhash();

  const transactionConfirmationStrat: TransactionConfirmationStrategy = {
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    signature: airdropSignature,
  };

  const signatureResult = await connection.confirmTransaction(
    transactionConfirmationStrat,
  );

  return { airdropSignature, signatureResult };
}

async function main() {
  const { airdropSignature, signatureResult } = await airdrop(
    "4jzCsjAvbyqSEiyuScgaeFxJP9yPSzqJ9xUai4BHQD5d",
    1 * LAMPORTS_PER_SOL,
  );
  console.log("Airdrop signature: ", airdropSignature);
  console.log("Signature result : ", signatureResult);
}

main();
