import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    _id: string;
    title: string;
    image: string;
    price: number;
    discountPrice: number;
    qty: number;
}

interface CartState {
    cartItems: CartItem[];
}

// Load cart from local storage
const getCartFromStorage = (): CartItem[] => {
    try {
        const item = localStorage.getItem('cartItems');
        return item ? JSON.parse(item) : [];
    } catch (err) {
        return [];
    }
};

const initialState: CartState = {
    cartItems: getCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                state.cartItems = [...state.cartItems, { ...item, qty: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
