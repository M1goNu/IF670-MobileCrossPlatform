import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './appStyle';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}