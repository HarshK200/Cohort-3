// this takes and ascii and converts it to Uint8Array
function AsciiToUint8Array(asciiString) {
  return new TextEncoder().encode(asciiString);
}

// this takes and Uint8Array and converts it to ascii string
function Uint8ArrayToAscii(bytesArray) {
  return new TextDecoder().decode(bytesArray);
}

// the below function takes an array of bytes and return the charCode accroding to them
function bytesToAscii1(bytesArray) {
  const ascii = [];
  bytesArray.map((byte) => {
    ascii.push(String.fromCharCode(byte));
  });
  return ascii.join("");
}

// the below function takes an ascii string and return the charCode
function asciiToBytes(asciiString) {
  const arr = [];
  asciiString.split("").map((char) => {
    arr.push(char.charCodeAt(0));
  });
  return arr;
}

// console.log(new Uint8Array([255, 256])) // test to check the biggest 8 bit integer that can be stored in a 8 bit binary

const bytes = new Uint8Array([72, 101, 108, 108, 111]);
const encodedName = AsciiToUint8Array("harsh");
const decodedName = Uint8ArrayToAscii(bytes);

// -------------------------------------- CONSOLE LOGS -------------------------------------- //
console.log("My name encoded: ", encodedName);
console.log("My name decoded: ", decodedName);
console.log(bytesToAscii1(bytes));
console.log(asciiToBytes("harsh"));

// console.log("hello".charCodeAt(3));
// String.fromCharCode(new Uint8Array([114]));
