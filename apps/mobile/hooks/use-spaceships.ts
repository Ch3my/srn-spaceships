import { useQuery } from '@tanstack/react-query';
import { fetchSpaceships } from '@/services/api';

export const useSpaceships = () => {
  return useQuery({
    queryKey: ['spaceships'],
    queryFn: fetchSpaceships,
  });
};

export const useSpaceship = (id: number) => {
  return useQuery({
    queryKey: ['spaceships', id],
    queryFn: async () => {
      const spaceships = await fetchSpaceships();
      const spaceship = spaceships.find((s) => s.id === id);
      if (!spaceship) {
        throw new Error('Spaceship not found');
      }
      return spaceship;
    },
    enabled: !!id,
  });
};
