export enum supportedBlockchains {
  Solana = "Solana",
  Etherium = "Etherium",
}

export enum supportedSolanaRpcMethods {
  getAccountInfo = "getAccountInfo",
  getBalance = "getBalance",
  sendTransaction = "sendTransaction",
}

export enum supported_RPCs {
  // solana_mainnet = process.env.SOLANA_MAINNET_RPC!,
  solana_devnet = "https://api.devnet.solana.com",
  etherium_mainnet = "",
}
