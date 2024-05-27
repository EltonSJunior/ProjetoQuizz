import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        try {
            console.log(answer)
            const newAnswer = this.answerRepository.create(answer);
            return await this.answerRepository.save(newAnswer);
        } catch (error) {
            throw new InternalServerErrorException('Falha ao criar resposta!');
        }
    }

    async findAll(): Promise<Answer[]> {
        try {
            return await this.answerRepository.find({ relations: ['question'] });
        } catch (error) {
            throw new InternalServerErrorException('Falha ao buscar respostas!');
        }
    }

    async findOne(id: number): Promise<Answer> {
        try {
            const answer = await this.answerRepository.findOne({ where: { id }, relations: ['question'] });
            if (!answer) {
                throw new NotFoundException('Resposta não localizada!');
            }
            return answer;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Falha ao buscar resposta!');
        }
    }

    async update(id: number, answer: Answer): Promise<Answer> {
        try {
            await this.answerRepository.update(id, answer);
            const updatedAnswer = await this.answerRepository.findOne({ where: { id }, relations: ['question'] });
            if (!updatedAnswer) {
                throw new NotFoundException('Resposta não localizada!');
            }
            return updatedAnswer;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Falha ao atualizar a resposta!');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const result = await this.answerRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException('Reposta não localizada!');
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Falha ao remover resposta!');
        }
    }
}
