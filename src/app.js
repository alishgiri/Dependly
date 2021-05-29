const { readFile } = require("./utils/readFile");

console.log(" ");
console.log("----------- Dependly -----------");
console.log(" ");

const extractDataFromFile = async (filename) => {
  try {
    const data = await readFile(filename);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

Promise.all([extractDataFromFile("input3")]).finally(() => {
  console.log(" ");
  console.log("----------- End -----------");
  console.log(" ");
});