import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Headline, Body, Label } from '@/src/components/Typography';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const cameraRef = useRef<CameraView>(null);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
    if (photo?.uri) setCapturedUri(photo.uri);
  };

  const handlePickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.85,
    });
    if (!result.canceled && result.assets.length > 0) {
      // Navigate to batch review with the first selected image
      router.push('/batch_review');
    }
  };

  const handleConfirm = () => {
    // Pass captured image URI to batch review
    router.push('/batch_review');
  };

  const handleRetake = () => {
    setCapturedUri(null);
  };

  // Permission not yet determined
  if (!permission) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background items-center justify-center">
          <Label size="md" color="text-on-secondary-container">Requesting camera access…</Label>
        </SafeAreaView>
      </>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView className="flex-1 bg-background items-center justify-center px-10 gap-6">
          <View className="w-20 h-20 rounded-full bg-surface-container-high items-center justify-center">
            <MaterialIcons name="no-photography" size={40} color="#70787e" />
          </View>
          <View className="items-center gap-2">
            <Headline size="lg" className="text-on-surface text-center">Camera Access Needed</Headline>
            <Body className="text-on-secondary-container text-center">
              ReceiptSnap needs camera access to capture your receipts.
            </Body>
          </View>
          <Pressable
            onPress={requestPermission}
            className="bg-primary px-8 py-4 rounded-xl active:opacity-80"
          >
            <Label size="md" color="text-on-primary" className="font-bold">Grant Access</Label>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Label size="sm" color="text-outline" className="font-medium">Go Back</Label>
          </Pressable>
        </SafeAreaView>
      </>
    );
  }

  // Post-capture review
  if (capturedUri) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#191c1d]">
          {/* Preview */}
          <View className="flex-1">
            <Image source={{ uri: capturedUri }} className="flex-1" resizeMode="contain" />
          </View>

          {/* Bottom actions */}
          <View className="bg-[#191c1d] px-8 py-6 gap-4">
            <View className="flex-row gap-4">
              <Pressable
                onPress={handleRetake}
                className="flex-1 flex-row items-center justify-center gap-2 bg-surface-container-high py-4 rounded-xl active:opacity-80"
              >
                <MaterialIcons name="replay" size={20} color="#004d64" />
                <Label size="md" color="text-primary" className="font-bold">Retake</Label>
              </Pressable>
              <Pressable
                onPress={handleConfirm}
                className="flex-1 flex-row items-center justify-center gap-2 bg-primary py-4 rounded-xl active:opacity-80"
              >
                <MaterialIcons name="check" size={20} color="#ffffff" />
                <Label size="md" color="text-on-primary" className="font-bold">Use Photo</Label>
              </Pressable>
            </View>
            <Pressable
              onPress={handlePickGallery}
              className="flex-row items-center justify-center gap-2 py-3 active:opacity-70"
            >
              <MaterialIcons name="photo-library" size={18} color="#bee9ff" />
              <Label size="sm" color="text-primary-fixed" className="font-medium">Add more from gallery</Label>
            </Pressable>
          </View>
        </SafeAreaView>
      </>
    );
  }

  // Live camera view
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#191c1d]">
        {/* Camera header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/10 active:bg-white/20"
          >
            <MaterialIcons name="close" size={24} color="#ffffff" />
          </Pressable>

          <Label size="md" color="text-primary-fixed" className="font-bold tracking-wide uppercase">
            Capture Receipt
          </Label>

          <Pressable
            onPress={() => setFlash((f) => (f === 'off' ? 'on' : 'off'))}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/10 active:bg-white/20"
          >
            <MaterialIcons
              name={flash === 'on' ? 'flash-on' : 'flash-off'}
              size={22}
              color={flash === 'on' ? '#bee9ff' : '#ffffff'}
            />
          </Pressable>
        </View>

        {/* Camera viewfinder */}
        <View className="flex-1 mx-4 rounded-2xl overflow-hidden">
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={facing}
            flash={flash}
          >
            {/* Corner guide marks */}
            <View className="flex-1 m-8">
              {/* Top-left */}
              <View className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-fixed rounded-tl-lg" />
              {/* Top-right */}
              <View className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-fixed rounded-tr-lg" />
              {/* Bottom-left */}
              <View className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-fixed rounded-bl-lg" />
              {/* Bottom-right */}
              <View className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-fixed rounded-br-lg" />
            </View>
          </CameraView>
        </View>

        {/* Hint label */}
        <View className="items-center py-3">
          <Label size="sm" color="text-primary-fixed" className="opacity-70 text-center">
            Position the receipt within the frame
          </Label>
        </View>

        {/* Camera controls */}
        <View className="flex-row items-center justify-around px-10 pb-6 pt-2">
          {/* Gallery picker */}
          <Pressable
            onPress={handlePickGallery}
            className="w-14 h-14 rounded-2xl bg-surface-container-high items-center justify-center active:opacity-80"
          >
            <MaterialIcons name="photo-library" size={26} color="#004d64" />
          </Pressable>

          {/* Shutter */}
          <Pressable
            onPress={handleCapture}
            className="w-20 h-20 rounded-full bg-surface-container-lowest border-4 border-primary-fixed items-center justify-center active:scale-95 active:opacity-80"
          >
            <View className="w-14 h-14 rounded-full bg-primary" />
          </Pressable>

          {/* Flip camera */}
          <Pressable
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
            className="w-14 h-14 rounded-2xl bg-surface-container-high items-center justify-center active:opacity-80"
          >
            <MaterialIcons name="flip-camera-android" size={26} color="#004d64" />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
