import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { supportedBlockchains } from "@/enums";
import bs58 from "bs58";

function solanaWalletGenerator(mnemonic: string, nextAvilWalletId: number, cryptr: Cryptr): wallet {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${nextAvilWalletId}'/0'`;
  const seedphrase = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(seedphrase).secretKey;
  const { secretKey, publicKey } = Keypair.fromSecretKey(secret);
  console.log("pub key: ", publicKey.toBase58());
  console.log("private key: ", bs58.encode(secretKey));
  const wallet: wallet = {
    wallet_id: nextAvilWalletId,
    blockchain_type: supportedBlockchains.Solana,
    public_key: publicKey.toBase58(),
    encrypted_private_key: cryptr.encrypt(bs58.encode(secretKey)),
  };
  return wallet;
}

export async function POST(req: NextRequest) {
  const { blockchain_type, password, encryptedMnemonic, nextAvilWalletId } =
    (await req.json()) as generateWallet_RequestData;
  const cryptr = new Cryptr(password, { encoding: "base64" });
  const mnemonic = cryptr.decrypt(encryptedMnemonic);

  let generatedWallet: wallet;
  if (blockchain_type === supportedBlockchains.Solana) {
    generatedWallet = solanaWalletGenerator(mnemonic, nextAvilWalletId, cryptr);
  } else {
    return new NextResponse(JSON.stringify({ err: "the choosen blockchain_type is not supported" }), { status: 400 });
  }

  return new NextResponse(JSON.stringify(generatedWallet), { status: 200 });
}
