import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from 'src/entities/answer.entity';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @Post()
  create(@Body() answer: Answer): Promise<Answer> {
    return this.answerService.create(answer);
  }

  @Get()
  findAll(): Promise<Answer[]> {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Answer> {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() answer: Answer): Promise<Answer> {
    return this.answerService.update(+id, answer);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.answerService.remove(+id);
  }
}
