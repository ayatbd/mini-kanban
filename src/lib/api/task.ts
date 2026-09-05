import api from '../axios';

export const createTask = async (title: string, columnId: string, boardId: string) => {
    const response = await api.post('/tasks', { title, columnId, boardId });
    return response.data;
};