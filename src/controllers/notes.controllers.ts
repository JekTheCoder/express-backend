import {Request, Response} from 'express';
import * as NoteService from '../services/note.services';

export async function getAllNotesByUser(request: Request, response: Response) {
    const { id } = request.params;
    const idParsed = Number(id);

    if (idParsed === NaN) return response.status(404).end();

    const posts = await NoteService.getAllNotesByUser(idParsed);
    return response.json(posts).end();
}