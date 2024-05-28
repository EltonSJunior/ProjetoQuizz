import { QuestionData } from "@/interfaces/interfaces";

const api = 'http://localhost:3030/';

const post = async (endpoint: string, data: QuestionData) => {
    try {
        const response = await fetch(`${api}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const patch = async (endpoint: string, data: QuestionData) => {
    try {
        const response = await fetch(`${api}${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error('Erro ao fazer PATCH:', error);
        throw error;
    }
};

const getAll = async (endpoint: string) => {
    try {
        const response = await fetch(`${api}${endpoint}`);
        return response;
    } catch (error) {
        console.error('Erro ao fazer GET all:', error);
        throw error;
    }
};

const getOne = async (endpoint: string, id: number) => {
    try {
        const response = await fetch(`${api}${endpoint}/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao fazer GET one:', error);
        throw error;
    }
};

const remove = async (endpoint: string, id: number) => {
    try {
        const response = await fetch(`${api}${endpoint}/${id}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error('Erro ao fazer DELETE:', error);
        throw error;
    }
};

export { post, patch, getAll, getOne, remove };