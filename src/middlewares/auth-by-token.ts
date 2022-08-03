import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export async function authByToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.get('authorization');

    if (!authHeader) return response.status(404).end();

    const [ auth, token ] = authHeader.split(' ') as [string, string?];

    if (auth.toLowerCase() !== 'bearer' || !token) return response.status(401).end();

    const tokenDeco = verify(token, process.env.TOKEN_SECRET!);
    if (typeof tokenDeco === 'string' || !tokenDeco.id) return response.status(401).end();

    response.locals.userAuth = {
        id: tokenDeco.id,
        username: tokenDeco.username
    };

    return next();
}