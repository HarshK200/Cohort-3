import { Connection } from "@solana/web3.js";

const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/dVqFqlGXXZZIR765zVLpo5owuLIuCRO3",
);
const transactionStatus = await connection.getSignatureStatus(
  "2Jyd4kyGxt4j9mVe9Mz1noTDHxB9ZYqJzKmYP9EEdaZ66sbHJww7uohnD7AH8y3FmAWPxFU3nFMMdacnkgQURhBS",
);
console.log("transactionResult: ", transactionStatus);
