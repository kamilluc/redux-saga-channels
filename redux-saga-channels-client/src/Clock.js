import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date(), 1000));
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <h3>
            {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </h3>
    );
};

export default Clock;
