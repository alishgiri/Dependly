const _ = require("./services/logger");
const {
  generateRelationsFrom,
  createArrFromFileData,
} = require("./utils/helper_functions");
const { readFile, getAllFiles } = require("./services/file_reader");

_.logAppStart();

const analyseDependencies = async () => {
  try {
    const files = await getAllFiles();
    files.forEach(async (filename) => {
      const data = await readFile(filename);
      _.logFileAnaysis(filename);
      const extractedContentArr = createArrFromFileData(data);
      generateRelationsFrom(extractedContentArr);
      _.logEmptyLine();
    });
  } catch (e) {
    _.logError(e);
  }
};

analyseDependencies();
