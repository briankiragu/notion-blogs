// Import dependencies...
import Koa from "koa";
import Router from "koa-router";

// Create a Koa app instance.
const app = new Koa();

// Create a Koa-Router instance.
const router = new Router();

// Create a route.
router.get("/", async (ctx, next) => {
  // Create the body of the response.
  ctx.body = { msg: "Hello World!" };

  await next();
});

// Register the routes.
app.use(router.routes()).use(router.allowedMethods());

// Start the server.
app.listen(3000);
