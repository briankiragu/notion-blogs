/**
 * Convert a string to a slug.
 *
 * @param {string} str Regular tring to be converted
 *
 * @returns {string} Lowercase string with all the special characters removed
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

/**
 * Create a folder name for a page.
 *
 * @param {Record<string, any>} page The page the folder is being created for.
 * @param {string} dir The directory the folder is being created in.
 *
 * @returns {string} The folder name.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const toPageFolderName = (page, dir = "./data") =>
  `${dir}/${toSlug(
    `${new Date(page.last_edited_time).toDateString()} ${page.title}`
  )}`;

// Export the methods.
export { toSlug, toPageFolderName };
