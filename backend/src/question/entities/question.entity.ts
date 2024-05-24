import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    createdAt: Date;

    @OneToMany(() => Answer, answer => answer.question, { cascade: true })
    answers: Answer[];
}
