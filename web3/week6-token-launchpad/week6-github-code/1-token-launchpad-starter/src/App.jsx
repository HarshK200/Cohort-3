import "./App.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/dVqFqlGXXZZIR765zVLpo5owuLIuCRO3"}>
      <WalletProvider wallets={[]} autoConnect={true}>
        <WalletModalProvider>
          <div style={{display: "flex", justifyContent: "space-between", padding: "2rem"}}>
            <WalletMultiButton />
            <WalletDisconnectButton/>
          </div>
          <TokenLaunchpad></TokenLaunchpad>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
