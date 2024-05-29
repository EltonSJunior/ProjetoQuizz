import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { verificarSenha } from 'src/utils/hash';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && verificarSenha(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string) {
        const response = await this.validateUser(username, password);
        if (response) {
            const token = jwt.sign({ username: response.username, sub: response.id }, process.env.PRIVATE_KEY)
            return { access_token: token }
        }
        return { message: 'Sem autorização!' };
    }
}
