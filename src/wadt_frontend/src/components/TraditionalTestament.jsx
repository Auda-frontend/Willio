import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ViewTestament from "./ViewTestament"; // Import the component for viewing the testament
import CreateTestament from "./CreateTestament"; // Import the component for creating the testament

const TraditionalTestament = () => {
    const [view, setView] = useState(""); // State to manage the currently active view

    const handleViewTestament = () => {
        console.log("Viewing Testament");
        setView("view"); // Set view to "view" to render ViewTestament
    };

    const handleCreateTestament = () => {
        console.log("Creating Testament");
        setView("create"); // Set view to "create" to render CreateTestament
    };

    const handleBack = () => {
        setView(""); // Reset view to show the default page
    };

    return (
        <VStack alignItems="start" w="100%">
            {view === "view" ? (
                <ViewTestament />
            ) : view === "create" ? (
                <CreateTestament />
            ) : (
                <>
                    <Text mt={5} fontSize={36} fontWeight="extrabold">
                        Your traditional testament
                    </Text>
                    <Flex>
                        <Button
                            colorScheme="gray"
                            bg="secondary"
                            color="dark"
                            _hover={{
                                bg: "#A0A0A0",
                            }}
                            onClick={handleViewTestament}
                        >
                            View Testament
                        </Button>
                        <Button
                            ml={3}
                            colorScheme="gray"
                            bg="primary"
                            color="light"
                            _hover={{
                                bg: "#660016",
                            }}
                            onClick={handleCreateTestament}
                        >
                            Create Testament
                        </Button>
                    </Flex>
                </>
            )}

            {view && (
                <Button mt={4} onClick={handleBack} colorScheme="red">
                    Back
                </Button>
            )}
        </VStack>
    );
};

export default TraditionalTestament;
