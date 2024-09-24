import {
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React from "react";

export function TokenLaunchpad() {
  const [tokenData, setTokenData] = React.useState({});

  // creating connection
  const connection = useConnection();
  const wallet = useWallet();

  function createToken() {
    // creating a newKeypair for the mint account
    const mintKeypair = Keypair.generate();
    // minimum lamport for rent exemption
    const minLamport = getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      // this is a PDA (programm driven account)
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey(),
        lamports: minLamport,
        space: MINT_SIZE, // the amount space a mint account needs (constant comes from @solana/spl-token)
        programId: TOKEN_PROGRAM_ID,
      }),
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input
        className="inputText"
        type="text"
        placeholder="Name"
        value={tokenData.name}
        onChange={(e) => {
          setTokenData({ ...tokenData, name: tokenData.name });
        }}
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Symbol"
        value={tokenData.symbol}
        onChange={(e) => {
          setTokenData({ ...tokenData, symbol: tokenData.symbol });
        }}
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Image URL"
        value={tokenData.imageURL}
        onChange={(e) => {
          setTokenData({ ...tokenData, imageURL: tokenData.imageURL });
        }}
      ></input>
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Initial Supply"
        value={tokenData.initialSupply}
        onChange={(e) => {
          setTokenData({
            ...tokenData,
            initialSupply: tokenData.initialSupply,
          });
        }}
      ></input>
      <br />
      <button className="btn">Create a token</button>
    </div>
  );
}
