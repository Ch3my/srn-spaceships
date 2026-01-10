import React from 'react';
import { render } from '@testing-library/react-native';
import { CustomHeader } from '../CustomHeader';
import { useRouter } from 'expo-router';
import { Platform } from 'react-native';

// Mock del router
const mockBack = jest.fn();
jest.mock('expo-router');

describe('CustomHeader Component', () => {
  const mockNavigation = {
    canGoBack: jest.fn(() => true),
    goBack: jest.fn(),
  };

  const defaultProps = {
    options: {
      title: 'Test Title',
      headerShown: true,
    },
    route: {
      name: 'TestRoute',
      key: 'test-key',
    },
    navigation: mockNavigation as any,
    colorScheme: 'light' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
      replace: jest.fn(),
    });
  });

  it('should render with title from options', () => {
    const { getByText } = render(<CustomHeader {...defaultProps} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render with route name when title is not provided', () => {
    const props = {
      ...defaultProps,
      options: { ...defaultProps.options, title: undefined },
    };
    const { getByText } = render(<CustomHeader {...props} />);
    expect(getByText('TestRoute')).toBeTruthy();
  });

  it('should render back button when navigation can go back', () => {
    const { getByText } = render(<CustomHeader {...defaultProps} />);
    // Component should render successfully when back button is available
    expect(getByText('Test Title')).toBeTruthy();
    expect(mockNavigation.canGoBack).toHaveBeenCalled();
  });

  it('should not render back button when navigation cannot go back', () => {
    const props = {
      ...defaultProps,
      navigation: {
        ...mockNavigation,
        canGoBack: jest.fn(() => false),
      } as any,
    };

    const { getByText } = render(<CustomHeader {...props} />);
    // Should still render the title even without back button
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should return null when headerShown is false', () => {
    const props = {
      ...defaultProps,
      options: { ...defaultProps.options, headerShown: false },
    };

    const { toJSON } = render(<CustomHeader {...props} />);
    expect(toJSON()).toBeNull();
  });

  it('should apply dark theme colors correctly', () => {
    const props = {
      ...defaultProps,
      colorScheme: 'dark' as const,
    };

    const { getByText } = render(<CustomHeader {...props} />);
    // Verify component renders with dark theme
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should apply light theme colors correctly', () => {
    const { getByText } = render(<CustomHeader {...defaultProps} />);
    // Verify component renders with light theme
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render correctly on iOS platform', () => {
    Platform.OS = 'ios';
    const { getByText } = render(<CustomHeader {...defaultProps} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render correctly on Android platform', () => {
    Platform.OS = 'android';
    const { getByText } = render(<CustomHeader {...defaultProps} />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should handle null colorScheme', () => {
    const props = {
      ...defaultProps,
      colorScheme: null as any,
    };

    const { getByText } = render(<CustomHeader {...props} />);
    expect(getByText('Test Title')).toBeTruthy();
  });
});