// Import dependencies...
import Router from "koa-router";

// Import composables...
import { getJournals, getPages } from "./composables/useData.mjs";
import {
  manageFolders,
  readMasterList,
  writeMasterList,
} from "./composables/useFileSystem.mjs";
import { toSlug } from "./composables/useFormatting.mjs";
import { compareData, prepareData } from "./composables/usePages.mjs";

// Create a Koa-Router instance.
const router = new Router();

/**
 * Get the journals from the database based on the name and use the first one to get all the pages.
 * Use the pages to create a master JSON file.
 */
router.get("journal", "/journals", async (ctx, next) => {
  try {
    // Get the title from the URL.
    const { title } = ctx.query;

    // Get the slug from the title.
    const slug = toSlug(title);

    // Get the database from the API.
    const journals = await getJournals(title);

    // If the journals are empty, throw an error.
    if (!journals.results.length) {
      throw new Error(`There is no journal with the name: ${title}`);
      // If the journals are more than 1, throw an error message.
    } else if (journals.results.length > 1) {
      throw new Error(
        `There is more than one journal with the same name: ${title}`
      );
    }

    // Get the pages from the API using the journal ID.
    const pages = await getPages(journals.results[0].id);

    // Get the formatted pages.
    const incomingPages = prepareData(pages);

    // Read the current master list.
    let existingPages = readMasterList(slug, `./data/${slug}`);

    // If the master list does not exist, set the existing pages results to an empty array.
    if (!existingPages) {
      existingPages = { results: [] };
    }

    // Compare the incoming data with the existing data.
    const { toStore, toUpdate, toDestroy } = compareData(
      incomingPages.results,
      existingPages.results
    );

    // Generate the folders.
    manageFolders({ toStore, toUpdate, toDestroy }, `./data/${slug}`);

    // Create a master list from the pages.
    writeMasterList(slug, incomingPages, `./data/${slug}`);

    // Set the response body.
    ctx.body = `
      Successfully updated the master list:
        ${toStore.length} page(s) added.
        ${toUpdate.length} page(s) updated.
        ${toDestroy.length} page(s) deleted.
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
