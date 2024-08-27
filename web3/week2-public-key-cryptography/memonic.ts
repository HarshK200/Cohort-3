// import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

function main() {
  const memonic = generateMnemonic(128);
  const seedphrase = mnemonicToSeedSync(memonic);
  console.log("Memonic:", memonic);
  console.log("SeedPhrase: ", seedphrase);
}

main()

// console.log(LAMPORTS_PER_SOL);
