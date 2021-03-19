export const perro = {
  bark: () => {
    console.log("woof2");
  },
  poop: () => {
    console.log("add");
  },
};

const obj = { a: "alpha", b: "bravo" };
const obj2 = { ...obj, c: "charlie", d: "delta" };

console.log(obj2);
