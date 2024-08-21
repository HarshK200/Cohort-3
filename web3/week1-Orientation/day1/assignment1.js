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
  const noOfStartingZeros = 5;
  let count = 1;

  while (true) {
    const hash = crypto
      .createHash("sha256")
      .update(count.toString())
      .digest("hex");
    console.log("Testing hash: ", hash);
    if (hasGivenZeros(noOfStartingZeros, hash)) {
      console.log("Satisfied at string: ", count.toString());
      console.log("Satisfied at hash: ", hash);
      break;
    }
    count++;
  }
}

main();
