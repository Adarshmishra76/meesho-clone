import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
    _id: string;
    title: string;
    image: string;
    price: number;
    discountPrice: number;
    qty: number;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: string;
    paymentMethod: string;
    deliveryAddress: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
}

interface OrderState {
    orders: Order[];
}

const getOrdersFromStorage = (): Order[] => {
    try {
        const orders = localStorage.getItem('orders');
        return orders ? JSON.parse(orders) : [];
    } catch (err) {
        return [];
    }
};

const initialState: OrderState = {
    orders: getOrdersFromStorage(),
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        clearOrders: (state) => {
            state.orders = [];
            localStorage.removeItem('orders');
        },
    },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
