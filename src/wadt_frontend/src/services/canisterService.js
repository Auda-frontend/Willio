import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from 'dfx-generated/your_canister_name'; // Replace with your generated canister

const agent = new HttpAgent();
const canister = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});

export const getTestaments = async () => {
    try {
        const testaments = await canister.getTestaments();
        return testaments;
    } catch (error) {
        console.error("Error fetching testaments:", error);
        throw new Error("Failed to fetch testaments");
    }
};