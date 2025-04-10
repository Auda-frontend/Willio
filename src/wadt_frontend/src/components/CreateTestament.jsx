// import React, { useState } from 'react';
// import { Box, Heading, Input, Textarea, Button, useToast } from '@chakra-ui/react';

// const CreateTestament = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const toast = useToast();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Simulate API call
//         try {
//             const response = await fetch('/api/testaments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ title, description }),
//             });

//             if (response.ok) {
//                 toast({
//                     title: 'Testament created.',
//                     description: "Your testament has been successfully created!",
//                     status: 'success',
//                     duration: 5000,
//                     isClosable: true,
//                 });
//                 setTitle('');
//                 setDescription('');
//             } else {
//                 toast({
//                     title: 'Error.',
//                     description: "Failed to create testament.",
//                     status: 'error',
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             }
//         } catch (error) {
//             console.error("Error creating testament:", error);
//             toast({
//                 title: 'Error.',
//                 description: "An unexpected error occurred.",
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Box p={5}>
//             <Heading mb={4}>Create Testament</Heading>
//             <form onSubmit={handleSubmit}>
//                 <Input
//                     placeholder="Title"
//                     mb={3}
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <Textarea
//                     placeholder="Description"
//                     mb={3}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <Button type="submit" colorScheme="teal">Create</Button>
//             </form>
//         </Box>
//     );
// };

// export default CreateTestament;




import { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/get_testaments';

export default function CreateTestament() {
  const [formData, setFormData] = useState({
    title: '',
    description: '', // Matches your Motoko function parameter
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setError(null);
    setSuccess(false);

    try {
      // Initialize agent
      const agent = new HttpAgent({ 
        host: process.env.DFX_NETWORK === 'ic' 
          ? 'https://ic0.app' 
          : 'http://localhost:8000'
      });

      // Fetch root key for local development
      if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
      }

      // Create actor instance
      const testamentCanister = await Actor.createActor(idlFactory, {
        agent,
        canisterId
      });

      // Call the Motoko function with exact parameter names
      const result = await testamentCanister.createTestament(
        formData.title,
        formData.description
      );

      if (result) {
        setSuccess(true);
        // Optional: Reset form after successful submission
        setFormData({ title: '', description: '' });
      } else {
        throw new Error('Failed to create testament');
      }
    } catch (err) {
      console.error('Creation error:', err);
      setError(err.message || 'Failed to create testament');
    } finally {
      setLoading(false);
    }
  };

  // You'll need to define or import your idlFactory
  // Typically generated by dfx in declarations/testament/index.js
  const idlFactory = ({ IDL }) => {
    return IDL.Service({
      createTestament: IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
      getTestaments: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    });
  };

  return (
    <div className="testament-form">
      <h2>Create New Testament</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Testament created successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
            rows={4}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Testament'}
        </button>
      </form>
    </div>
  );
}