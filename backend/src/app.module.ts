import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import { Question } from './question/entities/question.entity';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/entities/answer.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'e08c05j00@',
      database: 'quizz',
      entities: [Question, Answer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Question, Answer]),
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
