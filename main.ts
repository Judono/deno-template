import "@std/dotenv/load";
import { Hono, type Context } from 'hono'
// import mongo from './src/config/mongo.ts'
import errorHandler from "./src/middlewares/error-handling.ts";
import { UserContext } from "./src/user-context.ts";
import Routes from "./src/routes/index.ts";

type Variables = {
  user: UserContext
}

// connect to mongodb
// await mongo.connect();

// seed mongodb
// await mongo.seed();

const app = new Hono<{Variables: Variables}>().basePath('/api');

app.get('/', (c: Context) => {
  return c.text('Blank template says Hello world!');
})

app.route('/', Routes);

app.onError(errorHandler);

Deno.serve({ port: Number(Deno.env.get("PORT")) || 3000 }, app.fetch)