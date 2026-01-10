import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const defaultMessage = 'No se pudo cargar la información. Por favor, verifica que el servidor API esté ejecutándose.';

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.errorIcon}>⚠️</ThemedText>
      <ThemedText style={styles.title}>Error de Conexión</ThemedText>
      <ThemedText style={styles.message}>{message || defaultMessage}</ThemedText>

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <ThemedText style={styles.retryText}>Reintentar</ThemedText>
        </TouchableOpacity>
      )}

      <ThemedView style={styles.helpSection}>
        <ThemedText style={styles.helpTitle}>Posibles soluciones:</ThemedText>
        <ThemedText style={styles.helpText}>• Verifica que el API esté ejecutándose</ThemedText>
        <ThemedText style={styles.helpText}>• Revisa la URL en el archivo .env</ThemedText>
        <ThemedText style={styles.helpText}>• Asegúrate de estar en la misma red</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    opacity: 0.8,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 32,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    width: '100%',
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.7,
  },
});
