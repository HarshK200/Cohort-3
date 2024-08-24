import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

function generateKeypair(): { publickey: PublicKey; privateKey: Uint8Array } {
  const keypair = Keypair.generate();
  const publickey = keypair.publicKey;
  const privateKey = keypair.secretKey;
  return { publickey: publickey, privateKey: privateKey };
}

function signTransaction(message: string, privateKey: Uint8Array): Uint8Array {
  // the message for signature must be a Uint8Array
  const byteMessage: Uint8Array = new TextEncoder().encode(message);
  const signature = nacl.sign.detached(byteMessage, privateKey);
  return signature;
}

function verifyTransection(message: string, signature: Uint8Array, publickey: PublicKey): boolean {
  const byteMessage = new TextEncoder().encode(message);
  const result = nacl.sign.detached.verify(byteMessage, signature, publickey.toBytes());
  return result;
}

function main() {
  const { publickey, privateKey } = generateKeypair();
  console.log("private key(secretekey):", privateKey);
  console.log("public key:", publickey);

  const message = "harsh sent 200rs => trump"; // on real blockchains the message get's hashed and then signed()
  const signature = signTransaction(message, privateKey);
  console.log("Signature: ", signature);

  const isVerifed = verifyTransection(message, signature, publickey);
  console.log("Transaction verifed: ", isVerifed);
}

main();
