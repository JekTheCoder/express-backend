import Note from "../database/models/note.model";

export interface newNote {
    content: string
}

export const getAllNotesByUser = (id: number) => Note.findAll({ where: { userId: id } });