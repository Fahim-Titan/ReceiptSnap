import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { Label } from './Typography';
import { MaterialIcons } from '@expo/vector-icons';

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: keyof typeof MaterialIcons.glyphMap;
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
}

export const Button = ({
  label,
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  contentClassName = '',
  ...props
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        // NativeWind supports standard background utility classes. 
        // For gradient, standard tailwind bg-gradient-to-r isn't perfectly supported in React Native natively via Tailwind classes alone without extra config.
        // We will use a solid primary block that matches the gradient fallback for simplicity.
        return 'bg-primary dark:bg-primary-container shadow-sm';
      case 'secondary':
        return 'bg-secondary-container';
      case 'tertiary':
        return 'bg-transparent';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-on-primary';
      case 'secondary':
        return 'text-on-secondary-container';
      case 'tertiary':
        return 'text-primary';
    }
  };

  const getPaddingStyles = () => {
    if (variant === 'tertiary') return 'px-2 py-1';
    return 'px-6 py-3.5'; // Standard 44+ px touch target
  };

  const widthStyle = fullWidth ? 'w-full' : 'self-start';
  
  return (
    <Pressable
      className={`${widthStyle} ${getVariantStyles()} rounded-lg active:opacity-80 transition-opacity ${className}`}
      {...props}
    >
      <View className={`flex-row items-center justify-center gap-2 ${getPaddingStyles()} ${contentClassName}`}>
        {icon && (
          <MaterialIcons name={icon} size={20} className={getTextColor()} color="currentColor" style={{color: 'inherit'}} />
        )}
        <Label 
          size="md" 
          weight="bold" 
          color={getTextColor()} 
          className={variant === 'tertiary' ? '' : 'tracking-wide'}
        >
          {label}
        </Label>
      </View>
    </Pressable>
  );
};
