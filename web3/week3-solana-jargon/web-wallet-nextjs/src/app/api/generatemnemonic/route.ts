import { generateMnemonic } from "bip39";
import { NextRequest, NextResponse } from "next/server";

interface ResponseData {
  mnemonic: string[];
}

export async function GET(req: NextRequest) {
  const mnemonic: string = generateMnemonic();
  const response: ResponseData = { mnemonic: mnemonic.split(" ") };
  return NextResponse.json(response, { status: 200 });
}
