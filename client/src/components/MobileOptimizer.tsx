import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle mobile-specific behaviors
 * - Prevents scroll on route change
 * - Handles iOS Safari bottom bar
 * - Manages viewport height for mobile devices
 */
const MobileOptimizer = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle viewport height for mobile browsers (iOS Safari)
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);

        return () => {
            window.removeEventListener('resize', setVH);
            window.removeEventListener('orientationchange', setVH);
        };
    }, []);

    // Scroll to top on route change (mobile focus)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    // Prevent pull-to-refresh logic removed as it blocks scrolling
    // If needed in future, use overscroll-behavior-y: none in CSS instead
    useEffect(() => {
        document.body.style.overscrollBehaviorY = 'none'; // Better way to prevent pull-to-refresh

        return () => {
            document.body.style.overscrollBehaviorY = 'auto';
        };
    }, []);

    return null;
};

export default MobileOptimizer;
