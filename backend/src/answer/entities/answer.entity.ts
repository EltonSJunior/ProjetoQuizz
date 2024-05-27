import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

//Adicionar uma unique key para as respostas (idQuestion, text)?
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;
}
