// Import and instantiate dotenv.
import dotenv from "dotenv";
dotenv.config();

// Import dependencies...
import Koa from "koa";
import Router from "koa-router";

// Import composables...
import { getJournals, getPages } from "./composables/useData.mjs";

// Create a Koa app instance.
const app = new Koa();

// Create a Koa-Router instance.
const router = new Router();

// Create a route.
router.get("/", async (ctx, next) => {
  // Get the database from the API.
  ctx.body = {
    journals: await getJournals(`MMM Blog`),
    pages: await getPages(`acf094ca-ee9d-45e3-bb8e-d67bb8547c02`),
  };

  await next();
});

// Register the routes.
app.use(router.routes()).use(router.allowedMethods());

// Start the server.
app.listen(3000);
