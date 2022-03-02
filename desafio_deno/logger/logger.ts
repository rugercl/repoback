import { Context } from "../devdeps";

export const logger = async (ctx: Context, next: () => void) => {
    await next();
    const body = await ctx.response.body().value;
    const params = body ? `with params: ${JSON.stringify(body)}` : "";
    console.log(`${ctx.request.method} ${ctx.request.url} ${params}`);
}