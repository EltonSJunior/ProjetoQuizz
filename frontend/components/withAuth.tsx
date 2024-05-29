'use client'
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const withSkeleton = (WrappedComponent: React.ComponentType<any>) => {
    const WithSkeleton = (props: any) => {
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
            const delay = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(delay);
        }, []);

        return isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        ) : (
            <WrappedComponent {...props} />
        );
    };

    WithSkeleton.displayName = `WithSkeleton(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithSkeleton;
};

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const WithAuth = (props: any) => {
        const router = useRouter();
        const [isClient, setIsClient] = useState(false);

        useEffect(() => {
            setIsClient(true);
        }, []);

        useEffect(() => {
            if (isClient) {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                }
            }
        }, [isClient, router]);

        return <WrappedComponent {...props} />;
    };

    WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuth;
};

const withAuthAndSkeleton = (WrappedComponent: React.ComponentType<any>) => {
    const ComponentWithAuthAndSkeleton = withAuth(withSkeleton(WrappedComponent));

    return ComponentWithAuthAndSkeleton;
};

export default withAuthAndSkeleton;