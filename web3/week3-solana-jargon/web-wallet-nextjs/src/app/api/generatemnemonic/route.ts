import { generateMnemonic } from "bip39";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mnemonic: string = generateMnemonic(128); // 128 for 12 words and 256 for 24 words
  const response: generatemnemonic_ResponseData = { mnemonic: mnemonic.split(" ") };
  return NextResponse.json(response, { status: 200 });
}
