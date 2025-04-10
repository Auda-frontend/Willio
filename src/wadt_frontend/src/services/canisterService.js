import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/get_testaments/index';

// Initialize agent with proper configuration
const agent = new HttpAgent({ 
  host: import.meta.env.DFX_NETWORK === 'ic' 
    ? 'https://ic0.app' 
    : 'http://localhost:8000'
});

// For local development, fetch the root key
if (import.meta.env.DFX_NETWORK !== 'ic') {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

// Get canister ID from environment variables
const canisterId = import.meta.env.VITE_CANISTER_ID_GET_TESTAMENTS;

// Create actor instance
const canister = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export const testamentService = {
  getTestaments: async () => {
    try {
      const testaments = await canister.getTestaments();
      return testaments;
    } catch (error) {
      console.error("Error fetching testaments:", error);
      throw new Error(`Failed to fetch testaments: ${error.message}`);
    }
  },

  createTestament: async (title, description) => {
    try {
      const result = await canister.createTestament(title, description);
      return result;
    } catch (error) {
      console.error("Error creating testament:", error);
      throw new Error(`Failed to create testament: ${error.message}`);
    }
  }
};