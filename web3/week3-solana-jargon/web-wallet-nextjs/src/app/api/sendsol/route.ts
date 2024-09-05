import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

async function makeTransaction(
  sender_pubkey_bs58: string,
  sender_privateKey_bs58: string,
  reciever_publicKey_bs58: string,
  amount: number,
) {
  // const connection = new Connection("http://localhost:8899", "confirmed");
  // const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC!, "confirmed");
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC!, "confirmed");
  const transaction = new Transaction();
  const senderKeypair = Keypair.fromSecretKey(bs58.decode(sender_privateKey_bs58));
  const sender_publicKey = new PublicKey(sender_pubkey_bs58);
  const reciever_publicKey = new PublicKey(reciever_publicKey_bs58);

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender_publicKey,
    toPubkey: reciever_publicKey,
    lamports: LAMPORTS_PER_SOL * amount,
  });

  transaction.add(sendSolInstruction);
  const signature = sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
  return signature;
}

export async function POST(req: NextRequest) {
  const { password, sender_pubkey, sender_encryptedPrivatekey, reciever_publicKey, amount } =
    (await req.json()) as sendSol_RequestData;

  try {
    const cryptr = new Cryptr(password, { encoding: "base64" });
    const sender_privateKey = cryptr.decrypt(sender_encryptedPrivatekey);

    if (sender_pubkey === reciever_publicKey) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Cannot send sol to same address",
        }),
        { status: 400 },
      );
    }

    const transactionSignature = await makeTransaction(sender_pubkey, sender_privateKey, reciever_publicKey, amount);

    return new NextResponse(
      JSON.stringify({
        success: true,
        transactionSignature: transactionSignature,
      }),
      { status: 200 },
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: e,
      }),
      { status: 400 },
    );
  }
}
