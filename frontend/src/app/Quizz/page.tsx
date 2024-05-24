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

const Quizz: FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('/api/questions');
            const data: Question[] = await response.json();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    const handleAnswerSelection = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null && questions[currentQuestionIndex].answers[selectedAnswer].isCorrect) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black-100 p-4">
                <h1 className="text-4xl font-bold mb-4">Resultado</h1>
                <p className="text-2xl">Você acertou {score} de {questions.length} perguntas.</p>
            </div>
        );
    }

    if (!questions.length) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Quizz</h1>
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">{currentQuestion.text}</h2>
                <ul>
                    {currentQuestion.answers.map((answer, index) => (
                        <li key={index} className="mt-2">
                            <button
                                onClick={() => handleAnswerSelection(index)}
                                className={`w-full px-4 py-2 rounded border ${selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                            >
                                {answer.text}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <button
                        onClick={handleNextQuestion}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Próxima Pergunta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Quizz;
