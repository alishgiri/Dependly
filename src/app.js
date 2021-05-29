const _ = require("./utils/logger");
const {
  generateRelations,
  createArrFromFileData,
} = require("./utils/helper_functions");
const { readFile, getAllFiles } = require("./utils/file_reader");

_.logAppStart();

const analyseDependencies = async () => {
  try {
    const files = await getAllFiles();
    files.forEach(async (filename) => {
      const data = await readFile(filename);
      _.logFileAnaysis(filename);
      const extractedContentArr = createArrFromFileData(data);
      generateRelations(extractedContentArr);
      _.logEmptyLine();
    });
  } catch (e) {
    _.logError(e);
  }
};

analyseDependencies();
