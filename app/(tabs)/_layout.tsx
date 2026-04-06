import { Tabs, router } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Label } from '@/src/components/Typography';

type NavKey = 'batch_history' | 'capture' | 'export_preview' | 'settings';

const NAV_ITEMS: { key: NavKey; label: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { key: 'batch_history',  label: 'History',  icon: 'history' },
  { key: 'capture',        label: 'Capture',  icon: 'add-a-photo' },
  { key: 'export_preview', label: 'Export',   icon: 'table-view' },
  { key: 'settings',       label: 'Settings', icon: 'settings' },
];

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRouteName = state.routes[state.index]?.name as NavKey;

  const handlePress = (key: NavKey) => {
    if (key === 'capture') { router.push('/capture'); return; }
    if (key === 'export_preview') { router.push('/export_preview'); return; }
    const tabIndex = state.routes.findIndex((r) => r.name === key);
    if (tabIndex !== -1) {
      navigation.navigate(state.routes[tabIndex].name);
    }
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 left-0 right-0 z-50 flex-row justify-around items-center pt-3 px-4 bg-surface-container-lowest/90 border-t border-outline-variant/15 shadow-[0_-12px_32px_-4px_rgba(0,77,100,0.08)]"
    >
      {NAV_ITEMS.map(({ key, label, icon }) => {
        const isActive = key === activeRouteName;
        const iconColor  = isActive ? '#004d64' : '#576670';
        const labelColor = isActive ? 'text-primary' : 'text-on-secondary-container';

        return (
          <Pressable
            key={key}
            onPress={() => handlePress(key)}
            className={`flex-col items-center justify-center px-5 py-1.5 rounded-xl ${isActive ? 'bg-primary-fixed' : ''}`}
          >
            <MaterialIcons name={icon} size={24} color={iconColor} />
            <Label size="sm" color={labelColor} className="text-[11px] tracking-wide uppercase font-medium mt-1">
              {label}
            </Label>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="batch_history" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
