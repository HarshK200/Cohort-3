import React from "react";
import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
// import { clusterApiUrl } from "@solana/web3.js";


const App: React.FC = () => {
  const endpoint:string = import.meta.env.VITE_SOLANA_DEVNET_RPC!;
  // const endpoint = "http://localhost:8899";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect={true}>
        <WalletModalProvider>
          <nav className="navbar-container">
            <div className="wallet-btns-container">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
          </nav>
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
