import api from '../axios';

export const createColumn = async (name: string, boardId: string) => {
    const response = await api.post('/columns', { name, boardId });
    return response.data;
};