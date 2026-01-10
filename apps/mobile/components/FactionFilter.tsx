import { StyleSheet, TouchableOpacity } from 'react-native';
import { Faction } from '@srn-spaceships/shared-types';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FactionFilterProps {
  faction: Faction;
  isSelected: boolean;
  onPress: () => void;
}

export function FactionFilter({ faction, isSelected, onPress }: FactionFilterProps) {
  const buttonBackground = useThemeColor({}, isSelected ? 'filterButtonActive' : 'filterButton');
  const buttonBorder = useThemeColor({}, isSelected ? 'filterButtonActive' : 'filterButtonBorder');
  const textColor = useThemeColor({}, isSelected ? 'filterTextActive' : 'filterText');

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: buttonBackground,
          borderColor: buttonBorder,
        }
      ]}
      onPress={onPress}
    >
      <ThemedText style={[
        styles.filterText,
        { color: textColor }
      ]}>
        {faction}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    includeFontPadding: false,
  },
});
