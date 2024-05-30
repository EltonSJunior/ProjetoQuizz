import React, { useState } from 'react';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Create', href: '/create' },
    { text: 'List', href: '/List' },
    { text: 'Quizz', href: '/Quizz' },
];

const withAppBar = (WrappedComponent: React.ComponentType<any>) => {
    const AppBar = (props: any) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const router = useRouter();

        const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            router.push('/login');
        };

        return (
            <>
                <header className="bg-gray-800">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <ul className="flex pl-4 space-x-4">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link className="text-white" href={item.href}>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex pr-4 space-x-4'>
                            <IconButton onClick={handleMenu}>
                                <AccountCircleIcon className="text-white" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </header>
                <WrappedComponent {...props} />
            </>
        );
    };

    AppBar.displayName = `WithAppBar(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AppBar;
};

export default withAppBar;