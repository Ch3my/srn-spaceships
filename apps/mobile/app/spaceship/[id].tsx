import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useSpaceship } from '@/hooks/use-spaceships';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ErrorMessage } from '@/components/error-message';

export default function SpaceshipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: spaceship, isLoading, error, refetch } = useSpaceship(parseInt(id));

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <ThemedText style={styles.loadingText}>Cargando detalles...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  if (!spaceship) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText type="title">Nave no encontrada</ThemedText>
        <ThemedText style={styles.notFoundText}>
          No se pudo encontrar información sobre esta nave espacial.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: spaceship.name,
          headerBackTitle: 'Atrás',
        }}
      />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              {spaceship.name}
            </ThemedText>
            <ThemedView style={styles.factionBadge}>
              <ThemedText style={styles.factionText}>{spaceship.faction}</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Descripción
            </ThemedText>
            <ThemedText style={styles.description}>{spaceship.description}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Detalles
            </ThemedText>
            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>ID:</ThemedText>
              <ThemedText style={styles.detailValue}>{spaceship.id}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Facción:</ThemedText>
              <ThemedText style={styles.detailValue}>{spaceship.faction}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  notFoundText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
  },
  factionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f4ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  factionText: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
  },
});
