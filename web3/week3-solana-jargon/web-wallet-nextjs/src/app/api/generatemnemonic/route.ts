import { generateMnemonic } from "bip39";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mnemonic: string = generateMnemonic();
  const response: generatemnemonic_ResponseData = { mnemonic: mnemonic.split(" ") };
  return NextResponse.json(response, { status: 200 });
}
