import {Request, Response} from 'express';
import {  } from 'jsonwebtoken';

import * as NoteService from '../services/note.services';

export async function getAllNotesByUser(request: Request, response: Response) {
    const authHeader = request.get('authorization');

    if (!authHeader) return response.status(404).end();

    const [ auth, token ] = authHeader.split(' ') as [string, string?];

    // TODO: complete this
}
