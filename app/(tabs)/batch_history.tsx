import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Headline, Body, Label } from '@/src/components/Typography';
import { Card } from '@/src/components/Card';
import { Badge } from '@/src/components/Badge';
import { Button } from '@/src/components/Button';

type BatchStatus = 'exported' | 'pending';

interface BatchItem {
  id: string;
  title: string;
  receiptCount: number;
  status: BatchStatus;
  date: string | null;
  progress?: number;
  thumbnailCount: number;
}

const SAMPLE_BATCHES: BatchItem[] = [
  {
    id: '1',
    title: 'Weekly Expenses Oct 17–23',
    receiptCount: 12,
    status: 'exported',
    date: 'Oct 24, 2023',
    thumbnailCount: 1,
  },
  {
    id: '2',
    title: 'Digital Nomad Supplies',
    receiptCount: 5,
    status: 'pending',
    date: null,
    progress: 65,
    thumbnailCount: 0,
  },
  {
    id: '3',
    title: 'Client Meeting – London',
    receiptCount: 8,
    status: 'exported',
    date: 'Oct 12, 2023',
    thumbnailCount: 2,
  },
  {
    id: '4',
    title: 'Home Office Refresh',
    receiptCount: 2,
    status: 'exported',
    date: 'Oct 05, 2023',
    thumbnailCount: 1,
  },
];

function ThumbnailStack({ count, overflow }: { count: number; overflow: number }) {
  const slots = Array.from({ length: Math.min(count, 2) });
  return (
    <View className="flex-row items-center">
      {slots.map((_, i) => (
        <View
          key={i}
          className="w-8 h-8 rounded-lg bg-secondary-container items-center justify-center border-2 border-surface-container-lowest"
          style={{ marginLeft: i > 0 ? -8 : 0 }}
        >
          <MaterialIcons name="receipt" size={14} color="#576670" />
        </View>
      ))}
      {overflow > 0 && (
        <View
          className="w-8 h-8 rounded-lg bg-secondary-container items-center justify-center border-2 border-surface-container-lowest"
          style={{ marginLeft: slots.length > 0 ? -8 : 0 }}
        >
          <Label size="sm" color="text-on-secondary-container" className="text-[10px] font-bold">
            +{overflow}
          </Label>
        </View>
      )}
    </View>
  );
}

function BatchCard({ item }: { item: BatchItem }) {
  const overflow = Math.max(0, item.receiptCount - item.thumbnailCount);

  return (
    <Card className="p-5">
      {/* Card Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 gap-1 mr-3">
          <Headline size="lg" className="text-on-surface leading-snug">{item.title}</Headline>
          <View className="flex-row items-center gap-1.5">
            <MaterialIcons name="receipt-long" size={16} color="#576670" />
            <Body size="sm" color="text-on-secondary-container">
              {item.receiptCount} Receipt{item.receiptCount !== 1 ? 's' : ''}
            </Body>
          </View>
        </View>

        <View className="items-end gap-2">
          <Badge label={item.status === 'exported' ? 'Exported' : 'Pending'} status={item.status} />
          <Label size="sm" color="text-outline" className="text-[11px] font-medium">
            {item.date ?? 'In Queue'}
          </Label>
        </View>
      </View>

      {/* Card Footer — ghost border divider */}
      <View className="border-t border-outline-variant/15 pt-4 flex-row justify-between items-center">
        {item.status === 'exported' ? (
          <>
            <ThumbnailStack count={item.thumbnailCount} overflow={overflow} />
            <Button
              label="CSV"
              variant="primary"
              icon="download"
            />
          </>
        ) : (
          <>
            {/* Progress bar */}
            <View className="flex-row items-center gap-3">
              <View className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${item.progress ?? 0}%` }}
                />
              </View>
              <Label size="sm" color="text-primary" className="text-[11px] font-bold">
                {item.progress}%
              </Label>
            </View>
            <Button label="View Details" variant="tertiary" onPress={() => router.push('/export_preview')} />
          </>
        )}
      </View>
    </Card>
  );
}

export default function BatchHistoryScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Editorial Header */}
        <View className="mb-10">
          <Label size="sm" color="text-primary" className="uppercase tracking-[0.15em] font-semibold mb-2">
            Archive Overview
          </Label>
          <Headline size="xl" className="text-on-surface">Batch History</Headline>
          <Body className="text-on-secondary-container mt-2">
            Review and manage your processed receipt ledgers.
          </Body>
        </View>

        {/* History Cards */}
        <View className="gap-4">
          {SAMPLE_BATCHES.map((item) => (
            <BatchCard key={item.id} item={item} />
          ))}
        </View>

        {/* Load More */}
        <View className="mt-8 items-center">
          <Pressable className="px-6 py-3 border border-outline-variant/30 rounded-lg active:opacity-70">
            <Label
              size="sm"
              color="text-primary"
              className="uppercase tracking-widest font-bold"
            >
              Load older batches
            </Label>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
