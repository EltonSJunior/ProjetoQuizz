import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  createQuestion(@Body() question: Question): Promise<Question> {
    return this.questionService.createQuestion(question);
  }

  @Get()
  findAllQuestions(): Promise<Question[]> {
    return this.questionService.findAllQuestions();
  }

  @Get(':id')
  findOneQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionService.findOneQuestion(+id);
  }

  @Patch(':id')
  updateQuestion(@Param('id') id: string, @Body() question: Question): Promise<Question> {
    return this.questionService.updateQuestion(+id, question);
  }

  @Delete(':id')
  removeQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.removeQuestion(+id);
  }

  @Post(':questionId/answers')
  createAnswer(@Param('questionId') questionId: string, @Body() answer: Answer): Promise<Answer> {
    answer.question = { id: +questionId } as Question; // Define a relação com a questão
    return this.questionService.createAnswer(answer);
  }

  @Get(':questionId/answers')
  findAllAnswers(@Param('questionId') questionId: string): Promise<Answer[]> {
    return this.questionService.findAllAnswers();
  }

  @Get('answers/:id')
  findOneAnswer(@Param('id') id: string): Promise<Answer> {
    return this.questionService.findOneAnswer(+id);
  }

  @Patch('answers/:id')
  updateAnswer(@Param('id') id: string, @Body() answer: Answer): Promise<Answer> {
    return this.questionService.updateAnswer(+id, answer);
  }

  @Delete('answers/:id')
  removeAnswer(@Param('id') id: string): Promise<void> {
    return this.questionService.removeAnswer(+id);
  }
}
