"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var bip39_1 = require("bip39");
var ed25519_hd_key_1 = require("ed25519-hd-key");
var web3_js_1 = require("@solana/web3.js");
var bs58 = __importStar(require("bs58"));
function getKeysFrommneomic(mnemonic) {
    var seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
    for (var i = 0; i < 2; i++) {
        var path = "m/44'/501'/".concat(i, "'/0'"); // the 0 at the end is the account no. 0 for the first account
        var seedPhrase = (0, ed25519_hd_key_1.derivePath)(path, seed.toString("hex")).key; // the secret can we generated from this that can be used to create keypair
        var secret = tweetnacl_1.default.sign.keyPair.fromSeed(seedPhrase).secretKey;
        var privateKey = web3_js_1.Keypair.fromSecretKey(secret).secretKey;
        var publicKey = web3_js_1.Keypair.fromSecretKey(secret).publicKey;
        console.log("wallet ".concat(i, ": "));
        console.log("secret key(private key): ".concat(bs58.default.encode(privateKey)));
        console.log("public key: ".concat(publicKey.toBase58()));
    }
}
var mnemonic = "your mnemonic";
getKeysFrommneomic(mnemonic);
