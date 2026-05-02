import { useCallback } from 'react';

interface RecentProduct {
    _id: string;
    title: string;
    image: string;
    price: number;
    discountPrice: number;
    rating: number;
    category: string;
}

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
    const getRecentlyViewed = useCallback((): RecentProduct[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }, []);

    const addToRecentlyViewed = useCallback((product: RecentProduct) => {
        try {
            const existing = getRecentlyViewed();

            // Remove if already exists to avoid duplicates
            const filtered = existing.filter(p => p._id !== product._id);

            // Add to start of array
            const updated = [product, ...filtered];

            // Limit to MAX_ITEMS
            const limited = updated.slice(0, MAX_ITEMS);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
        } catch (error) {
            console.error('Failed to save to recently viewed:', error);
        }
    }, [getRecentlyViewed]);

    const clearRecentlyViewed = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear recently viewed:', error);
        }
    }, []);

    return {
        getRecentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed
    };
};
