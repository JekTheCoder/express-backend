import {Request, Response} from 'express';
import { verify } from 'jsonwebtoken';

import * as NoteService from '../services/note.services';

export async function getAllNotesByUser(request: Request, response: Response) {
    const authHeader = request.get('authorization');

    if (!authHeader) return response.status(404).end();

    const [ auth, token ] = authHeader.split(' ') as [string, string?];

    if (auth.toLowerCase() !== 'bearer' || !token) return response.status(401).end();

    const tokenDeco = verify(token, process.env.TOKEN_SECRET!);
    if (typeof tokenDeco === 'string' || !tokenDeco.id) return response.status(401).end();

    const notes = await NoteService.getAllNotesByUser(tokenDeco.id);

    return response.json(notes);
}
