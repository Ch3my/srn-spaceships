import { useState, useMemo } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Faction } from '@srn-spaceships/shared-types';
import { useSpaceships } from '@/hooks/use-spaceships';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SpaceshipCard } from '@/components/SpaceshipCard';
import { FactionFilter } from '@/components/FactionFilter';

const FACTIONS: Faction[] = ['All', 'Empire', 'Rebels', 'Republic', 'Independent', 'Bounty Hunters'];

export default function HomeScreen() {
  const [selectedFaction, setSelectedFaction] = useState<Faction>('All');

  const { data: spaceships, isLoading, error, refetch } = useSpaceships();

  const filteredSpaceships = useMemo(() => {
    if (!spaceships) return [];
    if (selectedFaction === 'All') return spaceships;
    return spaceships.filter(ship => ship.faction === selectedFaction);
  }, [spaceships, selectedFaction]);

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <ThemedText style={styles.loadingText}>Cargando naves espaciales...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Star Wars Spaceships</ThemedText>

      <FlatList
        horizontal
        data={FACTIONS}
        renderItem={({ item }) => (
          <FactionFilter
            faction={item}
            isSelected={selectedFaction === item}
            onPress={() => setSelectedFaction(item)}
          />
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterListContent}
      />

      <FlatList
        data={filteredSpaceships}
        renderItem={({ item }) => <SpaceshipCard spaceship={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No se encontraron naves para la facción: {selectedFaction}
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  filterList: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 2,
  },
  filterListContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  list: {
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
