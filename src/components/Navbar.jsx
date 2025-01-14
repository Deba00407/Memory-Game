import React from 'react'
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import { lightMode, darkMode } from '../state managment/themeSlice.js'

function Navbar() {

    const dispatch = useDispatch()
    const isDark = useSelector((state) => state.theme.isDark)

    const handleClick = () => {
        if (isDark) {
            dispatch(lightMode())
        } else {
            dispatch(darkMode())
        }
    }

    return (
        <nav className="bg-white dark:bg-black text-black dark:text-white px-4 py-3 shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex flex-wrap items-center justify-between">

                <button onClick={handleClick} className="p-2 rounded-full relative focus:outline-none">
                    {isDark ? <CiLight size={25} /> : <CiDark size={25} />}
                </button>

                <span
                    className="text-xl font-semibold hover:text-blue-500 transition-colors">
                    Memory Game
                </span>
            </div>
        </nav>
    )
}

export default Navbar
