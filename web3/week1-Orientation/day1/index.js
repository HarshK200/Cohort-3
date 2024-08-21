const crypto = require("crypto");

// Hashing a string and return the result as a hex-encoded string.
const input = "100xdevs";
// 10b3493287f831e81a438811a1ffba01f8cec4b7
const hash = crypto.createHash("sha256").update(input).digest('hex');
console.log(hash)
