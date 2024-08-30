import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { supportedBlockchains } from "@/enums";
import bs58 from "bs58";
import bcrypt from "bcryptjs";

async function getHashedPass(password: string) {
  const saltrounds = 10;
  const hasded_pass = await bcrypt.hash(password, saltrounds);
  return hasded_pass;
}

function generateForSolana(mnemonic_words_array: string[]): { publickey: string; privatekey: string } {
  const mnemonic = mnemonic_words_array.join(" ");
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/0'/0'`;
  const seedphrase = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(seedphrase).secretKey;
  const { secretKey, publicKey } = Keypair.fromSecretKey(secret);

  const publickey = publicKey.toBase58();
  const privatekey = bs58.encode(secretKey);

  return { publickey, privatekey };
}

// Todo Add support for etherium

export async function POST(req: NextRequest) {
  const { nextAvilAccountId, password, mnemonic, blockchain_type } = (await req.json()) as generateAccount_RequestData;
  const cryptr = new Cryptr(password, { encoding: "base64" });
  const encryptedMnemonic = cryptr.encrypt(mnemonic?.join(" ")!);
  let keyPair: { publickey: string; privatekey: string };

  if (blockchain_type === supportedBlockchains.Solana) {
    keyPair = generateForSolana(mnemonic);
    const encryptedPrivateKey = cryptr.encrypt(keyPair.privatekey);

    const newWallet: wallet = {
      blockchain_type: supportedBlockchains.Solana,
      encrypted_private_key: encryptedPrivateKey,
      public_key: keyPair.publickey,
    };

    const newSecureUser: secureUser = {
      accountId: nextAvilAccountId,
      encryptedMnemonic: encryptedMnemonic,
      wallets: [newWallet],
    };

    const secureuser: generateAccount_ResponseData = newSecureUser;
    const response = {
      hashed_pass: await getHashedPass(password),
      secureuser: secureuser,
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
    });
  }

  // Todo Add support for etherium
}
