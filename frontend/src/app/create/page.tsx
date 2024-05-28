'use client';
import { post } from '@/api/api';
import { AnswerInput } from '@/components/AnswerInput';
import { QuestionData } from '@/interfaces/interfaces';
import { useState, ChangeEvent, FormEvent, FC } from 'react';

const CreateQuestion: FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleAnswerChange = (index: number, value: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!question.trim() || answers.some(answer => !answer.trim())) {
            alert('Por favor, preencha a pergunta e todas as respostas.');
            return;
        }

        const data: QuestionData = {
            text: question,
            answers: answers.map((answer, index) => ({
                text: answer,
                isCorrect: index === correctAnswerIndex,
            })),
        };
        setIsSubmitting(true);

        try {
            const response = await post('questions', data);

            if (response.ok) {
                alert('Pergunta criada com sucesso!');
                setQuestion('');
                setAnswers(['', '', '', '', '']);
            } else {
                alert('Erro ao criar pergunta.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar pergunta.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl text-black font-bold mb-4">Criar Nova Pergunta</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Pergunta</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {answers.map((answer, index) => (
                    <AnswerInput
                        key={index}
                        index={index}
                        value={answer}
                        isCorrect={correctAnswerIndex === index}
                        onAnswerChange={handleAnswerChange}
                        onCorrectAnswerChange={setCorrectAnswerIndex}
                    />
                ))}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Criando...' : 'Criar Pergunta'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuestion;
