import api from '@/lib/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { dispatch }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await api.get('/auth/me');

    // If successful, update state
    dispatch(setCredentials({ user: response.data, token }));
    return response.data;
  } catch (error: any) {
    console.error("Auth Check Failed:", error.response?.data);

    // Only remove token if the server explicitly says it's invalid (401/403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      dispatch(logout());
    }
    throw error;
  }
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;