import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

const API_URL = '/products';

interface ProductState {
    products: any[];
    product: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

export const listProducts = createAsyncThunk('products/list', async (keyword: string = '', thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}?keyword=${keyword}`);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const listProductDetails = createAsyncThunk('products/details', async (id: string, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(listProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(listProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
