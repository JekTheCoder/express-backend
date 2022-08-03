import { Router } from 'express';
import { getAllNotesByUser, auth, createOneNote } from '../controllers/notes.controllers';

const noteRoutes = Router();

noteRoutes
    .use('/', auth)
    .get('/', getAllNotesByUser)
    .post('/', createOneNote);

export default noteRoutes;