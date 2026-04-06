import React, { useState } from 'react';
import { ScrollView, View, Pressable, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Headline, Body, Label } from '@/src/components/Typography';
import { Card } from '@/src/components/Card';
import { Input } from '@/src/components/Input';
import { Button } from '@/src/components/Button';
import { BottomNavBar } from '@/src/components/BottomNavBar';

const CATEGORIES = ['Travel', 'Meals', 'Supplies', 'Office', 'Entertainment', 'Hardware', 'Infrastructure'];
const TOTAL = 12;

const SMART_SUGGESTIONS = ['Map to: Project Alpha', 'Add Tax: 8.5%', 'Reimbursable'];

export default function BatchReviewScreen() {
  const [current, setCurrent] = useState(3);
  const [vendor, setVendor] = useState('Blue Bottle Coffee');
  const [amount, setAmount] = useState('12.50');
  const [date, setDate] = useState('2023-10-24');
  const [category, setCategory] = useState('Meals');
  const [notes, setNotes] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const progress = Math.round((current / TOTAL) * 100);

  const handlePrev = () => setCurrent((c) => Math.max(1, c - 1));
  const handleNext = () => {
    if (current < TOTAL) {
      setCurrent((c) => c + 1);
    } else {
      router.push('/export_preview');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 180 }}>

          {/* Top Bar */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-container-high"
            >
              <MaterialIcons name="arrow-back" size={24} color="#004d64" />
            </Pressable>
            <Headline size="md" className="text-primary">ReceiptSnap</Headline>
            <View className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center">
              <MaterialIcons name="person" size={20} color="#576670" />
            </View>
          </View>

          <View className="px-6 gap-6">
            {/* Page Header + Navigation */}
            <View className="gap-4">
              <View>
                <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-[0.1em] text-[11px] mb-1">
                  Batch Review
                </Label>
                <Headline size="xl" className="text-primary tracking-tight">
                  Reviewing {current} of {TOTAL} Receipts
                </Headline>
              </View>

              {/* Prev / Dots / Next */}
              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={handlePrev}
                  className="flex-row items-center gap-1 bg-surface-container-low px-4 py-2.5 rounded-xl active:bg-surface-container-high"
                >
                  <MaterialIcons name="chevron-left" size={20} color="#576670" />
                  <Label size="md" color="text-on-secondary-container" className="font-bold">Previous</Label>
                </Pressable>

                <View className="flex-row gap-1.5 flex-1 justify-center">
                  {Array.from({ length: Math.min(TOTAL, 5) }).map((_, i) => (
                    <View
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${i < Math.min(current, 5) ? 'bg-primary' : 'bg-surface-container-highest'}`}
                    />
                  ))}
                </View>

                <Pressable
                  onPress={handleNext}
                  className="flex-row items-center gap-1 bg-primary px-4 py-2.5 rounded-xl active:opacity-80"
                >
                  <Label size="md" color="text-on-primary" className="font-bold">
                    {current === TOTAL ? 'Export' : 'Next'}
                  </Label>
                  <MaterialIcons name="chevron-right" size={20} color="#ffffff" />
                </Pressable>
              </View>
            </View>

            {/* Receipt Image Preview */}
            <Card className="p-4">
              <View
                className="bg-surface-container-low rounded-lg overflow-hidden items-center justify-center"
                style={{ aspectRatio: 3 / 4 }}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="contain" />
                ) : (
                  <View className="items-center gap-3">
                    <MaterialIcons name="receipt-long" size={64} color="#bfc8cd" />
                    <Label size="sm" color="text-outline" className="text-center">
                      No image captured
                    </Label>
                    <Pressable
                      onPress={() => router.push('/capture')}
                      className="flex-row items-center gap-2 bg-primary-fixed px-4 py-2 rounded-full active:opacity-80"
                    >
                      <MaterialIcons name="add-a-photo" size={16} color="#004d64" />
                      <Label size="sm" color="text-primary" className="font-semibold">Capture Receipt</Label>
                    </Pressable>
                  </View>
                )}
              </View>

              {/* Image actions */}
              <View className="flex-row justify-center gap-6 mt-4">
                <Pressable className="flex-row items-center gap-1.5 px-3 py-2 rounded-lg active:bg-error-container/10">
                  <MaterialIcons name="delete" size={18} color="#ba1a1a" />
                  <Label size="sm" color="text-error" className="font-bold">Discard Receipt</Label>
                </Pressable>
                <Pressable className="flex-row items-center gap-1.5 px-3 py-2 rounded-lg active:bg-primary-fixed/30">
                  <MaterialIcons name="rotate-right" size={18} color="#004d64" />
                  <Label size="sm" color="text-primary" className="font-bold">Rotate</Label>
                </Pressable>
              </View>
            </Card>

            {/* Data Entry Form */}
            <Card elevation="low" className="p-6 gap-6">
              <View className="gap-4">
                {/* Vendor + Amount row */}
                <Input
                  label="Vendor Name"
                  value={vendor}
                  onChangeText={setVendor}
                  placeholder="Enter vendor"
                  icon="store"
                />

                {/* Amount with $ prefix */}
                <View className="gap-2">
                  <Label size="md" color="text-on-surface-variant" className="font-semibold ml-1">Amount</Label>
                  <View className="relative justify-center">
                    <TextInput
                      className="bg-surface-container-highest rounded-xl pl-8 pr-14 py-4 text-lg text-on-surface font-bold border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest"
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="decimal-pad"
                      placeholderTextColor="#70787e"
                    />
                    <Label size="md" color="text-on-surface-variant" className="absolute left-4 font-bold">$</Label>
                    <Label size="sm" color="text-outline-variant" className="absolute right-4 font-medium">CAD</Label>
                  </View>
                </View>

                <Input
                  label="Date"
                  value={date}
                  onChangeText={setDate}
                  placeholder="YYYY-MM-DD"
                  icon="calendar-today"
                  keyboardType="numbers-and-punctuation"
                />

                {/* Category picker */}
                <View className="gap-2">
                  <Label size="md" color="text-on-surface-variant" className="font-semibold ml-1">Category</Label>
                  <Pressable
                    onPress={() => setCategoryOpen((o) => !o)}
                    className="bg-surface-container-highest rounded-xl px-4 py-4 flex-row justify-between items-center border-2 border-transparent"
                  >
                    <Body color="text-on-surface">{category}</Body>
                    <MaterialIcons name={categoryOpen ? 'expand-less' : 'expand-more'} size={24} color="#70787e" />
                  </Pressable>
                  {categoryOpen && (
                    <Card elevation="ambient" className="overflow-hidden">
                      {CATEGORIES.map((cat) => (
                        <Pressable
                          key={cat}
                          onPress={() => { setCategory(cat); setCategoryOpen(false); }}
                          className={`px-4 py-3 active:bg-primary-fixed/20 ${cat === category ? 'bg-primary-fixed/30' : ''}`}
                        >
                          <Body color={cat === category ? 'text-primary' : 'text-on-surface'} className={cat === category ? 'font-semibold' : ''}>
                            {cat}
                          </Body>
                        </Pressable>
                      ))}
                    </Card>
                  )}
                </View>

                {/* Notes */}
                <View className="gap-2">
                  <Label size="md" color="text-on-surface-variant" className="font-semibold ml-1">Notes (Optional)</Label>
                  <TextInput
                    className="bg-surface-container-highest rounded-xl px-4 py-4 text-on-surface border-2 border-transparent focus:border-primary focus:bg-surface-container-lowest"
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Client meeting lunch..."
                    placeholderTextColor="#70787e"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    style={{ minHeight: 80 }}
                  />
                </View>
              </View>

              {/* Form Actions */}
              <View className="border-t border-outline-variant/15 pt-6 gap-3">
                <Button
                  label={current === TOTAL ? 'Go to Export' : 'Review Next'}
                  variant="primary"
                  icon="arrow-forward"
                  fullWidth
                  onPress={handleNext}
                />
                <Button
                  label="Go to Export"
                  variant="secondary"
                  fullWidth
                  onPress={() => router.push('/export_preview')}
                />
              </View>
            </Card>

            {/* Smart Suggestions */}
            <Card elevation="none" className="p-6 gap-4">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="auto-awesome" size={20} color="#005045" />
                <Headline size="md" className="text-on-surface">Smart Suggestions</Headline>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {SMART_SUGGESTIONS.map((s) => (
                  <Pressable
                    key={s}
                    className="bg-tertiary-fixed/30 px-4 py-2 rounded-full active:bg-tertiary-fixed"
                  >
                    <Label size="sm" color="text-on-tertiary-fixed-variant" className="font-medium">{s}</Label>
                  </Pressable>
                ))}
              </View>
            </Card>
          </View>
        </ScrollView>

        {/* Glass Progress Bar — sits above the nav bar */}
        <View className="absolute bottom-20 left-0 right-0 px-6">
          <View className="bg-surface-container-lowest/90 border border-outline-variant/20 rounded-full px-6 py-3 flex-row items-center gap-4 shadow-lg">
            <View className="flex-1">
              <View className="flex-row justify-between items-end mb-1.5">
                <Label size="sm" color="text-primary" className="text-[10px] font-bold uppercase">Batch Completion</Label>
                <Headline size="sm" className="text-primary text-xs">{progress}%</Headline>
              </View>
              <View className="h-1.5 bg-primary-fixed rounded-full overflow-hidden">
                <View className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
              </View>
            </View>
            <View className="w-8 h-8 rounded-full bg-primary-container items-center justify-center">
              <MaterialIcons name="sync" size={16} color="#ffffff" />
            </View>
            <Label size="sm" color="text-on-surface" className="text-[11px] font-bold leading-tight">
              Processing{'\n'}Remaining
            </Label>
          </View>
        </View>

        <BottomNavBar
          items={[
            { key: 'batch_history',  label: 'History',  icon: 'history',     isActive: false },
            { key: 'capture',        label: 'Capture',  icon: 'add-a-photo', isActive: true },
            { key: 'export_preview', label: 'Export',   icon: 'table-view',  isActive: false },
            { key: 'settings',       label: 'Settings', icon: 'settings',    isActive: false },
          ]}
          onSelect={(key) => {
            if (key === 'capture') { router.push('/capture'); return; }
            if (key === 'export_preview') { router.push('/export_preview'); return; }
            if (key === 'settings') { router.push('/(tabs)/settings'); return; }
            router.push('/(tabs)/batch_history');
          }}
        />
      </SafeAreaView>
    </>
  );
}
