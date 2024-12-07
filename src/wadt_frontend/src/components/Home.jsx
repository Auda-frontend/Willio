import { AuthClient } from "@dfinity/auth-client";
import { wadt_token_contract } from "../../../declarations/wadt_token_contract";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, HStack, Icon, Image, Tag, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { FaClock, FaDollarSign, FaIdCard, FaPlus, FaUserSecret } from "react-icons/fa";
import Navbar from "./Layout/Navbar";
import TopUpModal from "./Modals/TopUpModal";
import DigitalAssets from "./DigitalAssets";
import TraditionalTestament from "./TraditionalTestament";

const Home = ({ setIsAuthenticated }) => {
    const [principalId, setPrincipalId] = useState('');
    const [balance, setBalance] = useState(0);
    const [symbol, setSymbol] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const getPrincipal = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        return principal;
    };

    const getPrincipalId = async () => {
        const principalId = (await getPrincipal()).toString();
        setPrincipalId(principalId);
    };

    const getBalance = async () => {
        const principal = await getPrincipal();
        const balance = await wadt_token_contract.getBalance(principal);
        setBalance(balance);
    };

    const getSymbol = async () => {
        const symbol = await wadt_token_contract.getSymbol();
        setSymbol(symbol);
    };

    const distribute = async () => {
        const principal = await getPrincipal();
        console.log(principal);
        const response = await wadt_token_contract.disbtribute(principal, parseFloat(5));
        console.log(response);
        window.location.reload();
    }

    useEffect(() => {
        getPrincipalId();
        getBalance();
        getSymbol();
    }, []);

    return (
        <>
            <Navbar setIsAuthenticated={setIsAuthenticated} />
            <VStack alignItems="start" spacing={0} w="100%" minH="100vh">
                <Image src="/images/banner.png" w="100%" h={200} alt="Banner" objectFit="cover" />
                <HStack
                    alignItems="start"
                    spacing={10}
                    w="100%"
                    h={220}
                    px={28}
                    bg="white"
                    boxShadow="md"
                >
                    <Image
                        src="/images/default-user.png"
                        w={200}
                        h={200}
                        mt={-24}
                        border="5px solid white"
                        borderRadius="50%"
                        objectFit="cover"
                        alt="Banner"
                    />
                    <VStack alignItems="start" mt={2}>
                        <Text fontSize={36} fontWeight="extrabold">User</Text>
                        <HStack>
                            <Icon as={FaIdCard} />
                            <Text fontSize={16} fontWeight="bold">{principalId}</Text>
                        </HStack>
                        <HStack>
                            <Icon as={FaDollarSign} />
                            <Text
                                fontSize={16}
                                color="dark"
                            >
                                {balance} {symbol} ~ {balance} USDT
                            </Text>
                        </HStack>
                        <Button
                            colorScheme="gray"
                            mt={2}
                            bg="primary"
                            color="light"
                            borderRadius={15}
                            leftIcon={<FaPlus />}
                            onClick={onOpen}
                            _hover={{
                                bg: '#660016'
                            }}
                        >
                            Top Up
                        </Button>
                        <TopUpModal isOpen={isOpen} onClose={onClose} />
                    </VStack>
                </HStack>
                <Box w="100%" p={5}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={5} w="100%">
                        <GridItem>
                            <VStack alignItems="start" h={150} p={5} bg="light" borderRadius={10} boxShadow="md">
                                <Flex alignItems="center">
                                    <Text fontSize={32} fontWeight="bold">
                                        Distribute
                                    </Text>
                                    <Tag
                                        size="sm"
                                        variant="solid"
                                        colorScheme="gray"
                                        ml={3}
                                        bg="warning"
                                        color="light"
                                    >
                                        COST FEE 5 WADT
                                    </Tag>
                                </Flex>
                                <Button
                                    colorScheme="gray"
                                    bg="primary"
                                    color="light"
                                    _hover={{
                                        bg: '#660016'
                                    }}
                                    onClick={distribute}
                                >
                                    Execute Will Now
                                </Button>
                            </VStack>
                        </GridItem>
                        <GridItem>
                            <VStack alignItems="start" h={150} p={5} bg="light" borderRadius={10} boxShadow="md">
                                <Text fontSize={32} fontWeight="bold">Smart Watch</Text>
                                <HStack>
                                    <Icon as={FaClock} color="success" />
                                    <Text fontSize={18}>Connected since 23 Aug 2024</Text>
                                </HStack>
                            </VStack>
                        </GridItem>
                        <GridItem>
                            <VStack alignItems="start" h={150} p={5} bg="light" borderRadius={10} boxShadow="md">
                                <Text fontSize={32} fontWeight="bold">Trustee</Text>
                                <HStack>
                                    <Icon as={FaUserSecret} color="success" />
                                    <Text fontSize={18}>You have 2 trustees</Text>
                                </HStack>
                            </VStack>
                        </GridItem>
                    </Grid>
                    <DigitalAssets />
                    <TraditionalTestament />
                </Box>
            </VStack>
        </>
    );
};

export default Home;