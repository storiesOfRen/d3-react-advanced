import { useState, useEffect, useRef } from 'react';

export const useResize = () => {
    const ref = useRef(null);
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        function updateSize() {
            if (ref.current) {
                setSize([ref.current.clientWidth, ref.current.clientHeight]);
            } else {
                setSize([window.innerWidth - 200, window.innerHeight - 200]);
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return { size, ref };
};
