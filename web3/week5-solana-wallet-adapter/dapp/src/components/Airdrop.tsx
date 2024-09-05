import React from "react";
import "./Airdrop.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const Airdrop: React.FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = React.useState<number>(0);

  async function sendAirdrop() {

    const airdropSignature = await connection.requestAirdrop(
      wallet.publicKey!,
      amount * LAMPORTS_PER_SOL,
    );
    console.log("airdropSignature: ", airdropSignature);


    const transactionStatus = await connection.getSignatureStatus(airdropSignature);
    console.log("transactionResult: ", transactionStatus);
  }

  return (
    <main className="main-container">
      publikey: {wallet.publicKey?.toString()}
      <div className="dapp-heading">
        <h1>Decentralized-app</h1>
        <h2>Solana Faucet</h2>
      </div>
      <div className="airdrop-div">
        <input
          type="text"
          required
          placeholder="Amount"
          value={amount}
          onChange={(e: any) => {
            if (parseInt(e?.target?.value)) {
              setAmount(parseInt(e.target.value));
              return;
            }

            alert("Invalid amount! please enter a number");
            setAmount(0);
          }}
        />
        <button onClick={sendAirdrop}>Airdrop SOL</button>
      </div>
    </main>
  );
};

export default Airdrop;
