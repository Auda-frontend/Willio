import { AuthClient } from "@dfinity/auth-client";
import { Box, Button, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
    const login = async () => {
        let identityURL = '';

        if (process.env.DFX_NETWORK === "local") {
            identityURL = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:8000`;
        } else if (process.env.DFX_NETWORK === "ic") {
            identityURL = 'https://identity.internetcomputer.org/';
        } else {
            identityURL = `https://${process.env.CANISTER_ID_INTERNET_IDENTITY}.dfinity.network`;
        }

        const authClient = await AuthClient.create();

        await authClient.login({
            identityProvider: identityURL,
            onSuccess: async () => {
                setIsAuthenticated(true);
            }
        });
    };

    return (
        <Grid templateColumns="repeat(2, 1fr)" h="100vh" gap={10} px={24}>
            <GridItem>
                <VStack justifyContent="center" h="100vh">
                    <Image
                        src="/images/locker-dynamic-color.png"
                        alt="Locker"
                    />
                </VStack>
            </GridItem>
            <GridItem>
                <VStack spacing={5} alignItems="start" justifyContent="center" h="100%">
                    <Text fontSize={64} fontWeight="bold" color="black" lineHeight={1}>Automate Your</Text>
                    <Text fontSize={64} fontWeight="extrabold" color="primary" lineHeight={1}>Legacy</Text>
                    <Text mt={5} fontSize={24} color="black">
                        Empowering{" "}
                        <Box as="span" fontWeight="bold">secure</Box>
                        {" "}and{" "}
                        <Box as="span" fontWeight="bold">autonomous</Box>
                        {" "}will execution
                    </Text>
                    <Button
                        colorScheme="gray"
                        w={175}
                        h={14}
                        bg="primary"
                        color="light"
                        fontSize={18}
                        borderRadius={20}
                        rightIcon={<FaArrowRight />}
                        onClick={login}
                        _hover={{
                            bg: '#660016'
                        }}
                    >
                        Get Started
                    </Button>
                </VStack>
            </GridItem>
        </Grid>
    );
};

export default Login;