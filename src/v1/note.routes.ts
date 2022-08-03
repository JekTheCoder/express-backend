import { Router } from 'express';
import { getAllNotesByUser, createOneNote } from '../controllers/notes.controllers';
import { authByToken } from '../middlewares/auth-by-token';

const noteRoutes = Router();

noteRoutes
    .use('/', authByToken)
    .get('/', getAllNotesByUser)
    .post('/', createOneNote);

export default noteRoutes;