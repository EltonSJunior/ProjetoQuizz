import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private connection: DataSource,
  ) { }

  async createQuestion(data: QuestionCreate): Promise<Question> {
    //Criando uma transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //Criando a questão primeiro para poder usar o id que será gerado nela para criar as respostas
      const newQuestion = this.questionRepository.create({ text: data.text });
      const savedQuestion = await queryRunner.manager.save(newQuestion);

      //Criando as repostas e adicionando o id da questão criado acima
      const answerPromises = data.answers.map(answer => {
        const newAnswer = this.answerRepository.create({ ...answer, question: savedQuestion });
        return queryRunner.manager.save(newAnswer);
      });

      //Esperando as promises rodarem para ver se deu tudo certo e aí sim salvando tudo no banco
      await Promise.all(answerPromises);

      //Comitando a transaction
      await queryRunner.commitTransaction();

      //Retornando as perguntas e respostas criadas
      return this.questionRepository.findOne({ where: { id: savedQuestion.id }, relations: ['answers'] });
    } catch (error) {
      //Rollback para caso haja erro
      await queryRunner.rollbackTransaction();
      //Jogando mensagem de erro para quando ouver alguma falha
      throw new InternalServerErrorException("Falha ao criar questão!")
    } finally {
      //Liberando a transaction
      await queryRunner.release();
    }
  }

  //Find All padrão apenas buscando as perguntas e respostas associadas
  async findAllQuestions(): Promise<Question[]> {
    try {
      return this.questionRepository.find({ relations: ['answers'] });
    } catch (error) {
      throw new InternalServerErrorException("Erro ao buscar questões!")
    }
  }

  //Find One padrão buscando pergunta e respostas associadas
  async findOneQuestion(id: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findOne({ where: { id }, relations: ['answers'] })
      if (!question) {
        throw new NotFoundException('Questão não localizada!');
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao buscar questão!")
    }
  }

  async updateQuestion(id: number, data: QuestionCreate): Promise<Question> {
    //Criando uma transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //Verificando se a pergunta existe
      const existingQuestion = await this.questionRepository.findOne({ where: { id }, relations: ['answers'] })
      if (!existingQuestion) {
        throw new NotFoundException('Questão não localizada!');
      }

      //Atualizando a pergunta
      await this.questionRepository.update(id, { text: data.text });

      //Verificando se estão sendo passadas respostas no data
      if (data.answers) {
        //Se tiver novas respostas para atualizar, as antigas são deletadas
        await queryRunner.manager.delete(Answer, { question: { id } });

        //E depois são criadas novas respostas com base nas recebidas no data
        const answerPromises = data.answers.map((answer) => {
          const newAnswer = this.answerRepository.create({ ...answer, question: existingQuestion });
          return queryRunner.manager.save(newAnswer);
        });

        //Esperando as promises rodarem para ver se tá tudo ok
        await Promise.all(answerPromises);
      }

      //Fazendo o commit da transaction
      await queryRunner.commitTransaction();

      //Retornando a pergunta e respostas atualizadas
      return this.questionRepository.findOne({ where: { id }, relations: ['answers'] });

    } catch (error) {
      //Se tiver achado algum erro vai dar um rollback na transaction e cancelar tudo
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao atualizar a questão!');
    } finally {
      //Se deu tudo certo ele libera a transaction
      await queryRunner.release();
    }
  }

  async removeQuestion(id: number): Promise<{ message: string }> {
    //Criando uma transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //Deletando as respostas associdas a pergunta
      await queryRunner.manager.delete(Answer, { question: { id } })

      //Deletando a pergunta
      const result = await queryRunner.manager.delete(Question, id);
      if (result.affected === 0) {
        throw new NotFoundException('Questão não localizada!');
      }

      //Comitando a transaction
      await queryRunner.commitTransaction();

      //Mensagem confirmando
      return { message: 'Questão removida com sucesso' }
    } catch (error) {
      //Se der erro faz o rollback pra cancelar as ações
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao remover a questão!');
    } finally {
      //Se der tudo certo libera a transaction
      await queryRunner.release();
    }
  }
}
