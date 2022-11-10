// Import dependencies...
import Router from "koa-router";

// Import composables...
import { getJournals, getPages } from "./composables/useData.mjs";
import { readMasterList, writeMasterList } from "./composables/useFiles.mjs";
import { formatPages } from "./composables/useFormatting.mjs";

// Create a Koa-Router instance.
const router = new Router();

/**
 * Get the journals from the database based on the name and use the first one to get all the pages. Use the pages to create a master JSON file.
 */
router.get("journal", "/journals", async (ctx, next) => {
  try {
    // Get the database from the API.
    const journals = await getJournals(`MMM Blog`);

    // If the journals are empty, throw an error.
    if (!journals.results.length) {
      throw new Error(`Error: There is no journal with this name.`);
      // If the journals are more than 1, throw an error message.
    } else if (journals.results.length > 1) {
      throw new Error(
        `Error: There is more than one journal with the same name.`
      );
    }

    // Get the pages from the API using the journal ID.
    const pages = await getPages(journals.results[0].id);

    // Get the formatted pages.
    const formattedPages = formatPages(pages);

    // Create a master list from the pages.
    writeMasterList(journals.results[0].id, formattedPages);

    // Read the master list.
    const data = readMasterList(journals.results[0].id);

    // Set the response body.
    ctx.body = data;
  } catch (error) {
    // Return the error message as the body.
    ctx.body = error.message;
  } finally {
    await next();
  }
});

// Export the router.
export default router;
