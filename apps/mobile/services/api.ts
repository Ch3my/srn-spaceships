import { Spaceship } from '@srn-spaceships/shared-types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000';

export const fetchSpaceships = async (): Promise<Spaceship[]> => {
  try {
    const response = await fetch(`${API_URL}/spaceships`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching spaceships:', error);
    throw error;
  }
};
