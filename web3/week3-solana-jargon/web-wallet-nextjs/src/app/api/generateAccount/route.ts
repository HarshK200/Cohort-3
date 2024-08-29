import Cryptr from "cryptr";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password, mnemonic } = await req.json();
  const cryptr = new Cryptr(password, { encoding: "base64" });
  const encryptedMnemonic = cryptr.encrypt(mnemonic?.join(" ")!);
  const response = {
    encryptedMnemonic: encryptedMnemonic,
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}
