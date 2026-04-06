import React, { useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Label } from './Typography';
import { MaterialIcons } from '@expo/vector-icons';

export interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
  className?: string;
}

export const Input = ({
  label,
  icon,
  error,
  className = '',
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerBg = isFocused ? 'bg-surface-container-lowest' : 'bg-surface-container-highest';
  const borderRing = isFocused ? 'border-2 border-primary shadow-sm' : 'border-2 border-transparent';
  const errorRing = error ? 'border-2 border-error' : '';

  return (
    <View className={`flex-col gap-2 ${className}`}>
      {label && (
        <Label size="md" color="text-on-surface-variant" className="font-semibold ml-1">
          {label}
        </Label>
      )}
      <View className="relative justify-center">
        <TextInput
          className={`w-full ${containerBg} ${errorRing || borderRing} rounded-xl px-4 py-4 text-base text-on-surface transition-all font-body ${icon ? 'pr-12' : ''}`}
          placeholderTextColor="#70787e" // outline color
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {icon && (
          <View className="absolute right-4">
            <MaterialIcons 
              name={icon} 
              size={24} 
              color="#70787e" // outline color
            />
          </View>
        )}
      </View>
      {error && (
        <Label size="sm" color="text-error" className="ml-1">
          {error}
        </Label>
      )}
    </View>
  );
};
