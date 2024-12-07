import { AuthClient } from "@dfinity/auth-client";
import { wadt_token_contract } from "../../../../declarations/wadt_token_contract";
import { useState } from "react";
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useNumberInput } from "@chakra-ui/react";

const TopUpModal = ({ isOpen, onClose }) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 0.1,
            defaultValue: 0.0,
            min: 0,
            precision: 1,
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const getPrincipal = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        return principal;
    };

    const topUp = async () => {
        const principal = await getPrincipal();
        const { value } = input;
        await wadt_token_contract.topUp(principal, parseFloat(value));
        window.location.reload();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Top Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack>
                        <Button
                            colorScheme="gray"
                            bg="primary"
                            color="light"
                            borderRadius={15}
                            _hover={{
                                bg: '#660016'
                            }}
                            {...dec}
                        >
                            -
                        </Button>
                        <Input
                            {...input}
                            w={20}
                            textAlign="center"
                            focusBorderColor="red.900"
                        />
                        <Button
                            colorScheme="gray"
                            bg="primary"
                            color="light"
                            borderRadius={15}
                            _hover={{
                                bg: '#660016'
                            }}
                            {...inc}
                        >
                            +
                        </Button>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="gray"
                        bg="primary"
                        color="light"
                        borderRadius={15}
                        onClick={topUp}
                        _hover={{
                            bg: '#660016'
                        }}
                    >
                        Top Up
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TopUpModal;