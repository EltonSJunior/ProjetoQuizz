export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface QuestionData {
    text: string;
    answers: Answer[];
}

export interface QuestionList {
    id: number;
    text: string;
    answers: Answer[];
}
