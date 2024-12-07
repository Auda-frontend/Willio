import { AuthClient } from "@dfinity/auth-client";
import { useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react"
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ setIsAuthenticated }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const logout = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setIsAuthenticated(false);
    };

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            h={16}
            px={20}
            position="fixed"
            top={0}
            left={0}
            zIndex={10}
            bg="light"
            boxShadow="lg"
        >
            <Flex alignItems="center">
                <Image src="logo.svg" h={10} alt="Logo" />
                <Text ml={4} fontSize={16} fontWeight="bold">
                    Will Autonomous Decentralization
                </Text>
            </Flex>
            <Button
                bg="primary"
                color="light"
                leftIcon={<FaSignOutAlt />}
                onClick={onOpen}
                _hover={{
                    bg: '#660016'
                }}
            >
                Logout
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Logout
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure want to logout?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                ml={3}
                                bg="primary"
                                color="light"
                                leftIcon={<FaSignOutAlt />}
                                onClick={logout}
                                _hover={{
                                    bg: '#660016'
                                }}
                            >
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    );
};

export default Navbar;