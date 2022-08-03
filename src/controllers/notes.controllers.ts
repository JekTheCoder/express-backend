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