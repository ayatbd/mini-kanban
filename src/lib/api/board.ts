import api from '../axios';

export const getBoards = async () => {
    const response = await api.get('/boards');
    return response.data;
};

export const createBoard = async (name: string) => {
    const response = await api.post('/boards', { name });
    return response.data;
};

export const getBoardDetails = async (id: string) => {
    const response = await api.get(`/boards/${id}`);
    return response.data;
};

export const shareBoard = async (boardId: string, email: string) => {
    const response = await api.post(`/boards/${boardId}/share`, { email });
    return response.data;
};