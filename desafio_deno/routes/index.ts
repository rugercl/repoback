import { Router } from "../devdeps";

import {
    findUser,
    findUserAll,
    createUser
} from '../controllers/user';

export const router = new Router()
.get('/api/users/:id', findUser)
.get('/api/users', findUserAll)
.get('/api/users', createUser)

