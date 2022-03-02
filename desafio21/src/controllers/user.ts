import { Context, helpers } from "../devdeps.ts"
import { User } from "../model/user.ts";

const arr: any = []

export const findUser = async (ctx: Context)=>{
    try{
        const { id } = helpers.getQuery(ctx, {mergeParams: true});
        let user: User = arr.find((x:any)=>{
            return x.uuid === id
        })
        ctx.response.body = user
    }catch(err){
        ctx.response.body = {msg: err.message};
        ctx.response.status = 404;

    }
}

export const findUsersAll = async (ctx: Context)=>{
    try{
        ctx.response.body = arr;
    }catch(err){
        ctx.response.body = {msg: err.message};
        ctx.response.status = 404;

    }
}

export const createUser = async (ctx: Context)=>{
    try{
        const { name, birtData } = await ctx.request.body().value;
        let userNew: User = {
            uuid: (Math.random()).toString(),
            name,
            birtData
        }
        arr.push(userNew);
        ctx.response.body = userNew;
    }catch(err){
        ctx.response.body = {msg: err.message};
        ctx.response.status = 404;

    }
}