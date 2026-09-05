import * as boardApi from '@/lib/api/board';
import api from '@/lib/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface BoardState {
    boards: any[];
    currentBoard: any | null;
    columns: any[];
    tasks: any[];
    loading: boolean;
    error: string | null;
}

const initialState: BoardState = {
    boards: [],
    currentBoard: null,
    columns: [] as any[],
    tasks: [] as any[],
    loading: false,
    error: null,
};

export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
    return await boardApi.getBoards();
});

export const fetchBoardDetails = createAsyncThunk(
    'boards/fetchDetails',
    async (boardId: string) => {
        return await boardApi.getBoardDetails(boardId);
    }
);

// Thunk to update task position in backend
export const moveTask = createAsyncThunk(
    'tasks/move',
    async ({ taskId, destinationColumnId, destinationIndex }: any) => {
        const response = await api.patch(`/tasks/${taskId}/move`, {
            destinationColumnId,
            destinationIndex,
        });
        return response.data;
    }
);

export const createNewBoard = createAsyncThunk('boards/create', async (name: string) => {
    return await boardApi.createBoard(name);
});

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload;
        },
        reorderTasks: (state, action) => {
            const { taskId, sourceCol, destCol, newIndex } = action.payload;
            const task = state.tasks.find(t => t._id === taskId);
            if (task) {
                task.columnId = destCol;
                // In a real app, you'd re-sort the whole array here based on the new index
                // For simplicity in this step, we will trigger a fetchBoardDetails after move
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Boards
            .addCase(fetchBoards.pending, (state) => { state.loading = true; })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.boards = action.payload;
            })
            // Create Board
            .addCase(createNewBoard.fulfilled, (state, action) => {
                state.boards.push(action.payload);
            })
            .addCase(fetchBoardDetails.fulfilled, (state, action) => {
                state.currentBoard = action.payload.board;
                state.columns = action.payload.columns;
                state.tasks = action.payload.tasks;
            });
        ;

    },
});

export const { setCurrentBoard, reorderTasks } = boardSlice.actions;
export default boardSlice.reducer;