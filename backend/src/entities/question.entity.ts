import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Answer, answer => answer.question, { cascade: true })
    answers: Answer[];
}
