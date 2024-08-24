import * as bs58 from "bs58"; //external library

function bytesToBase64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

function bytesTobase58(bytesArray) {
  return bs58.default.encode(bytesArray);
}

const byteArray = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"

console.log(bytesToBase64(byteArray));
console.log(bytesTobase58(byteArray));
