import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

const API_URL = '/wishlist';

interface Product {
    _id: string;
    title: string;
    image: string;
    price: number;
    discountPrice: number;
    rating: number;
    category: string;
    brand: string;
}

interface Wishlist {
    _id: string;
    user: string;
    products: Product[];
}

interface WishlistState {
    wishlistItems: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    wishlistItems: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Wishlist>(API_URL);
            return data.products;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
        }
    }
);

export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlist',
    async (productId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<Wishlist>(
                `${API_URL}/add/${productId}`,
                {}
            );
            return data.products;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
        }
    }
);

export const removeFromWishlistAsync = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete<Wishlist>(
                `${API_URL}/remove/${productId}`
            );
            return data.products;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlistItems = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch wishlist
        builder.addCase(fetchWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.wishlistItems = action.payload;
        });
        builder.addCase(fetchWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Add to wishlist
        builder.addCase(addToWishlistAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addToWishlistAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.wishlistItems = action.payload;
        });
        builder.addCase(addToWishlistAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Remove from wishlist
        builder.addCase(removeFromWishlistAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeFromWishlistAsync.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.wishlistItems = action.payload;
        });
        builder.addCase(removeFromWishlistAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
