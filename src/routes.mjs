// Import dependencies...
import Router from "koa-router";

// Import composables...
import { getJournals, getPages } from "./composables/useData.mjs";
import { readMasterList, writeMasterList } from "./composables/useFiles.mjs";
import {
  compareData,
  manageFolders,
  prepareData,
} from "./composables/usePages.mjs";

// Create a Koa-Router instance.
const router = new Router();

/**
 * Get the journals from the database based on the name and use the first one to get all the pages.
 * Use the pages to create a master JSON file.
 */
router.get("journal", "/journals", async (ctx, next) => {
  try {
    // Get the database from the API.
    const journals = await getJournals(`MMM Blog`);

    // If the journals are empty, throw an error.
    if (!journals.results.length) {
      throw new Error(`There is no journal with this name.`);
      // If the journals are more than 1, throw an error message.
    } else if (journals.results.length > 1) {
      throw new Error(`There is more than one journal with the same name.`);
    }

    // Get the pages from the API using the journal ID.
    const pages = await getPages(journals.results[0].id);

    // Get the formatted pages.
    const incomingPages = prepareData(pages);

    // Read the current master list.
    const existingPages = readMasterList("mmm-blog");

    // Compare the incoming data with the existing data.
    const comparedPages = compareData(
      incomingPages.results,
      existingPages.results
    );

    // Generate the folders.
    manageFolders(comparedPages);

    // Create a master list from the pages.
    writeMasterList("mmm-blog", incomingPages);

    // Set the response body.
    ctx.body = `
      Successfully updated the master list:
        ${comparedPages.toStore.length} new page(s) was found.
        ${comparedPages.toUpdate.length} updated page(s) was found.
        ${comparedPages.toDestroy.length} deleted page(s) was found.
    `;
  } catch (error) {
    // Return the error message as the body.
    ctx.body = error.message;
  } finally {
    await next();
  }
});

// Export the router.
export default router;
