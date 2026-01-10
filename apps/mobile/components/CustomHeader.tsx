import React from 'react';
import { Platform, TouchableOpacity, View, StyleSheet, ColorSchemeName } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface CustomHeaderProps extends NativeStackHeaderProps {
  colorScheme: ColorSchemeName;
}

export function CustomHeader({ options, route, navigation, colorScheme }: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (options.headerShown === false) return null;

  const canGoBack = navigation.canGoBack();
  const backgroundColor = colorScheme === 'dark' ? '#121212' : '#fff';
  const borderColor = colorScheme === 'dark' ? '#333' : '#eee';
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor,
          height: insets.top + (Platform.OS === 'ios' ? 44 : 56),
          borderBottomColor: borderColor,
        },
      ]}
    >
      {canGoBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={24}
            color={iconColor}
          />
        </TouchableOpacity>
      )}

      <ThemedText style={styles.title}>
        {options.title ?? route.name}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: '#000',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
});
