// Import dependencies...
import Router from "koa-router";

// Import composables...
import { getJournals, getPages } from "./composables/useData.mjs";

// Create a Koa-Router instance.
const router = new Router();

// Create a route.
router.get("/", async (ctx, next) => {
  try {
    // Get the database from the API.
    const journals = await getJournals(`MMM Blog`);

    // If the journals are more than 0, return an error message.
    if (journals.results.length > 1) {
      throw new Error(
        `Error: There is more than one journal with the same name.`
      );
    }

    // Get the pages from the API using the journal ID.
    const pages = await getPages(journals.results[0].id);

    // Set the response body.
    ctx.body = pages;
  } catch (error) {
    // Return the error message as the body.
    ctx.body = error.message;
  } finally {
    await next();
  }
});

// Export the router.
export default router;
