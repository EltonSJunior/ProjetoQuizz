import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from '../entities/question.entity';

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
  removeQuestion(@Param('id') id: string): Promise<{ message: string }> {
    return this.questionService.removeQuestion(+id);
  }
}
