// services/cartService.js
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// جلب السلة من Firestore
export const fetchCart = async (userId) => {
    try {
        const cartRef = doc(db, 'users', userId, 'cart', 'main'); // مستند واحد لكل يوزر
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
            return cartDoc.data().products || [];
        } else {
            return []; // مفيش سلة، هترجع مصفوفة فاضية
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};

// حفظ السلة بالكامل في Firestore
export const saveCart = async (userId, products) => {
    try {
        const cartRef = doc(db, 'users', userId, 'cart', 'main');
        await setDoc(cartRef, {
            products: products,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};