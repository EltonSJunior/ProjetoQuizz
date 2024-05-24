'use client'
import { useEffect, useState, FC } from 'react';

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    text: string;
    answers: Answer[];
}

const ListQuestions: FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('/api/questions');
            const data: Question[] = await response.json();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Lista de Perguntas</h1>
            <ul className="w-full max-w-lg">
                {questions.map((question) => (
                    <li key={question.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-bold">{question.text}</h2>
                        <ul className="mt-2">
                            {question.answers.map((answer, index) => (
                                <li key={index} className="mt-1">
                                    {index + 1}. {answer.text} {answer.isCorrect && <span className="text-green-500 font-bold">(Correta)</span>}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListQuestions;
