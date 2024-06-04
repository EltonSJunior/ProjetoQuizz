'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOne, patch } from '@/api/api';
import { AnswerInput } from '../../../components/AnswerInput';
import { QuestionData, QuestionList } from '@/interfaces/interfaces';
import { useState, useEffect, ChangeEvent, FormEvent, FC } from 'react';
import withAuth from '../../../components/withAuth';
import withAppBar from '../../../components/AppBar';

const EditQuestion: FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [token, setToken] = useState('');


    const router = useRouter();
    const searchParams = useSearchParams();
    const questionId = searchParams.get('id');
    console.log(token)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);

            const fetchQuestion = async (storedToken: string) => {
                if (questionId) {
                    try {
                        const response = await getOne('questions', parseInt(questionId), storedToken);
                        const data: QuestionList = response;
                        setQuestion(data.text);
                        setAnswers(data.answers.map(answer => answer.text));
                        const correctIndex = data.answers.findIndex(answer => answer.isCorrect);
                        setCorrectAnswerIndex(correctIndex !== -1 ? correctIndex : 0);
                    } catch (err: unknown) {
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError('Erro desconhecido');
                        }
                    }
                }
            };
            fetchQuestion(storedToken);
        }
    }, [questionId]);

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
            if (questionId) {
                const response = await patch(`questions/${questionId}`, data, token);
                console.log(response)
                if (response.status === 200) {
                    alert('Pergunta atualizada com sucesso!');
                    router.push('/list');
                } else {
                    alert('Erro ao atualizar pergunta.');
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar pergunta.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl text-black font-bold mb-4">Editar Pergunta</h1>
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
                        {isSubmitting ? 'Atualizando...' : 'Atualizar Pergunta'}
                    </button>
                    <button
                        type='button'
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => router.push('/list')}
                    >
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(withAppBar(EditQuestion));
