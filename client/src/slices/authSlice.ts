import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

const API_URL = '/users';

// Helper to get user from local storage
const getUserFromStorage = () => {
    try {
        const item = localStorage.getItem('userInfo');
        return item ? JSON.parse(item) : null;
    } catch (error) {
        return null;
    }
};

const userFromStorage = getUserFromStorage();

interface AuthState {
    userInfo: any;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userInfo: userFromStorage,
    loading: false,
    error: null,
};

// Async Thunks
export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk('auth/register', async (userData: any, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post(`${API_URL}/logout`, {});
        localStorage.removeItem('userInfo');
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
