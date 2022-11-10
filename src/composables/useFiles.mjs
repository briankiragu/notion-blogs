/**
 *
 * @param {Record<string, any>[]} data The data to write to the file.
 * @param {string} dir The directory to write the file to. Defaults to the data directory.
 *
 * @returns {string} The path to the file.
 */
const createMasterList = (data, dir = "./data") => {
  // Create the filename.
  const filename = `${dir}/master-list.json`;

  // Return the path to the file.
  return filename;
};

// Export the methods.
export { createMasterList };
