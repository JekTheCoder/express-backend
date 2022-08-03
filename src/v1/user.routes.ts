import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser, getToken } from '../controllers/user.controllers';

const userRoutes = Router();

userRoutes
    .get('/', getAllUsers)
    .post('/', createOneUser)
    .post('/login', getToken)
    .get('/:id', getOneUser)

export default userRoutes;