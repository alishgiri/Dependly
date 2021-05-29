const {
  createArrFromFileData,
  generateRelations,
} = require("../src/utils/helper_functions");
const { readFile, getAllFiles } = require("../src/utils/file_reader");

describe("Utility Functions Tests", () => {
  let convertedFileDataObj;
  let extractedFileContents;
  const filename = "INPUT2.txt";

  test(`should get all filenames from 'src/input_files/' folder`, async () => {
    const files = await getAllFiles();
    expect(files).toBeDefined();
    expect(files).not.toBeNull();
    expect(files.length).toBeGreaterThanOrEqual(3);

    const expectedFiles = ["INPUT1.txt", "INPUT2.txt", "INPUT3.txt"];
    expect(files).toEqual(expect.arrayContaining(expectedFiles));
  });

  test(`should read file ${filename} from src/input_files/ folder and extract its contents`, async () => {
    const contents = await readFile(filename);
    expect(contents).toBeDefined();
    expect(contents).not.toBeNull();
    expect(contents).toMatch(
      "Y depends on Z\nA depends on Q R S\nX depends on Y\nZ depends on A B\n"
    );
    expect(contents).not.toMatch(
      "Y depends on y\nA depends on Q R S\nu depends on Y\nZ depends on A B\n"
    );
    extractedFileContents = contents;
  });

  test("should create array of key-value pair from file-data passed", () => {
    expect(extractedFileContents).toBeDefined();
    expect(extractedFileContents).not.toBeNull();

    convertedFileDataObj = createArrFromFileData(extractedFileContents);
    expect(convertedFileDataObj).toBeDefined();
    expect(convertedFileDataObj).not.toBeNull();

    expect(convertedFileDataObj).toEqual([
      { lib: "Y", dependencies: ["Z"] },
      { lib: "A", dependencies: ["Q", "R", "S"] },
      { lib: "X", dependencies: ["Y"] },
      { lib: "Z", dependencies: ["A", "B"] },
    ]);
    expect(convertedFileDataObj).not.toEqual([
      { lib: "Y", dependencies: ["Z"] },
      { lib: "A", dependencies: ["Q", "u", "S"] },
      { lib: "X", dependencies: ["Y"] },
      { lib: "Z", dependencies: ["A", "B"] },
    ]);
  });

  test("should generate library relations based on extracted contents from file", () => {
    expect(convertedFileDataObj).toBeDefined();
    expect(convertedFileDataObj).not.toBeNull();

    const relations = generateRelations(convertedFileDataObj);
    expect(relations).toBeDefined();
    expect(relations).not.toBeNull();

    expect(relations[0]).toMatch("Y depends on A B Z");
    expect(relations[1]).toMatch("A depends on Q R S");
    expect(relations[2]).toMatch("X depends on A B Y Z");
    expect(relations[3]).toMatch("Z depends on A B Q R S");
    expect(relations[4]).toBeUndefined();
  });
});
