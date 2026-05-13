import * as Notifications from "expo-notifications";

// Konfigurasi tampilan notifikasi saat app foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Minta permission notifikasi (local only, tanpa push token)
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowSound: true,
      allowBadge: false,
    },
  });

  if (status !== "granted") {
    alert("Notification permission is required!");
    return false;
  }
  return true;
};

// Kirim notifikasi sukses
export const sendSuccessNotification = async (
  latitude: number,
  longitude: number
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Data Berhasil Disimpan",
      body: `Foto berhasil diunggah ke Supabase.\n📍 Lat: ${latitude.toFixed(6)}\n📍 Long: ${longitude.toFixed(6)}`,
      data: { latitude, longitude },
    },
    trigger: null,
  });
};

// Kirim notifikasi gagal
export const sendFailedNotification = async (
  latitude: number,
  longitude: number,
  errorMessage: string
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "❌ Data Gagal Disimpan",
      body: `Gagal mengunggah ke Supabase.\n📍 Lat: ${latitude.toFixed(6)}\n📍 Long: ${longitude.toFixed(6)}\nError: ${errorMessage}`,
      data: { latitude, longitude, errorMessage },
    },
    trigger: null,
  });
};