import { Button, Flex, Text, VStack } from "@chakra-ui/react";


const TraditionalTestament = () => {
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
                >
                    Create Testament
                </Button>
            </Flex>
        </VStack>
    );
};

export default TraditionalTestament;