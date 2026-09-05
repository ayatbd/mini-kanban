import * as boardApi from '@/lib/api/board';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface BoardState {
    boards: any[];
    currentBoard: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: BoardState = {
    boards: [],
    currentBoard: null,
    loading: false,
    error: null,
};

export const fetchBoards = createAsyncThunk('boards/fetchAll', async () => {
    return await boardApi.getBoards();
});

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
            });
    },
});

export const { setCurrentBoard } = boardSlice.actions;
export default boardSlice.reducer;