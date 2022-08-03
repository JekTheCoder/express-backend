import {Request, Response} from 'express';

import * as NoteService from '../services/note.services';

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

export async function deleteOneNote(request: Request, response: Response) {
    const userAuth = response.locals.userAuth;
    const { id } = request.params;
    const idParsed = Number(id);

    if (idParsed === NaN) return response.status(400).end(); // TODO: Set a better http status code

    const rows = await NoteService.deleteOneNote(userAuth.id, idParsed);

    if (rows < 1) return response.status(400).json({ error: "Resource not deleted" }); // TODO: Set a better http status code

    response.status(204).end();
}