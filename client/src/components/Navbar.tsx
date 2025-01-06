import { Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
                    User Portal
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="text-gray-300 text-2xl md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navigation Links */}
                <div
                    className={`md:flex gap-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 transition-transform ${isOpen ? "block" : "hidden"
                        }`}
                >
                    <Link
                        to="/"
                        className="block text-lg font-medium text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/add-user"
                        className="block text-lg font-medium text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Add User
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
