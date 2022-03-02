import {Context, helpers} from '../devdeps'
import {User} from '../types/user'

const arr:any = [];

export const findUser = async (ctx:Context)=>{
    try{
        const {id} = helpers.getQuery(ctx, {mergeParams: true});
        let user: User = arr.find((x:any)=>{
            return x.uuid = id;            
        });
        ctx.response.body = user;

    }catch(err){
        ctx.response.status = 404;
        ctx.response.body = {msg:err.message};
    }
}

export const findUserAll = async (ctx:Context)=>{
    try{
        ctx.response.body = arr;

    }catch(err){
        ctx.response.status = 404;
        ctx.response.body = {msg:err.message};
    }
}

export const createUser = async (ctx:Context)=>{
    try{
        const {name, birthdate} = ctx.request.body().value
        let userNew: User = {
            uuid: (Math.random()).toString(),
            name,
            birthdate
        }
        arr.push(userNew);
        ctx.response.body = userNew;

    }catch(err){
        ctx.response.status = 404;
        ctx.response.body = {msg:err.message};
    }
}