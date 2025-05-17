import { useState, useEffect } from 'react';

const useCountdown = () => {
    const [timeLeft, setTimeLeft] = useState(() => {
        // Get stored end time or set new 24h countdown
        const storedEndTime = localStorage.getItem('promotionEndTime');
        if (storedEndTime) {
            const timeLeft = parseInt(storedEndTime) - Date.now();
            return timeLeft > 0 ? timeLeft : 24 * 60 * 60 * 1000;
        }
        return 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    });

    useEffect(() => {
        // Set end time in localStorage
        const endTime = Date.now() + timeLeft;
        localStorage.setItem('promotionEndTime', endTime.toString());

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1000;
                if (newTime <= 0) {
                    // Reset to 24 hours when countdown ends
                    const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
                    localStorage.setItem('promotionEndTime', newEndTime.toString());
                    return 24 * 60 * 60 * 1000;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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