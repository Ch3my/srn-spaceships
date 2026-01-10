import { useState, useMemo } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Spaceship, Faction } from '@srn-spaceships/shared-types';
import { useSpaceships } from '@/hooks/use-spaceships';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ErrorMessage } from '@/components/error-message';

const FACTIONS: Faction[] = ['All', 'Empire', 'Rebels', 'Republic', 'Independent', 'Bounty Hunters'];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedFaction, setSelectedFaction] = useState<Faction>('All');

  const { data: spaceships, isLoading, error, refetch } = useSpaceships();

  const filteredSpaceships = useMemo(() => {
    if (!spaceships) return [];
    if (selectedFaction === 'All') return spaceships;
    return spaceships.filter(ship => ship.faction === selectedFaction);
  }, [spaceships, selectedFaction]);

  const renderSpaceship = ({ item }: { item: Spaceship }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={() => router.push({
        pathname: '/spaceship/[id]',
        params: { id: item.id }
      })}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedView style={styles.factionBadge}>
          <ThemedText style={styles.factionText}>{item.faction}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );

  const renderFactionFilter = ({ item }: { item: Faction }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFaction === item && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFaction(item)}
    >
      <ThemedText style={[
        styles.filterText,
        selectedFaction === item && styles.filterTextActive
      ]}>
        {item}
      </ThemedText>
    </TouchableOpacity>
  );

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
        renderItem={renderFactionFilter}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterListContent}
      />

      <FlatList
        data={filteredSpaceships}
        renderItem={renderSpaceship}
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
    maxHeight: 50,
    marginBottom: 10,
  },
  filterListContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
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
    backgroundColor: '#e8f4ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  factionText: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
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
