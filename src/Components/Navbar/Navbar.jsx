import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className=" relative w-full h-20 bg-gray-300 shadow-md">

            <div className="flex justify-between items-center px-8 py-4">

                {/* Logo */}
                <h1 className="text-2xl md:text-3xl font-bold">
                    V@NSHAURA TECH
                </h1>

                {/* Hamburger */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>

                {/* MENU */}
                <ul
                    className={`
                        ${isOpen ? "flex" : "hidden"}
                        flex-col items-center gap-5 py-4 font-medium
                        md:static md:mt-0 md:w-auto md:bg-transparent md:shadow-none
                        md:flex md:flex-row md:gap-10 md:py-0
                        absolute right-6 top-15 w-56 bg-gray-300 rounded-lg shadow-lg
                    `}
                >
                    <li className="cursor-pointer hover:text-blue-600">Home</li>
                    <li className="cursor-pointer hover:text-blue-600">About</li>
                    <li className="cursor-pointer hover:text-blue-600">Services</li>
                    <li className="cursor-pointer hover:text-blue-600">Contact</li>
                </ul>

            </div>

        </nav>
    );
};

export default Navbar;