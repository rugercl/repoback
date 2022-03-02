import { Application } from "../devdeps";

const app = new Application();

app.use(
    (ctx) => {
        ctx.response.body = "Hello World";
    }
);

console.log(`Server running on port 8080`);

await app.listen({ port: 8080 });