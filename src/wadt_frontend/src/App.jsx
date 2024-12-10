import { useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { Center, Spinner } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add Router imports
import Home from './components/Home';
import Login from './components/Login';
import ViewTestament from './components/ViewTestament'; // Import ViewTestament
import CreateTestament from './components/CreateTestament'; // Import CreateTestament

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
                    <Router>
                        <Routes>
                            {/* Default route for Home */}
                            <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
                            {/* Route for View Testament */}
                            <Route path="/view-testament" element={<ViewTestament />} />
                            {/* Route for Create Testament */}
                            <Route path="/create-testament" element={<CreateTestament />} />
                        </Routes>
                    </Router>
                ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                )
            )}
        </Center>
    );
};

export default App;
