import React, { useContext, useEffect, useState } from 'react'
// import { ThemeContext } from './context/themeContextProvider';
import Image from 'next/image'
import Link from 'next/link';

function Navbar() {
    // const [theme, setTheme] = useContext(ThemeContext);

    // const toggleTheme = () => {
    //     const newTheme = theme === 'light' ? 'dark' : 'light';
    //     localStorage.setItem('theme', newTheme);
    //     setTheme(newTheme);
    // };

    return (
        <nav className="bg-secondary-bg text-secondary-text h-[100px] sm:h-[12vh] grid grid-cols-12 items-center">
            <div className="col-start-2 col-end-5">
                <Link className="" href="/">
                    <div className="text-2xl flex flex-row gap-2">
                        <Image src="/pixie.png" alt="mockManga" width="32" height="32" />
                        <div>
                            P I X I E
                        </div>
                    </div>
                </Link>
            </div>

        </nav>
    )
}

export default Navbar