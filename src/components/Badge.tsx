import React from 'react';
import { View } from 'react-native';
import { Label } from './Typography';

export interface BadgeProps {
  label: string;
  status?: 'pending' | 'exported' | 'suggested' | 'error';
  className?: string;
}

export const Badge = ({
  label,
  status = 'pending',
  className = '',
}: BadgeProps) => {
  const getStyles = () => {
    switch (status) {
      case 'exported':
        return {
          bg: 'bg-tertiary-fixed',
          text: 'text-on-tertiary-fixed-variant'
        };
      case 'suggested':
        return {
          bg: 'bg-tertiary-fixed/30',
          text: 'text-on-tertiary-fixed-variant'
        };
      case 'error':
        return {
          bg: 'bg-error-container',
          text: 'text-error'
        };
      case 'pending':
      default:
        return {
          bg: 'bg-secondary-container',
          text: 'text-on-secondary-container'
        };
    }
  };

  const { bg, text } = getStyles();

  return (
    <View className={`${bg} self-start px-3 py-1 rounded-full ${className}`}>
      <Label size="sm" color={text} className="uppercase tracking-wider text-[10px] font-bold">
        {label}
      </Label>
    </View>
  );
};
