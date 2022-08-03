import { Router } from "express";
import userRoutes from "./v1/user.routes";
import noteRoutes from "./v1/note.routes";

const router = Router();

router
    .use('/v1/users', userRoutes)
    .use('/v1/notes', noteRoutes);

export default router;