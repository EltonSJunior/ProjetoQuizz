import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async create(username: string, password: string): Promise<User> {
        const hashedPassword = hashPassword(password)
        const user = this.usersRepository.create({ username, password: hashedPassword });
        return this.usersRepository.save(user);
    }
}
