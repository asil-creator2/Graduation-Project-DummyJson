// Redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { saveCart } from '../services/cartService';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        setCart: (state, action) => {
            state.products = action.payload;
        },
        addToCart: (state, action) => {
            const existing = state.products.find(p => p.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
            // بعد كل تعديل، نحفظ في Firestore (هنتعامل مع ده في الـ action)
        },
        increment: (state, action) => {
            const item = state.products.find(p => p.id === action.payload.id);
            if (item) item.quantity++;
        },
        decrement: (state, action) => {
            const item = state.products.find(p => p.id === action.payload.id);
            if (item && item.quantity > 1) item.quantity--;
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.products = [];
        }
    }
});

export const { setCart, addToCart, increment, decrement, removeItem, clearCart } = CartSlice.actions;

// Middleware لحفظ السلة في Firestore بعد كل تعديل
export const syncCartWithFirestore = (store) => (next) => async (action) => {
    const result = next(action);
    const state = store.getState();
    const user = state.auth.user;
    const products = state.cart.products;
    
    // لو في يوزر مسجل والـ action غير السلة، نحفظ في Firestore
    if (user?.uid && ['addToCart', 'increment', 'decrement', 'removeItem', 'clearCart'].includes(action.type)) {
        await saveCart(user.uid, products);
    }
    
    return result;
};

export default CartSlice.reducer;