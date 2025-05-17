import { useState, useEffect } from 'react';

const useCountdown = () => {
    const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60 * 1000); // Default to 24 hours

    useEffect(() => {
        // Only access localStorage after component mounts
        const storedEndTime = window.localStorage.getItem('promotionEndTime');
        if (storedEndTime) {
            const remainingTime = parseInt(storedEndTime) - Date.now();
            setTimeLeft(remainingTime > 0 ? remainingTime : 24 * 60 * 60 * 1000);
        }

        // Set end time in localStorage
        const endTime = Date.now() + timeLeft;
        window.localStorage.setItem('promotionEndTime', endTime.toString());

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1000;
                if (newTime <= 0) {
                    // Reset to 24 hours when countdown ends
                    const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
                    window.localStorage.setItem('promotionEndTime', newEndTime.toString());
                    return 24 * 60 * 60 * 1000;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []); // Empty dependency array since we only want this to run once on mount

    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
    };
};

export default useCountdown; 