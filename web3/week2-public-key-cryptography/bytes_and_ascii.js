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

const bytes = new Uint8Array([104, 97, 114, 55, 50]);
const encodedName = AsciiToUint8Array("harsh");
const decodedName = Uint8ArrayToAscii(bytes);

// -------------------------------------- CONSOLE LOGS -------------------------------------- //
console.log(encodedName);
console.log(decodedName);
console.log(bytesToAscii1(bytes));
console.log(asciiToBytes("harsh"));
return;

console.log("My name encoded: ", encodedName);
console.log("My name decoded: ", decodedName);

console.log(new TextDecoder().decode(new Uint8Array([114, 97, 115, 104])));

console.log("hello".charCodeAt(3));

String.fromCharCode(new Uint8Array([114]));
console.log();
