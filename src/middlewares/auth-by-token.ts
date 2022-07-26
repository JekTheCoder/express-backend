import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getOneUserById } from '../services/user.services';

export async function authByToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.get('authorization');

    if (!authHeader) return response.status(401).json({ error: "token missing" });

    const [ auth, token ] = authHeader.split(' ') as [string, string?];

    if (auth.toLowerCase() !== 'bearer' || !token) return response.status(401).end();


    let tokenDeco: any;

    try {
        tokenDeco = verify(token, process.env.TOKEN_SECRET!);
    }
    catch { return response.status(401).json({ error: "token invalid" }); }

    if (typeof tokenDeco === 'string' || !tokenDeco.id) return response.status(401).end();

    const user = await getOneUserById(tokenDeco.id);

    if (!user) return response.status(404).json({ error: "token invalid" });

    response.locals.userAuth = {
        id: tokenDeco.id,
        username: tokenDeco.username
    };

    return next();
}