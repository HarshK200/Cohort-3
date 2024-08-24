// converts a array to hex
function arrayToHex(array) {
  let hexString = "";
  array.map((ele) => {
    hexString += ele.toString(16).padStart(2, "0");
  });
  return hexString;
}

// converts a hex to array
function hexToBytearray(hex) {
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return byteArray;
}

const bytes = new Uint8Array([72, 101, 108, 108, 111]);
const hex = arrayToHex(bytes);
console.log(hex);
console.log(hexToBytearray(hex));
