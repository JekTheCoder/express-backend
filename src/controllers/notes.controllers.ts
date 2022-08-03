import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import * as NoteService from '../services/note.services';

export async function auth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.get('authorization');

    if (!authHeader) return response.status(404).end();

    const [ auth, token ] = authHeader.split(' ') as [string, string?];

    if (auth.toLowerCase() !== 'bearer' || !token) return response.status(401).end();

    const tokenDeco = verify(token, process.env.TOKEN_SECRET!);
    if (typeof tokenDeco === 'string' || !tokenDeco.id) return response.status(401).end();

    response.locals.userAuth = {
        id: tokenDeco.id,
        username: tokenDeco.username
    };

    return next();
}

export async function getAllNotesByUser(request: Request, response: Response) {
    const { id, username } = response.locals.userAuth;

    const notes = await NoteService.getAllNotesByUser(id);

    return response.json(notes);
}

export async function createOneNote(request: Request, response: Response) {
    const { id, username } = response.locals.userAuth;
    const { content } = request.body;

    if (!content) return response.status(400).json({ error: "Content required" });

    const note = await NoteService.createOneNote({ content, userId: id });

    return response.status(201).json(note);
}