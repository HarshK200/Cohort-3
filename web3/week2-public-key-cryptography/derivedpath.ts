import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58"

function getKeysFrommneomic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  for (let i = 0; i < 2; i++) {
    const path = `m/44'/501'/${i}'/0'`; // the 0 at the end is the account no. 0 for the first account
    const seedPhrase = derivePath(path, seed.toString("hex")).key; // the secret can we generated from this that can be used to create keypair
    const secret = nacl.sign.keyPair.fromSeed(seedPhrase).secretKey;
    const privateKey = Keypair.fromSecretKey(secret).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey;
    console.log(`wallet ${i}: `);
    console.log(`secret key(private key): ${bs58.default.encode(privateKey)}`);
    console.log(`public key: ${publicKey.toBase58()}`);
  }
}

const mnemonic: string = "your mnemonic";
getKeysFrommneomic(mnemonic);
