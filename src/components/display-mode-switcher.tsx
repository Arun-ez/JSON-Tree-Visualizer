'use client';

import { useEffect, useState } from "react";

const DisplayModeSwitcher = () => {

    const [theme, setTheme] = useState('');

    const onChange = () => {

        if (theme == 'dark') {
            setTheme('');
            document.cookie = "theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        } else {
            setTheme('dark');
            document.cookie = "theme=dark; max-age=" + 60 * 60 * 24 * 365 * 100 + "; path=/";
        }

        document.documentElement.classList.toggle('dark');
    }

    useEffect(() => {
        const match = document?.cookie.match(/(^|;\s*)theme=([^;]*)/);
        setTheme(match ? decodeURIComponent(match[2]) : '');
    }, [])

    return (
        <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${theme == 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${theme == 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    )
}

export { DisplayModeSwitcher }
