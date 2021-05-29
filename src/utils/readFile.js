const fs = require("fs");
const path = require("path");

const dependsOnString = " depends on ";

function createObjectFromFileData(data) {
  const lines = data.split("\n");
  const extractedContents = [];
  lines.forEach((line) => {
    if (line.includes(dependsOnString)) {
      const dataArr = line.split(dependsOnString);
      extractedContents.push({ main: dataArr[0], dependents: dataArr[1].split(" ") });
    }
  });
  return extractedContents;
}

module.exports.readFile = (filename) => {
  if (!filename) throw Error("No Filename provided!!");
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "..",
      `/input_files/${filename.toUpperCase()}.txt`
    );
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err || !data.includes(dependsOnString)) {
        reject(err);
        return;
      }
      const extractedContentObj = createObjectFromFileData(data);
      resolve(extractedContentObj);
    });
  });
};
