import { supabase } from '@/lib/supabase';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const addData = async () => {
    try {
      // Mencoba memasukkan data ke tabel 'users' di Supabase
      const { error } = await supabase.from('users').insert([
        {
          first: 'Ada',
          last: 'Lovelace',
          birth: 1815,
        },
      ]);

      if (error) throw error;

      // Menampilkan pesan sukses jika data berhasil ditambahkan
      Alert.alert('Sukses', 'Data berhasil ditambahkan.');
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string })?.message ?? 'Gagal menambahkan data.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uji koneksi Supabase</Text>
      <Button title="Tambah Data" onPress={addData} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2937',
  },
});