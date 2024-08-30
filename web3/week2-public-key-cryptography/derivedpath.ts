import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

function getKeysFrommneomic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  for (let i = 0; i < 2; i++) {
    const path = `m/44'/501'/${i}'/0'`; // the ${i} is the wallet no.
    const seedPhrase = derivePath(path, seed.toString("hex")).key; // the secret can we generated from this that can be used to create keypair
    const secret = nacl.sign.keyPair.fromSeed(seedPhrase).secretKey;
    const privateKey = Keypair.fromSecretKey(secret).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey;
    const bs58PrivateKey = bs58.default.encode(privateKey);
    console.log(`wallet ${i}: `);
    console.log(`secret key(private key): ${bs58PrivateKey}`);
    console.log(`public key: ${publicKey.toBase58()}`);
  }
}

const mnemonic: string = "protect surround have remove ghost bamboo seminar clap asset use merge earn";
getKeysFrommneomic(mnemonic);
