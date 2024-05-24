import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';

export interface QuestionCreate {
  text: string,
  answers: Answer[]
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) { }

  //Adicionar um try catch depois para tentar pegar erros
  async createQuestion(data: QuestionCreate): Promise<Question> {

    //Criando a questão primeiro para poder usar o id que será gerado nela para criar as respostas
    const newQuestion = this.questionRepository.create({ text: data.text, createdAt: new Date() });
    const savedQuestion = await this.questionRepository.save(newQuestion);

    //Criando as repostas e adicionando o id da questão criado acima
    const answerPromises = data.answers.map(answer => {
      const newAnswer = this.answerRepository.create({ ...answer, question: savedQuestion });
      return this.answerRepository.save(newAnswer);
    });

    //Esperando as promises rodarem para ver se deu tudo certo e aí sim salvando tudo no banco
    await Promise.all(answerPromises);

    //Retornando as perguntas e respostas criadas
    return this.questionRepository.findOne({ where: { id: savedQuestion.id }, relations: ['answers'] });
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['answers'] });
  }

  async findOneQuestion(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id }, relations: ['answers'] });
  }

  async updateQuestion(id: number, question: Question): Promise<Question> {
    await this.questionRepository.update(id, question);
    return this.questionRepository.findOne({ where: { id }, relations: ['answers'] });
  }

  async removeQuestion(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }

  async createAnswer(answer: Answer): Promise<Answer> {
    const newAnswer = this.answerRepository.create(answer);
    return this.answerRepository.save(newAnswer);
  }

  async findAllAnswers(): Promise<Answer[]> {
    return this.answerRepository.find({ relations: ['question'] });
  }

  async findOneAnswer(id: number): Promise<Answer> {
    return this.answerRepository.findOne({ where: { id }, relations: ['question'] });
  }

  async updateAnswer(id: number, answer: Answer): Promise<Answer> {
    await this.answerRepository.update(id, answer);
    return this.answerRepository.findOne({ where: { id }, relations: ['question'] });
  }

  async removeAnswer(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}
