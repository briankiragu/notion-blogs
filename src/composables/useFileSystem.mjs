import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { authenticate, enqueuePageExport } from "./useData.mjs";
import { toPageFolderName } from "./useFormatting.mjs";

/**
 * Read the contents of a master JSON file.
 *
 * @param {string} id ID of the journal to get the master file for.
 * @param {string} dir The directory to write the file to. Defaults to the data directory.
 *
 * @returns {Record<string, any> | undefined} The contents of the file
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const readMasterList = (id, dir = "./data") => {
  // Create the filename.
  const filename = `${dir}/${id}.json`;

  // Check if the file exists.
  if (!existsSync(filename)) {
    // If the file does not exist, return undefined
    return undefined;
  }

  // Read the file.
  return JSON.parse(readFileSync(filename).toString());
};

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
  // Create the directory if it does not exist.
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  // Create the filename.
  const filename = `${dir}/${id}.json`;

  // Write the data into the file.
  writeFileSync(filename, JSON.stringify(data));
};

/**
 * This function creates, updates and destroys folders & config files and downloads the HTML (zip) files from the Notion API.
 *
 * @param {Record<string, any>} data The data to create, update and/or destroy.
 * @param {string} dir The directory of the data. Defaults to the data directory.
 *
 * @returns {Promise<void>} A promise that resolves when the data has been created, updated and/or destroyed.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const manageFolders = async (
  { toStore, toUpdate, toDestroy },
  dir = "./data"
) => {
  // Make a request to authenticate with the Notion API. This is required to download the HTML (zip) files.
  const credentials = await authenticate();

  // Create the directory if it does not exist.
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  // For each page to store, create a folder and config file.
  toStore.forEach(async (page) => {
    // Get the folder name.
    const foldername = toPageFolderName(page, dir);

    // Create the folder.
    mkdirSync(foldername);

    // Download the page content (HTML zip file).
    const taskId = await enqueuePageExport(page.id);

    // Create the config file.
    writeFileSync(
      `${foldername}/config.json`,
      JSON.stringify({ ...page, ...{ enqueueId: taskId } })
    );
  });

  // For each page to update from, destroy the existing folder and create a new one with a config file.
  toUpdate.forEach(async ({ from, to }) => {
    // Get the outdated folder name.
    let foldername = toPageFolderName(from, dir);

    // Destroy the folder.
    rmSync(foldername, { recursive: true, force: true });

    // Get the new folder name.
    foldername = toPageFolderName(to, dir);

    // Create the folder.
    mkdirSync(foldername);

    // Download the page content (HTML zip file).
    const taskId = await enqueuePageExport(to.id);

    // Create the config file.
    writeFileSync(
      `${foldername}/config.json`,
      JSON.stringify({
        ...to,
        ...{ enqueueId: taskId },
      })
    );
  });

  // For each page to destroy, destroy the folder.
  toDestroy.forEach((page) => {
    // Get the folder name.
    const foldername = toPageFolderName(page, dir);

    // Destroy the folder.
    rmSync(foldername, { recursive: true, force: true });
  });

  return credentials;
};

// Export the methods.
export { readMasterList, writeMasterList, manageFolders };
