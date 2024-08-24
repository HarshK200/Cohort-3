"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bip39_1 = require("bip39");
function main() {
    var memonic = (0, bip39_1.generateMnemonic)(128);
    var seedphrase = (0, bip39_1.mnemonicToSeedSync)(memonic);
    console.log("Memonic:", memonic);
    console.log("SeedPhrase: ", seedphrase);
}
main();
