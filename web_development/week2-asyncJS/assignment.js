const fs = require("node:fs");

function promisedTimeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("This runs after 1 sec");
      resolve();
    }, 1000);
  });
}

function promisedReadfile() {
  return new Promise((resolve, reject) => {
    const data = fs.readFile("a.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function main() {
  console.log(await fetch("https://www.google.com", { method: "POST" }));
  await promisedTimeout();
  console.log(await promisedReadfile());
}

main();
