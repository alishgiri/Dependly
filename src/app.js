const _ = require("./utils/logger");
const {
  generateRelations,
  createObjectFromFileData,
} = require("./utils/helper_functions");
const { readFile, getAllFiles } = require("./utils/file_reader");

_.logAppStart();

const analyseDependencies = async () => {
  try {
    const files = await getAllFiles();
    files.forEach(async (filename, index) => {
      const data = await readFile(filename);
      _.logFileAnaysis(filename);
      const extractedContentObj = createObjectFromFileData(data);
      generateRelations(extractedContentObj);
      _.logEmptyLine();
    });
  } catch (e) {
    _.logError(e);
  }
};

analyseDependencies();
