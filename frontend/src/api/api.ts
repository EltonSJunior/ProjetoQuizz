import axios from 'axios';
import { QuestionData } from "@/interfaces/interfaces";

const api = 'http://localhost:3030/';

const post = async (endpoint: string, data: QuestionData, token?: string) => {
    try {
        const response = await axios.post(`${api}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const patch = async (endpoint: string, data: QuestionData, token: string) => {
    try {
        const response = await axios.patch(`${api}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const getAll = async (endpoint: string, token: string) => {
    try {
        const response = await axios.get(`${api}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOne = async (endpoint: string, id: number, token: string) => {
    try {
        const response = await axios.get(`${api}${endpoint}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const remove = async (endpoint: string, id: number, token: string) => {
    try {
        const response = await axios.delete(`${api}${endpoint}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { post, patch, getAll, getOne, remove };
