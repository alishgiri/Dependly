const fs = require("fs");
const path = require("path");

const { dependsOnString } = require("./constants");

module.exports.readFile = (filename) => {
  if (!filename) throw Error("No Filename provided!!");
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "..", `/input_files/${filename}`);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err || !data.includes(dependsOnString)) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
