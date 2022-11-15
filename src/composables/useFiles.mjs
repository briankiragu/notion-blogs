import { existsSync, readFileSync, writeFileSync } from "node:fs";

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
const writeMasterList = (id, data, dir = "./data") => {
  // Create the filename.
  const filename = `${dir}/${id}.json`;

  // Write the data into the file.
  writeFileSync(filename, JSON.stringify(data));
};

/**
 * Read the contents of a master JSON file.
 *
 * @param {string} id ID of the journal to get the master file for.
 * @param {string} dir The directory to write the file to. Defaults to the data directory.
 *
 * @returns {Record<string, any>} The contents of the file
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const readMasterList = (id, dir = "./data") => {
  // Create the filename.
  const filename = `${dir}/${id}.json`;

  // Check if the file exists.
  if (!existsSync(filename)) {
    // If the file does not exist, throw an error.
    throw new Error(`The file does not exist.`);
  }

  // Read the file.
  return JSON.parse(readFileSync(filename).toString());
};

// Export the methods.
export { readMasterList, writeMasterList };
