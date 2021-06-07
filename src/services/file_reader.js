const fs = require("fs");
const path = require("path");

const { dependsOnString } = require("../utils/constants");

const rootFolderPath = path.join(__dirname, "..", "/input_files/");

module.exports.getAllFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(rootFolderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
};

module.exports.readFile = (filename) => {
  if (!filename) throw Error("No Filename provided!!");
  return new Promise((resolve, reject) => {
    const filePath = path.join(rootFolderPath, filename);
    fs.readFile(filePath, "utf8", (err, contents) => {
      if (err) {
        reject(err);
        return;
      }
      if (!contents.includes(dependsOnString)) {
        const errMsg = `readFile Error:: Invalid file '${filename}' detected.`;
        throw Error(errMsg);
      }
      resolve(contents);
    });
  });
};
