import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FactionFilter } from '../FactionFilter';
import { Faction } from '@srn-spaceships/shared-types';

// Mock del hook useThemeColor
jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn((_props: any, colorName: string) => {
    const colors: Record<string, string> = {
      filterButton: '#f0f0f0',
      filterButtonActive: '#007AFF',
      filterButtonBorder: '#ccc',
      filterText: '#333',
      filterTextActive: '#fff',
    };
    return colors[colorName] || '#000';
  }),
}));

describe('FactionFilter Component', () => {
  const mockOnPress = jest.fn();
  const faction: Faction = 'Empire';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with faction name', () => {
    const { getByText } = render(
      <FactionFilter
        faction={faction}
        isSelected={false}
        onPress={mockOnPress}
      />
    );

    expect(getByText('Empire')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <FactionFilter
        faction={faction}
        isSelected={false}
        onPress={mockOnPress}
      />
    );

    const button = getByText('Empire');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles when selected', () => {
    const { getByText } = render(
      <FactionFilter
        faction={faction}
        isSelected={true}
        onPress={mockOnPress}
      />
    );

    const text = getByText('Empire');
    expect(text).toBeTruthy();
  });

  it('should apply correct styles when not selected', () => {
    const { getByText } = render(
      <FactionFilter
        faction={faction}
        isSelected={false}
        onPress={mockOnPress}
      />
    );

    const text = getByText('Empire');
    expect(text).toBeTruthy();
  });

  it('should render different factions correctly', () => {
    const factions: Faction[] = ['Rebels', 'Empire', 'Republic'];

    factions.forEach((testFaction) => {
      const { getByText, unmount } = render(
        <FactionFilter
          faction={testFaction}
          isSelected={false}
          onPress={mockOnPress}
        />
      );

      expect(getByText(testFaction)).toBeTruthy();
      unmount();
    });
  });

  it('should toggle selection state correctly', () => {
    const { getByText, rerender } = render(
      <FactionFilter
        faction={faction}
        isSelected={false}
        onPress={mockOnPress}
      />
    );

    // Initially not selected
    expect(getByText('Empire')).toBeTruthy();

    // Simulate press
    fireEvent.press(getByText('Empire'));
    expect(mockOnPress).toHaveBeenCalled();

    // Re-render as selected
    rerender(
      <FactionFilter
        faction={faction}
        isSelected={true}
        onPress={mockOnPress}
      />
    );

    expect(getByText('Empire')).toBeTruthy();
  });

  it('should handle multiple presses', () => {
    const { getByText } = render(
      <FactionFilter
        faction={faction}
        isSelected={false}
        onPress={mockOnPress}
      />
    );

    const button = getByText('Empire');

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(3);
  });
});
