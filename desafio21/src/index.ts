import { Application } from "./devdeps.ts";
import {router} from "./routes/index.ts";

const app = new Application();
app.use(router.routes());

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

app.listen({ port: 8080 });