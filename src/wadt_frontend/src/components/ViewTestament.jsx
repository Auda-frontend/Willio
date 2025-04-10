import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Spinner, 
  Center, 
  Card, 
  CardHeader, 
  CardBody, 
  Stack, 
  StackDivider, 
  useToast,
  Badge,
  Avatar,
  Flex
} from '@chakra-ui/react';
import { testamentService } from '../services/canisterService';

const ViewTestament = () => {
    const [testaments, setTestaments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchTestaments = async () => {
            setIsLoading(true);
            try {
                const data = await testamentService.getTestaments();
                setTestaments(data);
            } catch (error) {
                console.error("Error fetching testaments:", error);
                toast({
                    title: 'Error',
                    description: 'Failed to load testaments',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestaments();
    }, [toast]);

    return (
        <Box p={6} maxW="4xl" mx="auto">
            <Heading 
                as="h2" 
                size="xl" 
                mb={8} 
                color="teal.600"
                textAlign="center"
            >
                Your Digital Testaments
            </Heading>
            
            {isLoading ? (
                <Center minH="200px">
                    <Spinner 
                        size="xl" 
                        color="teal.500"
                        thickness="4px"
                        emptyColor="gray.200"
                    />
                    <Text ml={4} fontSize="lg">Loading your testaments...</Text>
                </Center>
            ) : testaments.length > 0 ? (
                <Card 
                    variant="outline" 
                    boxShadow="md" 
                    borderColor="gray.100"
                    borderRadius="lg"
                >
                    <CardHeader bg="teal.50" borderTopRadius="lg">
                        <Flex align="center">
                            <Avatar name="Testament Icon" bg="teal.500" mr={3} />
                            <Box>
                                <Heading size="md">All Testaments</Heading>
                                <Badge colorScheme="teal" mt={1}>
                                    {testaments.length} record{testaments.length !== 1 ? 's' : ''}
                                </Badge>
                            </Box>
                        </Flex>
                    </CardHeader>
                    
                    <CardBody>
                        <Stack divider={<StackDivider borderColor="gray.100" />} spacing={4}>
                            {testaments.map((testament, index) => (
                                <Box key={index} p={4} _hover={{ bg: 'gray.50' }}>
                                    <Flex align="center">
                                        <Badge 
                                            colorScheme="teal" 
                                            mr={3} 
                                            px={2} 
                                            py={1} 
                                            borderRadius="full"
                                        >
                                            #{index + 1}
                                        </Badge>
                                        <Text 
                                            fontSize="lg" 
                                            fontWeight="semibold"
                                            color="gray.700"
                                        >
                                            {testament}
                                        </Text>
                                    </Flex>
                                </Box>
                            ))}
                        </Stack>
                    </CardBody>
                </Card>
            ) : (
                <Center 
                    minH="200px" 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    borderColor="gray.200"
                    bg="gray.50"
                >
                    <Text fontSize="xl" color="gray.500">
                        No testaments available yet.
                    </Text>
                </Center>
            )}
        </Box>
    );
};

export default ViewTestament;