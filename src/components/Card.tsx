import React from 'react';
import { View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  elevation?: 'none' | 'low' | 'ambient';
  className?: string;
  children: React.ReactNode;
}

export const Card = ({
  elevation = 'ambient',
  className = '',
  children,
  ...props
}: CardProps) => {
  const getElevationStyle = () => {
    switch (elevation) {
      case 'none':
        return 'bg-surface-container-lowest border border-outline-variant/15'; // "Ghost Border Fallback" as described in DESIGN.md
      case 'low':
        return 'bg-surface-container-low';
      case 'ambient':
      default:
        // Ambient shadow as per "The Layering Principle" & "Ambient Shadows" in DESIGN.md
        // We use tailwind classes for the background, but the shadow is custom.
        // We will apply iOS shadow and Android elevation since custom shadows with hex + alpha can be tricky across platforms.
        return 'bg-surface-container-lowest shadow-[0_12px_32px_-4px_rgba(0,77,100,0.08)]';
    }
  };

  return (
    <View 
      className={`${getElevationStyle()} rounded-xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};
