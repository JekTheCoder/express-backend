import { Router } from 'express';
import { getAllNotesByUser } from '../controllers/notes.controllers';

const noteRoutes = Router();

noteRoutes.get('/:id', getAllNotesByUser);

export default noteRoutes;