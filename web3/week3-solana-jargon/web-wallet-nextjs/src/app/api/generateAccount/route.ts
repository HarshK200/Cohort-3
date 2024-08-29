import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { nextAvilAccountId, password, mnemonic, blockchain_type } = (await req.json()) as generateAccount_RequestData;
  const cryptr = new Cryptr(password, { encoding: "base64" });
  const encryptedMnemonic = cryptr.encrypt(mnemonic?.join(" ")!);

  // TODO: genereate a wallet and add them to the response
  const response: generateAccount_ResponseData = {
    accountId: nextAvilAccountId,
    encryptedMnemonic: encryptedMnemonic,
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}
