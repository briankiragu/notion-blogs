// Import dependencies...
import Koa from "koa";
import Router from "koa-router";

// Import middleware dependencies...
import logger from "koa-logger";

// Import composables...
import { getJournals } from "./composables/useData.mjs";

// Create a Koa app instance.
const app = new Koa();

// Create a Koa-Router instance.
const router = new Router();

// Create a route.
router.get("/", async (ctx, next) => {
  // Get the database from the API.
  ctx.body = await getJournals(`MMM Blog`);

  await next();
});

// Register the middleware...
app.use(logger());

// Register the routes.
app.use(router.routes()).use(router.allowedMethods());

// Start the server.
app.listen(3000);
