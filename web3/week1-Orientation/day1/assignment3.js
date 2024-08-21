const crypto = require("crypto");

function hasGivenZeros(noOfStartingZeros, hash) {
  const hashArr = hash.split("");
  for (let i = 0; i < noOfStartingZeros; i++) {
    if (hashArr[i] != "0") {
      return false;
    }
  }
  return true;
}

function main() {
  const prefix = `harkirat => Raman | Rs 100
Ram => Ankit | Rs 10`;
  let nounce = 1;
  const noOfStartingZeros = 3;

  while (true) {
    const hash = crypto
      .createHash("sha256")
      .update(prefix + nounce.toString())
      .digest("hex");
    console.log("Testing hash: ", hash);
    if (hasGivenZeros(noOfStartingZeros, hash)) {
      console.log("Satisfied at string: ", prefix + nounce.toString());
      console.log("Satisfied at hash: ", hash);
      break;
    }
    nounce++;
  }
}

main();
