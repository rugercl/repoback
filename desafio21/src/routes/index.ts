import { Router } from "../devdeps.ts";

import{
    findUsersAll, findUser, createUser
} from '../controllers/user.ts';

export const router = new Router()
.get("/api/users", findUsersAll)
.get("/api/users/id", findUser)
.post("/api/users", createUser)