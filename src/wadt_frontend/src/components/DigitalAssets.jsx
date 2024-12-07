import { useState } from "react";
import { Button, Flex, Icon, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import AllocateAssetsModal from "./Modals/AllocateAssetsModal";

const DigitalAssets = () => {
    const [digitalAssets, setDigitalAssets] = useState([
        {
            assetName: 'Cryptocurrency',
            assetType: 'BTC',
            value: 1,
            recepient: 'Vanessa',
            distribution: 50,
            amount: 0,
            status: 'Pending'
        }
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack alignItems="start" w="100%">
            <Flex alignItems="center" justifyContent="space-between" w="100%" mt={5}>
                <Text fontSize={36} fontWeight="extrabold">Your digital assets</Text>
                <Button
                    colorScheme="gray"
                    bg="primary"
                    color="light"
                    borderRadius={15}
                    onClick={onOpen}
                    _hover={{
                        bg: '#660016'
                    }}
                >
                    Allocate Assets
                </Button>
                <AllocateAssetsModal
                    isOpen={isOpen}
                    onClose={onClose}
                    setDigitalAssets={setDigitalAssets}
                />
            </Flex>
            <TableContainer w="100%" mt={4} bg="white" boxShadow="md" borderRadius={10}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Asset Name</Th>
                            <Th>Asset Type</Th>
                            <Th>Value</Th>
                            <Th>Recepient</Th>
                            <Th>Distribution</Th>
                            <Th>Amount</Th>
                            <Th>Status</Th>
                            <Th>View</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {digitalAssets.map((asset, idx) => {
                            return (
                                <Tr key={idx}>
                                    <Td>{idx + 1}</Td>
                                    <Td>{asset.assetName}</Td>
                                    <Td>{asset.assetType}</Td>
                                    <Td>{asset.value}</Td>
                                    <Td>{asset.recepient}</Td>
                                    <Td>{asset.distribution}%</Td>
                                    <Td>{asset.amount}USDT</Td>
                                    <Td>{asset.status}</Td>
                                    <Td><Icon as={FaEye} /></Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    );
};

export default DigitalAssets;