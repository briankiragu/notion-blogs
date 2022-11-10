// Import dependencies...
import Koa from "koa";

// Import router.
import router from "./routes.mjs";

// Create a Koa app instance.
const app = new Koa();

// Register the routes.
app.use(router.routes()).use(router.allowedMethods());

// Start the server.
app.listen(3000);
