const _ = require("./utils/logger");
const {
  generateRelations,
  createObjectFromFileData,
} = require("./utils/helper_functions");
const { readFile } = require("./utils/read_file");
const { filesToProcess } = require("./utils/constants");

_.logAppStart();

const analyseDependencies = async (filename) => {
  try {
    const data = await readFile(filename);
    _.logFileAnaysis(filename);
    const extractedContentObj = createObjectFromFileData(data);
    generateRelations(extractedContentObj);
    _.logEmptyLine();
  } catch (e) {
    _.logError(e);
  }
};

Promise.all([
  ...filesToProcess.map((file) => analyseDependencies(file)),
]).finally(() => _.logAppEnd());
