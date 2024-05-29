import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
                req['user'] = decoded;
                next();
            } catch (err) {
                return res.status(403).json({ message: 'Token não é válido!' });
            }
        } else {
            return res.status(401).json({ message: 'Sem autorização!!' });
        }
    }
}
