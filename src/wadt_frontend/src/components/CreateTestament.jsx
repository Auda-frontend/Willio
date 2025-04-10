import { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Box, Heading, Input, Textarea, Button, useToast, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, FormControl, FormLabel } from '@chakra-ui/react';
import { idlFactory } from '../../../declarations/get_testaments';
import { testamentService } from '../services/canisterService';

export default function CreateTestament() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const canisterId = process.env.CANISTER_ID_GET_TESTAMENTS;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const agent = new HttpAgent({ 
        host: process.env.DFX_NETWORK === 'ic' 
          ? 'https://ic0.app' 
          : 'http://localhost:8000'
      });

      if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
      }

      const testamentCanister = await Actor.createActor(idlFactory, {
        agent,
        canisterId
      });

      const result = await testamentService.createTestament(
        formData.title,
        formData.description
      );

      if (result) {
        toast({
          title: 'Success',
          description: 'Testament created successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
        setFormData({ title: '', description: '' });
      } else {
        throw new Error('Failed to create testament');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to create testament',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      maxW="xl" 
      mx="auto" 
      p={6} 
      borderWidth="1px" 
      borderRadius="lg" 
      boxShadow="md"
      bg="white"
    >
      <Heading as="h2" size="xl" mb={6} color="teal.600">
        Create New Testament
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="title" fontSize="lg" color="gray.700">
            Title
          </FormLabel>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            size="lg"
            focusBorderColor="teal.400"
            placeholder="Enter testament title"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="description" fontSize="lg" color="gray.700">
            Description
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
            size="lg"
            rows={6}
            focusBorderColor="teal.400"
            placeholder="Enter detailed description"
            resize="vertical"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
          isLoading={loading}
          loadingText="Creating..."
          spinner={<Spinner size="sm" mr={2} />}
          disabled={loading}
        >
          Create Testament
        </Button>
      </form>
    </Box>
  );
}