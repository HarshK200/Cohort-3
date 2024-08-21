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
  const prefix = "100xdevs";
  let nounce = 1;
  const noOfStartingZeros = 5;

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
