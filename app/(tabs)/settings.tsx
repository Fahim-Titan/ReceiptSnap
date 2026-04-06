import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Headline, Body, Label } from '@/src/components/Typography';
import { Card } from '@/src/components/Card';
import { Input } from '@/src/components/Input';
import { Button } from '@/src/components/Button';

export default function SettingsScreen() {
  const [taxName, setTaxName] = useState('VAT');
  const [taxRate, setTaxRate] = useState('20');
  const [defaultPayment, setDefaultPayment] = useState('Corporate Card');

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-8">
          <Label size="sm" color="text-primary" className="uppercase tracking-[0.15em] font-semibold mb-2">
            Configuration
          </Label>
          <Headline size="xl" className="text-on-surface">Settings</Headline>
          <Body className="text-on-secondary-container mt-2">
            Configure your default parameters for receipt scanning and exporting.
          </Body>
        </View>

        <View className="gap-6">
          <Card className="p-6">
            <Headline size="md" className="mb-4 text-primary">Tax & Regional</Headline>
            <View className="gap-4">
              <Input 
                label="Default Tax Name" 
                value={taxName}
                onChangeText={setTaxName}
                icon="account-balance"
              />
              <Input 
                label="Default Tax Rate (%)" 
                value={taxRate}
                onChangeText={setTaxRate}
                keyboardType="decimal-pad"
                icon="percent"
              />
            </View>
          </Card>

          <Card className="p-6">
            <Headline size="md" className="mb-4 text-primary">Preferences</Headline>
            <Input 
              label="Default Payment Type" 
              value={defaultPayment}
              onChangeText={setDefaultPayment}
              icon="credit-card"
            />
          </Card>

          <Card className="p-6">
            <Headline size="md" className="mb-4 text-error">Data Management</Headline>
            <Body className="text-on-surface-variant mb-4">
              Clearing the cache will remove pending receipts not yet exported. This cannot be undone.
            </Body>
            <Button 
              label="Clear Storage Cache" 
              variant="secondary"
              icon="delete-outline"
              className="bg-error-container/20"
              contentClassName="text-error"
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
