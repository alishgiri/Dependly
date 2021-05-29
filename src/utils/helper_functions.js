const { dependsOnString } = require("./constants");
const { logRelations } = require("./logger");

function uniqueSortAndStringify(array) {
  return [...new Set(array.sort())].join(" ");
}

module.exports.createObjectFromFileData = (data) => {
  const lines = data.split("\n");
  const extractedContents = [];
  lines.forEach((line) => {
    if (line.includes(dependsOnString)) {
      const dataArr = line.split(dependsOnString);
      extractedContents.push({
        lib: dataArr[0],
        dependencies: dataArr[1].split(" "),
      });
    }
  });
  return extractedContents;
};

module.exports.generateRelations = (arrData) => {
  let currentLib;
  let currentDependencies;

  arrData.forEach((evalLib, evalIndx) => {
    currentLib = evalLib.lib;
    currentDependencies = [...evalLib.dependencies];

    arrData.forEach(({ lib, dependencies }, index) => {
      if (evalIndx != index && currentDependencies.includes(lib)) {
        currentDependencies = [...currentDependencies, ...dependencies];
      }
    });
    logRelations(
      currentLib + dependsOnString + uniqueSortAndStringify(currentDependencies)
    );
  });
};
