import React, { useState } from 'react';
import { ScrollView, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Headline, Body, Label } from '@/src/components/Typography';
import { Card } from '@/src/components/Card';
import { BottomNavBar } from '@/src/components/BottomNavBar';

interface ReceiptRow {
  id: string;
  vendor: string;
  subtitle: string;
  date: string;
  category: string;
  amount: number;
}

const RECEIPTS: ReceiptRow[] = [
  { id: '1', vendor: 'Blue Bottle Coffee', subtitle: 'San Francisco, CA', date: 'Oct 24, 2023', category: 'Business Meals', amount: 18.40 },
  { id: '2', vendor: 'Apple Store', subtitle: 'Online Store', date: 'Oct 22, 2023', category: 'Hardware', amount: 2499.00 },
  { id: '3', vendor: 'Lufthansa Airlines', subtitle: 'Flight LH456', date: 'Oct 21, 2023', category: 'Travel', amount: 1245.50 },
  { id: '4', vendor: 'AWS Services', subtitle: 'Oct 2023 Usage', date: 'Oct 19, 2023', category: 'Infrastructure', amount: 518.55 },
];

const BATCH_TOTAL = RECEIPTS.reduce((sum, r) => sum + r.amount, 0);
const BATCH_COUNT = 12;

const SNAPSHOTS = [
  { id: '1', vendor: 'Blue Bottle', date: 'Oct 24' },
  { id: '2', vendor: 'Apple Store', date: 'Oct 22' },
  { id: '3', vendor: 'Lufthansa', date: 'Oct 21' },
  { id: '4', vendor: 'AWS Billing', date: 'Oct 19' },
];

// Minimal column widths for the horizontal-scrollable ledger table
const COL = { vendor: 180, date: 110, category: 130, amount: 90, actions: 80 };

function LedgerTable({ rows }: { rows: ReceiptRow[] }) {
  return (
    <Card elevation="low" className="overflow-hidden">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View className="flex-row bg-surface-container-high/50 px-2">
            <View style={{ width: COL.vendor }} className="px-4 py-3">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-wider text-[11px] font-bold">Vendor</Label>
            </View>
            <View style={{ width: COL.date }} className="px-4 py-3">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-wider text-[11px] font-bold">Date</Label>
            </View>
            <View style={{ width: COL.category }} className="px-4 py-3">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-wider text-[11px] font-bold">Category</Label>
            </View>
            <View style={{ width: COL.amount }} className="px-4 py-3 items-end">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-wider text-[11px] font-bold">Amount</Label>
            </View>
            <View style={{ width: COL.actions }} className="px-4 py-3 items-end">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-wider text-[11px] font-bold">Actions</Label>
            </View>
          </View>

          {/* Rows */}
          {rows.map((row, i) => (
            <View
              key={row.id}
              className={`flex-row px-2 border-t border-outline-variant/10 ${i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/30'}`}
            >
              <View style={{ width: COL.vendor }} className="px-4 py-4 justify-center">
                <Headline size="sm" className="text-primary">{row.vendor}</Headline>
                <Label size="sm" color="text-outline" className="text-[10px] mt-0.5">{row.subtitle}</Label>
              </View>
              <View style={{ width: COL.date }} className="px-4 py-4 justify-center">
                <Body size="sm" color="text-on-secondary-container">{row.date}</Body>
              </View>
              <View style={{ width: COL.category }} className="px-4 py-4 justify-center">
                <View className="bg-secondary-container self-start px-2 py-1 rounded">
                  <Label size="sm" color="text-on-secondary-container" className="text-[10px] uppercase tracking-tight font-bold">
                    {row.category}
                  </Label>
                </View>
              </View>
              <View style={{ width: COL.amount }} className="px-4 py-4 justify-center items-end">
                <Headline size="sm" className="text-primary font-bold">
                  ${row.amount.toFixed(2)}
                </Headline>
              </View>
              <View style={{ width: COL.actions }} className="px-4 py-4 justify-center">
                <View className="flex-row gap-2 justify-end">
                  <Pressable className="w-8 h-8 items-center justify-center rounded-lg active:bg-surface-container-high">
                    <MaterialIcons name="edit" size={18} color="#004d64" />
                  </Pressable>
                  <Pressable className="w-8 h-8 items-center justify-center rounded-lg active:bg-error-container/20">
                    <MaterialIcons name="delete" size={18} color="#ba1a1a" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
}

function SnapshotCard({ vendor, date }: { vendor: string; date: string }) {
  return (
    <View className="bg-surface-container-high rounded-xl overflow-hidden mr-4" style={{ width: 140, aspectRatio: 3 / 4 }}>
      <View className="flex-1 items-center justify-center">
        <MaterialIcons name="receipt-long" size={40} color="#bfc8cd" />
      </View>
      <View className="bg-primary/80 px-3 py-2">
        <Label size="sm" color="text-on-primary" className="text-xs font-bold">{vendor}</Label>
        <Label size="sm" color="text-primary-fixed" className="text-[10px]">{date}</Label>
      </View>
    </View>
  );
}

export default function ExportPreviewScreen() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top']} className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>

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

          <View className="px-6">
            {/* Breadcrumb */}
            <View className="flex-row items-center gap-2 mb-2">
              <Label size="sm" color="text-on-secondary-container" className="uppercase tracking-[0.1em] text-[11px] opacity-60">
                Batch Workflow
              </Label>
              <MaterialIcons name="chevron-right" size={14} color="#70787e" />
              <Label size="sm" color="text-primary" className="uppercase tracking-[0.1em] text-[11px]">
                Export Preview
              </Label>
            </View>

            {/* Page Title + Summary */}
            <View className="mb-8 gap-4">
              <View>
                <Headline size="xl" className="text-primary tracking-tight">Review Export Data</Headline>
                <Body className="text-on-secondary-container mt-1">
                  Verify the extracted information from {BATCH_COUNT} receipts before generating your Invoice Ninja CSV ledger.
                </Body>
              </View>

              {/* Summary card */}
              <Card className="p-4 flex-row items-center gap-6 self-start">
                <View>
                  <Label size="sm" color="text-outline" className="text-[10px] uppercase font-bold">Batch Total</Label>
                  <Headline size="lg" className="text-primary">${BATCH_TOTAL.toFixed(2)}</Headline>
                </View>
                <View className="w-px h-10 bg-outline-variant/15" />
                <View>
                  <Label size="sm" color="text-outline" className="text-[10px] uppercase font-bold">Items</Label>
                  <Headline size="lg" className="text-primary">{BATCH_COUNT}</Headline>
                </View>
              </Card>
            </View>

            {/* Ledger Table */}
            <LedgerTable rows={RECEIPTS} />

            {/* Finalize Batch card */}
            <View className="mt-6 bg-primary rounded-xl p-6 gap-6">
              <View className="bg-white/10 w-12 h-12 rounded-lg items-center justify-center">
                <MaterialIcons name="sim-card-download" size={28} color="#ffffff" />
              </View>
              <View className="gap-1">
                <Headline size="lg" color="text-on-primary">Finalize Batch</Headline>
                <Body size="sm" color="text-on-primary" className="opacity-80 leading-relaxed">
                  Download your data in the optimized CSV format for direct import into Invoice Ninja.
                </Body>
              </View>
              <Pressable
                onPress={handleExport}
                className="bg-primary-fixed rounded-xl py-4 flex-row items-center justify-center gap-2 active:opacity-80"
              >
                {isExporting ? (
                  <ActivityIndicator size="small" color="#001f2a" />
                ) : (
                  <>
                    <Label size="md" color="text-on-primary-fixed" className="font-bold">Download CSV</Label>
                    <MaterialIcons name="arrow-forward" size={20} color="#001f2a" />
                  </>
                )}
              </Pressable>
            </View>

            {/* Export Status card */}
            <Card className="mt-4 p-6 gap-4">
              <Label size="sm" color="text-outline" className="text-[11px] uppercase tracking-widest font-bold">
                Export Status
              </Label>
              <View className="gap-4">
                <View className="flex-row justify-between items-center">
                  <Body size="sm" color="text-on-secondary-container">Integrity Check</Body>
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="check-circle" size={16} color="#006a5c" />
                    <Label size="sm" color="text-tertiary-container" className="font-bold">Passed</Label>
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <Body size="sm" color="text-on-secondary-container">Duplicates</Body>
                  <Body size="sm" className="font-medium text-on-surface">0 Found</Body>
                </View>
                <View className="flex-row justify-between items-center">
                  <Body size="sm" color="text-on-secondary-container">Target</Body>
                  <Body size="sm" className="font-medium text-on-surface">Invoice Ninja</Body>
                </View>
              </View>
              <View className="border-t border-outline-variant/10 pt-4">
                <Pressable className="flex-row items-center gap-2 active:opacity-70">
                  <MaterialIcons name="settings" size={18} color="#004d64" />
                  <Label size="sm" color="text-primary" className="font-bold">Export Settings</Label>
                </Pressable>
              </View>
            </Card>

            {/* Original Snapshots */}
            <View className="mt-10">
              <Headline size="lg" className="text-primary mb-4">Original Snapshots</Headline>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                {SNAPSHOTS.map((s) => (
                  <SnapshotCard key={s.id} vendor={s.vendor} date={s.date} />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        {/* Generating overlay */}
        {isExporting && (
          <View className="absolute bottom-24 left-1/2 -translate-x-1/2">
            <View className="bg-surface-container-lowest/90 border border-outline-variant/20 rounded-full px-6 py-3 flex-row items-center gap-3 shadow-lg">
              <ActivityIndicator size="small" color="#004d64" />
              <Label size="sm" color="text-primary" className="font-bold">Generating CSV...</Label>
            </View>
          </View>
        )}

        <BottomNavBar
          items={[
            { key: 'batch_history', label: 'History',  icon: 'history',     isActive: true },
            { key: 'capture',       label: 'Capture',  icon: 'add-a-photo',  isActive: false },
            { key: 'settings',      label: 'Settings', icon: 'settings',     isActive: false },
          ]}
          onSelect={(key) => {
            if (key === 'capture') { router.push('/capture'); return; }
            if (key === 'settings') { router.push('/(tabs)/settings'); return; }
            router.push('/(tabs)/batch_history');
          }}
        />
      </SafeAreaView>
    </>
  );
}
