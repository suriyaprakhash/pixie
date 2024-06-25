import React, { useContext, useEffect, useState } from 'react'
// import { ThemeContext } from './context/themeContextProvider';
import Image from 'next/image'
import Link from 'next/link';
import { ThemeContext } from './context/themeContextProvider';

function Navbar() {
    const [theme, setTheme] = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <nav className="h-[100px] sm:h-[12vh] grid grid-cols-12 items-center">
            <div className="col-start-2 col-end-5">
                <Link className="" href="/">
                    <div className="text-2xl flex flex-row gap-2 items-center">
                        <Image src="/pixie-small.png" alt="pixie" width="48" height="48" />
                        <div className="tracking-widest">
                            PIXIE
                            <p className='font-semibold text-xs sm:block hidden'>PKCE code generator</p>
                        </div>
                    </div>
                </Link>

            </div>

        </nav>
    )
}

export default Navbar