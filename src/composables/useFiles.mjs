import { writeFile } from "node:fs";

/**
 * Create a master JSON file with the pages from a journal.
 *
 * @param {string} id The id of the journal to create the master file for.
 * @param {Record<string, any>[]} data The data to write to the file.
 * @param {string} dir The directory to write the file to. Defaults to the data directory.
 *
 * @returns {Promise<string>} The path to the file.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const writeMasterList = async (id, data, dir = "./src/data") => {
  // Create the filename.
  const filename = `${dir}/${id}.json`;

  // Write the data into the file.
  writeFile(filename, JSON.stringify(data), (error) => {
    throw new Error(error);
  });

  // Return the path to the file.
  return filename;
};

// Export the methods.
export { writeMasterList };
