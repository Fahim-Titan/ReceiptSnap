import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { Label } from './Typography';
import { MaterialIcons } from '@expo/vector-icons';

export interface NavItem {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isActive?: boolean;
}

export interface BottomNavBarProps {
  items: NavItem[];
  onSelect: (key: string) => void;
  className?: string;
}

export const BottomNavBar = ({
  items,
  onSelect,
  className = '',
}: BottomNavBarProps) => {
  return (
    <View 
      className={`absolute bottom-0 left-0 right-0 z-50 flex-row justify-around items-center px-4 pb-6 pt-3 border-t border-outline-variant/15 shadow-[0_-12px_32px_-4px_rgba(0,77,100,0.08)] bg-surface/90 dark:bg-slate-900/90 ${className}`}
      // Normally glassmorphism would use expo-blur, but via tailwind background opacity is a solid fallback for Expo web handling.
    >
      {items.map((item) => {
        const activeContainerStyles = item.isActive
          ? 'bg-primary-fixed dark:bg-primary-container rounded-xl'
          : 'bg-transparent';
          
        const activeTextStyles = item.isActive
          ? 'text-primary dark:text-white'
          : 'text-on-secondary-container dark:text-slate-400';

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            className={`flex-col items-center justify-center px-4 py-1.5 transition-all duration-300 ${activeContainerStyles}`}
          >
            <MaterialIcons 
              name={item.icon} 
              size={24} 
              className={`mb-1 ${activeTextStyles}`}
              color="currentColor" 
              style={{color: 'inherit'}}
            />
            <Label size="sm" color={activeTextStyles} className="text-[11px] tracking-wide uppercase font-medium">
              {item.label}
            </Label>
          </Pressable>
        );
      })}
    </View>
  );
};
