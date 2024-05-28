'use client';
import { useRouter } from 'next/navigation';
import { getAll, remove } from '@/api/api';
import { QuestionList } from '@/interfaces/interfaces';
import { useEffect, useState, FC } from 'react';

const ListQuestions: FC = () => {
    const [questions, setQuestions] = useState<QuestionList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getAll('questions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar perguntas!');
                }
                const data: QuestionList[] = await response.json();
                setQuestions(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Erro desconhecido');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(97 + index);
    };

    const handleEdit = (id: number) => {
        router.push(`/edit?id=${id}`);
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm('Tem certeza que deseja deletar esta pergunta?');
        if (!isConfirmed) return;

        try {
            const response = await remove('questions', id);
            if (!response.ok) {
                throw new Error('Erro ao deletar pergunta!');
            }
            setQuestions(questions.filter(question => question.id !== id));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro desconhecido');
            }
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl text-black font-bold mb-4">Lista de Perguntas</h1>
            <ul className="w-full max-w-lg">
                {questions.map((question) => (
                    <li key={question.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-black text-2xl font-bold">{question.text}</h2>
                        <ul className="text-black mt-2 list-disc list-inside">
                            {question.answers.map((answer, index) => (
                                <li key={index} className="mt-1">
                                    {getLetterFromIndex(index)}. {answer.text} {answer.isCorrect && <span className="text-green-500 font-bold">(Correta)</span>}
                                </li>
                            ))}
                        </ul>
                        <div className="flex mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => handleEdit(question.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDelete(question.id)}
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListQuestions;
