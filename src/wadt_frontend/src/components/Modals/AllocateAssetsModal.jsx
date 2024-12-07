import { AuthClient } from "@dfinity/auth-client";
import { wadt_token_contract } from "../../../../declarations/wadt_token_contract";
import { useState } from "react";
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, VStack } from "@chakra-ui/react";

const AllocateAssetsModal = ({ isOpen, onClose, setDigitalAssets }) => {
    const [assetName, setAssetName] = useState('');

    const getPrincipal = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        return principal;
    };

    const changeAssetName = (e) => {
        const { value } = e.target;
        setAssetName(value);
    }

    const allocateAssets = async () => {
        setDigitalAssets((digitalAssets) => [...digitalAssets, {
            assetName: 'Cryptocurrency',
            assetType: 'BTC',
            value: 1,
            recepient: 'Vanessa',
            distribution: 50,
            amount: 0,
            status: 'Pending'
        }])
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Allocate Assets</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl maxH={500} pe={4} overflow="auto">
                        <FormLabel>Asset Name</FormLabel>
                        <Select
                            value={assetName}
                            onChange={changeAssetName}
                            placeholder="Select asset name"
                            focusBorderColor="red.900"
                        >
                            <option value="Crypto">Crypto</option>
                            <option value="NFT">NFT</option>
                        </Select>
                        {assetName === 'Crypto' ? (
                            <>
                                <FormLabel mt={4}>Asset Type</FormLabel>
                                <Select
                                    placeholder="Select asset type"
                                    focusBorderColor="red.900"
                                >
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                </Select>
                            </>
                        ) : (
                            <>
                                <FormLabel mt={4}>Asset Type</FormLabel>
                                <Input placeholder="Enter your NFT ID" />
                            </>
                        )}
                        <FormLabel mt={4}>Value</FormLabel>
                        <Input
                            placeholder="Enter your value"
                            focusBorderColor="red.900"
                        />
                        <FormLabel mt={4}>Recipient</FormLabel>
                        <Input
                            placeholder="Enter your recipient"
                            focusBorderColor="red.900"
                        />
                        <FormLabel mt={4}>Recipient Address</FormLabel>
                        <Input
                            placeholder="Enter your recipient address"
                            focusBorderColor="red.900"
                        />
                        <FormLabel mt={4}>Distribution Percentage</FormLabel>
                        <NumberInput
                            placeholder="Enter your distribution percentage"
                            defaultValue={0}
                            min={0}
                            max={100}
                            focusBorderColor="red.900"
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Flex justifyContent="space-between" mt={4}>
                            <Text fontSize={16}>Gas Fee</Text>
                            <VStack alignItems="end" spacing={0}>
                                <Text fontSize={14}>10 USDT</Text>
                                <Text fontSize={14}>*Gas fee transfer is 3% from amount</Text>
                            </VStack>
                        </Flex>
                        <Flex justifyContent="space-between" mt={4}>
                            <Text fontSize={16}>Token</Text>
                            <Text fontSize={14}>10 WADT</Text>
                        </Flex>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="gray"
                        bg="primary"
                        color="light"
                        borderRadius={15}
                        onClick={allocateAssets}
                        _hover={{
                            bg: '#660016'
                        }}
                    >
                        Allocate Assets
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AllocateAssetsModal;