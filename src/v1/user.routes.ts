import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser } from '../controllers/user.controllers';

const userRoutes = Router();

userRoutes
    .get('/', getAllUsers)
    .post('/', createOneUser)
    .get('/:id', getOneUser)

export default userRoutes;