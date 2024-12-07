import { useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { Center, Spinner } from '@chakra-ui/react';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkIsAuthenticated = async () => {
        setIsLoading(true);
        const authClient = await AuthClient.create();
        const isAuthenticated = await authClient.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
        setIsLoading(false);
    };

    useEffect(() => {
        checkIsAuthenticated();
    }, []);

    return (
        <Center minH="100vh" bgGradient="linear(to-br, #D8B8C0, #F5F5F5)">
            {isLoading ? (
                <Spinner />
            ) : (
                isAuthenticated ? (
                    <Home setIsAuthenticated={setIsAuthenticated} />
                ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                )
            )}
        </Center>
    );
}

export default App;