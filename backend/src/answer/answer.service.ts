import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) { }

    async create(answer: Answer): Promise<Answer> {
        const newAnswer = this.answerRepository.create(answer);
        return this.answerRepository.save(newAnswer);
    }

    async findAll(): Promise<Answer[]> {
        return this.answerRepository.find({ relations: ['question'] });
    }

    async findOne(id: number): Promise<Answer> {
        return this.answerRepository.findOne({ where: { id }, relations: ['question'] });
    }

    async update(id: number, answer: Answer): Promise<Answer> {
        await this.answerRepository.update(id, answer);
        return this.answerRepository.findOne({ where: { id }, relations: ['question'] });
    }

    async remove(id: number): Promise<void> {
        await this.answerRepository.delete(id);
    }
}
