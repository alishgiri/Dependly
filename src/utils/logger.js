module.exports.logAppStart = () => {
  console.log(" ");
  console.log("@80,000 Hours");
  console.log(" ");
  console.log("           === DEPENDLY ===");
  console.log(" ");
};

module.exports.logFileAnaysis = (filename) => {
  console.log("---------------------------");
  console.log("File", filename, "Analysis");
  console.log("---------------------------");
};

module.exports.logRelations = (relation) => {
  console.log("-", relation);
};

module.exports.logEmptyLine = () => {
  console.log(" ");
};

module.exports.logError = (error) => {
  console.error(error);
};

module.exports.logAppEnd = () => {
  console.log(" ");
  console.log("                === END ===");
  console.log(" ");
};
