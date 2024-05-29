import React from 'react';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Create', href: '/create' },
    { text: 'List', href: '/list' },
    { text: 'Quizz', href: '/quizz' },
];

const AppBar: React.FC = () => {
    return (
        <header className="bg-gray-500 shadow-md">
            <nav className="px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-2xl w-full h-12">
                    <div className="flex items-center space-x-4">
                        <ul className="flex  space-x-4">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link className='block text-white py-2 pr-4 pl-3 hover:text-blue-600' href={item.href}>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <IconButton className='block py-2 pr-4 pl-3 text-white hover:text-blue-600' >
                        <AccountCircleIcon />
                    </IconButton>
                </div>
            </nav>
        </header>
    );
};

export default AppBar;
