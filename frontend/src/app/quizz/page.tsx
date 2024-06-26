'use client';
import { getAll } from '@/api/api';
import { Answer, QuestionList } from '@/interfaces/interfaces';
import { useEffect, useState, FC } from 'react';
import withAppBar from '../../components/AppBar';
import withAuth from '../../components/withAuth';

const Quizz: FC = () => {
  const [questions, setQuestions] = useState<QuestionList[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const fetchQuestions = async (storedToken: string) => {
        const response = await getAll('questions', storedToken);
        const data: QuestionList[] = response;
        setQuestions(data);
      };
      fetchQuestions(storedToken);
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const shuffledAnswers = shuffleArray([
        ...questions[currentQuestionIndex].answers,
      ]);
      setShuffledAnswers(shuffledAnswers);
    }
  }, [questions, currentQuestionIndex]);

  const shuffleArray = (array: Answer[]): Answer[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && shuffledAnswers[selectedAnswer].isCorrect) {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl text-black font-bold mb-4">Resultado</h1>
        <p className="text-2xl text-black">
          Você acertou {score} de {questions.length} perguntas.
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Sem perguntas para retornar
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl text-black font-bold mb-4">Quizz</h1>
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl text-black font-bold mb-4">
          {currentQuestion.text}
        </h2>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={index} className="mt-2">
              <button
                onClick={() => handleAnswerSelection(index)}
                className={`w-full px-4 py-2 rounded border ${
                  selectedAnswer === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {answer.text}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={handleNextQuestion}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              selectedAnswer === null ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={selectedAnswer === null}
          >
            {currentQuestionIndex === questions.length - 1
              ? 'Concluir'
              : 'Próxima Pergunta'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(withAppBar(Quizz));
