import {Request, Response} from 'express';
import * as UserServices from '../services/user.services';
import { NewUser } from '../services/user.services';

export const getAllUsers = async (request: Request, response: Response) => {
    response.json(await UserServices.getAllUsers());
}

export const createOneUser = async (request: Request, response: Response) => {
    const { name, password } = request.body;

    if (!name || !password) return response.status(400).end();
    if (typeof name !== 'string' || typeof password !== 'string') return response.status(400).end();
    
    await UserServices.createOneUser({ name, password });
    response.status(201).end();
}

export const getOneUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) return response.status(400).end();

    const idNumber = Number(id);

    if (idNumber === NaN) return response.status(400).end();

    const user = await UserServices.getOneUser(idNumber);

    if (!user) return response.status(404).end();
    return response.json(user);
}

export async function getToken(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) return response.status(403).end();
    if (typeof username !== 'string' || typeof password !== 'string') return response.status(400).end();
    
    // TODO: Complete this
}