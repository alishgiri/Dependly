module.exports.logAppStart = () => {
  console.log(" ");
  console.log("    === DEPENDLY ===");
  console.log(" ");
  console.log("      80,000 Hours");
  console.log(" ");
};

module.exports.logFileAnaysis = (filename) => {
  console.log("---------------------------");
  console.log("File", filename, "Analysis");
  console.log("---------------------------");
};

module.exports.logRelation = (relation) => {
  console.log("-", relation);
};

module.exports.logEmptyLine = () => {
  console.log(" ");
};

module.exports.logError = (error) => {
  console.error(error);
};
