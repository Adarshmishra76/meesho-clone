import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-primary text-white p-3 sm:p-3 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 hover:scale-110 animate-slide-in-up min-w-[48px] min-h-[48px]"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6" />
        </button>
    );
};

export default ScrollToTop;
