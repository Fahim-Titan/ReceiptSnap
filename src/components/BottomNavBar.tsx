import React from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const ACTIVE_COLOR   = '#004d64'; // primary
const INACTIVE_COLOR = '#576670'; // on-secondary-container

export const BottomNavBar = ({ items, onSelect, className = '' }: BottomNavBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className={`absolute bottom-0 left-0 right-0 z-50 flex-row justify-around items-center pt-3 px-4 bg-surface-container-lowest/90 border-t border-outline-variant/15 shadow-[0_-12px_32px_-4px_rgba(0,77,100,0.08)] ${className}`}
    >
      {items.map((item) => {
        const iconColor  = item.isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
        const labelColor = item.isActive ? 'text-primary' : 'text-on-secondary-container';

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            className={`flex-col items-center justify-center px-5 py-1.5 rounded-xl ${item.isActive ? 'bg-primary-fixed' : ''}`}
          >
            <MaterialIcons name={item.icon} size={24} color={iconColor} />
            <Label size="sm" color={labelColor} className="text-[11px] tracking-wide uppercase font-medium mt-1">
              {item.label}
            </Label>
          </Pressable>
        );
      })}
    </View>
  );
};
