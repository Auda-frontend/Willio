import React, { useState } from 'react';
import { Box, Heading, Input, Textarea, Button, useToast } from '@chakra-ui/react';

const CreateTestament = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate API call
        try {
            const response = await fetch('/api/testaments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                toast({
                    title: 'Testament created.',
                    description: "Your testament has been successfully created!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setTitle('');
                setDescription('');
            } else {
                toast({
                    title: 'Error.',
                    description: "Failed to create testament.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error creating testament:", error);
            toast({
                title: 'Error.',
                description: "An unexpected error occurred.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5}>
            <Heading mb={4}>Create Testament</Heading>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Title"
                    mb={3}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    mb={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" colorScheme="teal">Create</Button>
            </form>
        </Box>
    );
};

export default CreateTestament;
