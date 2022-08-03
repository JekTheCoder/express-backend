import {Request, Response} from 'express';
import * as UserServices from '../services/user.services';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const getAllUsers = async (request: Request, response: Response) => {
    response.json(await UserServices.getAllUsers());
}

export const createOneUser = async (request: Request, response: Response) => {
    const { username, name, password } = request.body;

    if (!username || !password) return response.status(400).end();
    if (typeof username !== 'string' || typeof password !== 'string' || typeof name !== 'string') return response.status(400).end();
    
    const existUser = await UserServices.getOneUserByUsername(username);
    if (existUser) return response.status(400).json({ error: "User already exists" });

    const user = await UserServices.createOneUser({ username, name, password });

    const token = sign({ id: user.id, username }, process.env.TOKEN_SECRET!);
    response.status(201).json({ username, name, token });
}

export const getOneUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) return response.status(400).end();

    const idNumber = Number(id);

    if (idNumber === NaN) return response.status(400).end();

    const user = await UserServices.getOneUserById(idNumber);

    if (!user) return response.status(404).end();
    return response.json(user);
}

export async function getToken(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) return response.status(403).end();
    if (typeof username !== 'string' || typeof password !== 'string') return response.status(400).end();
    
    const user = await UserServices.getOneUserByUsername(username);

    if (
        !user || 
        !compareSync(password, user.password)
    ) return response.status(403).end();

    const token = sign({ id: user.id, username }, process.env.TOKEN_SECRET!);

    response.status(200).json({ username, name: user.name, token });
}