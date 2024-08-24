"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var tweetnacl_1 = __importDefault(require("tweetnacl"));
function generateKeypair() {
    var keypair = web3_js_1.Keypair.generate();
    var publickey = keypair.publicKey;
    var privateKey = keypair.secretKey;
    return { publickey: publickey, privateKey: privateKey };
}
function signTransaction(message, privateKey) {
    // the message for signature must be a Uint8Array
    var byteMessage = new TextEncoder().encode(message);
    var signature = tweetnacl_1.default.sign.detached(byteMessage, privateKey);
    return signature;
}
function verifyTransection(message, signature, publickey) {
    var byteMessage = new TextEncoder().encode(message);
    var result = tweetnacl_1.default.sign.detached.verify(byteMessage, signature, publickey.toBytes());
    return result;
}
function main() {
    var _a = generateKeypair(), publickey = _a.publickey, privateKey = _a.privateKey;
    console.log("private key(secretekey):", privateKey);
    console.log("public key:", publickey);
    var message = "harsh sent 200rs => trump"; // on real blockchains the message get's hashed and then signed()
    var signature = signTransaction(message, privateKey);
    console.log("Signature: ", signature);
    var isVerifed = verifyTransection(message, signature, publickey);
    console.log("Transaction verifed: ", isVerifed);
}
main();
