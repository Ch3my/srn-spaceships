import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Spaceship } from '@srn-spaceships/shared-types';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SpaceshipCardProps {
  spaceship: Spaceship;
}

export function SpaceshipCard({ spaceship }: SpaceshipCardProps) {
  const router = useRouter();
  const cardBackground = useThemeColor({}, 'card');
  const badgeBackground = useThemeColor({}, 'badgeBackground');
  const badgeText = useThemeColor({}, 'tint');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardBackground },
        pressed && styles.cardPressed
      ]}
      onPress={() => router.push({
        pathname: '/spaceship/[id]',
        params: { id: spaceship.id }
      })}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedText type="subtitle">{spaceship.name}</ThemedText>
        <ThemedView style={[styles.factionBadge, { backgroundColor: badgeBackground }]}>
          <ThemedText style={[styles.factionText, { color: badgeText }]}>
            {spaceship.faction}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    backgroundColor: 'transparent',
  },
  factionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  factionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
