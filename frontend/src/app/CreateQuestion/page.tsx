'use client';
import { useState, ChangeEvent, FormEvent, FC } from 'react';

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface QuestionPayload {
    text: string;
    answers: Answer[];
}

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

        const payload: QuestionPayload = {
            text: question,
            answers: answers.map((answer, index) => ({
                text: answer,
                isCorrect: index === correctAnswerIndex,
            })),
        };
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:3030/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

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
            <h1 className="text-4xl font-bold mb-4">Criar Nova Pergunta</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Pergunta</label>
                    <input
                        type="question"
                        value={question}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {answers.map((answer, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Resposta {index + 1}
                        </label>
                        <input
                            type="answer"
                            value={answer}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleAnswerChange(index, e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label className="inline-flex items-center mt-2">
                            <input
                                type="radio"
                                name="correctAnswer"
                                checked={correctAnswerIndex === index}
                                onChange={() => setCorrectAnswerIndex(index)}
                                className="form-radio"
                            />
                            <span className="ml-2">Correta</span>
                        </label>
                    </div>
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
