import { Spinner } from '@nextui-org/react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <Spinner size='lg' />
    }

    return children;
};

export default ProtectedRoute;
