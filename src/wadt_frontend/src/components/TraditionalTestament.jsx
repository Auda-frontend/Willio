import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const TraditionalTestament = () => {
    const navigate = useNavigate(); // Hook to navigate to different pages

    const handleViewTestament = () => {
        // Add logic for viewing testament (e.g., open a modal or navigate to a new page)
        console.log("Viewing Testament");
        navigate("/view-testament"); // Example: Navigate to a page to view the testament
    };

    const handleCreateTestament = () => {
        // Add logic for creating a testament (e.g., navigate to the create page)
        console.log("Creating Testament");
        navigate("/create-testament"); // Example: Navigate to a page to create the testament
    };

    return (
        <VStack alignItems="start" w="100%">
            <Text mt={5} fontSize={36} fontWeight="extrabold">Your traditional testament</Text>
            <Flex>
                <Button
                    colorScheme="gray"
                    bg="secondary"
                    color="dark"
                    _hover={{
                        bg: '#A0A0A0'
                    }}
                    onClick={handleViewTestament} // Add event handler for View Testament button
                >
                    View Testament
                </Button>
                <Button
                    ml={3}
                    colorScheme="gray"
                    bg="primary"
                    color="light"
                    _hover={{
                        bg: '#660016'
                    }}
                    onClick={handleCreateTestament} // Add event handler for Create Testament button
                >
                    Create Testament
                </Button>
            </Flex>
        </VStack>
    );
};

export default TraditionalTestament;
