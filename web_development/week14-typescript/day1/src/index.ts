// INTERFACES

interface User {
  name: string;
  email: string;
  contact: number;
}

// NOTE: very similar to golang (just in golang structs implement interfaces)
class Admin implements User {
  name: string;
  email: string;
  contact: number;

  constructor(n: string, e: string, c: number) {
    this.name = n;
    this.email = e;
    this.contact = c;
  }

  greet() {
    console.log(`Hello i'm ${this.name}`);
  }
}

const kou = new Admin("kou", "koushinji@vtuber.com", 69);
kou.greet();

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

interface SuperUser {
  name: string;
  email: string;
  privateKey: string;
}

// union and intersections cannot be done with interfaces
// for e.g.
// interface AdminUsers = User & SuperUser;

// UNIONS
type myType = string | number;

// INTERSECTION
type AdminUser = User & SuperUser;

// GENERICS
function findGreater<T>(a: T, b: T) {
  if (a > b) return a;

  return b;
}

console.log("greater number is: ", findGreater(2, 3));
console.log("greater string is: ", findGreater("2", "3"));


function getFirstElement<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement<string | number>(["harkiratSingh", 2]);
