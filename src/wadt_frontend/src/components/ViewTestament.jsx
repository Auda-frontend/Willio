import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, Center } from '@chakra-ui/react';
import { testamentService } from '../services/canisterService';  // Import the canister service

const ViewTestament = () => {
    const [testaments, setTestaments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestaments = async () => {
            setIsLoading(true);
            try {
                const data = await testamentService.getTestaments();  // Call the function from canisterService
                console.log("Fetched testaments:", data);
                setTestaments(data);
            } catch (error) {
                console.error("Error fetching testaments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestaments();
    }, []);

    return (
        <Box p={5}>
            <Heading mb={4}>View Testaments</Heading>
            {isLoading ? (
                <Center>
                    <Spinner size="lg" />
                </Center>
            ) : testaments.length > 0 ? (
                testaments.map((testament, index) => (
                    <Box key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                        <Text fontWeight="bold">{testament}</Text>
                    </Box>
                ))
            ) : (
                <Text>No testaments available.</Text>
            )}
        </Box>
    );
};

export default ViewTestament;