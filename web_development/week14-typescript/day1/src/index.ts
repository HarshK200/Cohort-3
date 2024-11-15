interface User {
  name: string;
  email: string;
  contact: number;
}

// ass-ignment 1
function greeting(userName: string) {
  console.log(`Hello ${userName}`);
}

greeting("Harsh");

// ass-ignment HARD
function funcRunner(runMeBaby: () => void) {
  setTimeout(runMeBaby, 1000);
}

funcRunner(() => {
  console.log("i ran after 1 sec");
});

import "./test";
