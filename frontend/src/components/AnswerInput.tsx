import { FC, ChangeEvent } from "react";

interface AnswerInputProps {
    index: number;
    value: string;
    isCorrect: boolean;
    onAnswerChange: (index: number, value: string) => void;
    onCorrectAnswerChange: (index: number) => void;
}

export const AnswerInput: FC<AnswerInputProps> = ({ index, value, isCorrect, onAnswerChange, onCorrectAnswerChange }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Resposta {index + 1}
        </label>
        <input
            type="text"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onAnswerChange(index, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="inline-flex items-center mt-2">
            <input
                type="radio"
                name="correctAnswer"
                checked={isCorrect}
                onChange={() => onCorrectAnswerChange(index)}
                className="form-radio"
            />
            <span className="ml-2">Correta</span>
        </label>
    </div>
);