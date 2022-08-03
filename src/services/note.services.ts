import Note from "../database/models/note.model";

export interface newNote {
    userId: number
    content: string
}

export const getAllNotesByUser = (userId: number) => Note.findAll({ where: { userId } });
export const createOneNote = (note: newNote) => Note.create({ ...note });