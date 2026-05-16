import * as Notifications from "expo-notifications";
import { supabase } from "./supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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

// Ambil stats dari Supabase
const getStats = async () => {
  const { data, error } = await supabase
    .from("upload_stats")
    .select("success_count, failed_count")
    .eq("id", 1)
    .single();

  if (error || !data) return { success_count: 0, failed_count: 0 };
  return data;
};

// Update stats di Supabase
const updateStats = async (isSuccess: boolean) => {
  const stats = await getStats();

  const updated = isSuccess
    ? { success_count: stats.success_count + 1 }
    : { failed_count: stats.failed_count + 1 };

  await supabase
    .from("upload_stats")
    .update(updated)
    .eq("id", 1);

  return {
    success_count: isSuccess
      ? stats.success_count + 1
      : stats.success_count,
    failed_count: !isSuccess
      ? stats.failed_count + 1
      : stats.failed_count,
  };
};

// Kirim notifikasi sukses
export const sendSuccessNotification = async (
  latitude: number,
  longitude: number
) => {
  const { success_count, failed_count } = await updateStats(true);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Supabase Upload",
      body: `${success_count} successful, ${failed_count} unsuccessful.\n📍 Lat: ${latitude.toFixed(6)} | Long: ${longitude.toFixed(6)}`,
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
  const { success_count, failed_count } = await updateStats(false);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Supabase Upload",
      body: `${success_count} successful, ${failed_count} unsuccessful.\n📍 Lat: ${latitude.toFixed(6)} | Long: ${longitude.toFixed(6)}`,
      data: { latitude, longitude, errorMessage },
    },
    trigger: null,
  });
};