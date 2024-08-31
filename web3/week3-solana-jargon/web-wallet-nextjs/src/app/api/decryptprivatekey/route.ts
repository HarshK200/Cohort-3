import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";

function decryptPrivateKey(encryptedprivatekey: string, password: string) {
  const cryptr = new Cryptr(password, { encoding: "base64" });
  return cryptr.decrypt(encryptedprivatekey);
}

export async function POST(req: NextRequest) {
  const { password, encrypted_private_key } = (await req.json()) as decryptprivatekey_RequestData;
  try {
    const decryptedPrivateKey: string = decryptPrivateKey(encrypted_private_key, password);
    return NextResponse.json({ decryptedPrivateKey: decryptedPrivateKey }, { status: 200 });
  } catch (e) {
    console.log("err decrypting: ", e);
    return NextResponse.json("err", { status: 400 });
  }
}
