<script setup>
import { ref } from 'vue';
import { 
  User, Lock, Bell, Save, Camera, Mail, 
  Phone, MapPin, Shield, Smartphone 
} from 'lucide-vue-next';
import { useAcademicStore } from '~/stores/academic';
import { useToastStore } from '~/stores/toast'; // Import Toast Store

useHead({
  title: 'Pengaturan Akun - SMK 09 Learning Portal',
});

const store = useAcademicStore();
const toast = useToastStore(); // Inisialisasi Toast
const activeTab = ref('profile'); // 'profile', 'security', 'notifications'
const isLoading = ref(false);

// --- FORM STATE ---
const profileForm = ref({
  name: store.student.name,
  email: 'rizky.fauzan@smk09.sch.id', // Dummy Email
  phone: '0812-3456-7890',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  bio: 'Siswa jurusan TKJ yang antusias mempelajari jaringan dan pemrograman.'
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const notificationSettings = ref({
  emailExam: true,
  emailAssignment: true,
  pushGrades: true,
  pushNews: false
});

// --- ACTIONS ---
const handleSaveProfile = () => {
  isLoading.value = true;
  // Simulasi API Call
  setTimeout(() => {
    isLoading.value = false;
    
    // Notifikasi Sukses
    toast.add({
      type: 'success',
      title: 'Profil Diperbarui',
      message: 'Perubahan data diri Anda berhasil disimpan ke sistem.',
      duration: 3000
    });

    // Update store (optional)
    store.student.name = profileForm.value.name;
  }, 1500);
};

const handleChangePassword = () => {
  // Validasi Password
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    // Notifikasi Warning
    toast.add({
      type: 'warning',
      title: 'Validasi Gagal',
      message: 'Konfirmasi password baru tidak cocok. Silakan cek kembali.',
      duration: 4000
    });
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    
    // Notifikasi Sukses
    toast.add({
      type: 'success',
      title: 'Keamanan Diupdate',
      message: 'Password berhasil diubah. Silakan login ulang nanti dengan password baru.',
      duration: 4000
    });

    passwordForm.value = { current: '', new: '', confirm: '' };
  }, 1500);
};
</script>

<template>
  <div class="space-y-6">
    
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Pengaturan Akun</h1>
      <p class="text-slate-500 mt-1 text-sm">Kelola informasi profil, keamanan, dan preferensi aplikasimu.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 items-start">
      
      <div class="w-full lg:w-64 flex-shrink-0 space-y-2">
        <button 
          v-for="tab in [
            { id: 'profile', label: 'Profil Saya', icon: User },
            { id: 'security', label: 'Keamanan & Password', icon: Shield },
            { id: 'notifications', label: 'Notifikasi', icon: Bell },
          ]"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          :class="activeTab === tab.id 
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'"
        >
          <component :is="tab.icon" :size="18" />
          {{ tab.label }}
        </button>
      </div>

      <div class="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div v-if="activeTab === 'profile'" class="p-6 lg:p-8 animate-in fade-in duration-300">
          <h2 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Informasi Pribadi</h2>
          
          <div class="flex items-center gap-6 mb-8">
            <div class="relative group">
              <img :src="store.student.avatar" class="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm" />
              <button class="absolute bottom-0 right-0 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-colors" title="Ganti Foto">
                <Camera :size="16" />
              </button>
            </div>
            <div>
              <p class="font-bold text-slate-800">Foto Profil</p>
              <p class="text-xs text-slate-500 mt-1 max-w-xs">Format: JPG, PNG. Maksimal 2MB. Disarankan menggunakan foto formal seragam sekolah.</p>
            </div>
          </div>

          <form @submit.prevent="handleSaveProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Nama Lengkap</label>
              <div class="relative">
                <User :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="profileForm.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">NISN (Tidak dapat diubah)</label>
              <div class="relative">
                <Shield :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input :value="store.student.id" type="text" disabled class="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-500 cursor-not-allowed" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Email Sekolah</label>
              <div class="relative">
                <Mail :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="profileForm.email" type="email" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Nomor Telepon / WA</label>
              <div class="relative">
                <Phone :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="profileForm.phone" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="col-span-1 md:col-span-2 space-y-2">
              <label class="text-sm font-bold text-slate-700">Alamat Lengkap</label>
              <div class="relative">
                <MapPin :size="18" class="absolute left-3 top-3 text-slate-400" />
                <textarea v-model="profileForm.address" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>

            <div class="col-span-1 md:col-span-2 pt-4 flex justify-end">
              <button type="submit" :disabled="isLoading" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70">
                <Save :size="18" />
                {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="activeTab === 'security'" class="p-6 lg:p-8 animate-in fade-in duration-300">
          <h2 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Ubah Password</h2>
          
          <form @submit.prevent="handleChangePassword" class="max-w-md space-y-5">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Password Saat Ini</label>
              <div class="relative">
                <Lock :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="passwordForm.current" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Password Baru</label>
              <div class="relative">
                <Lock :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="passwordForm.new" type="password" placeholder="Minimal 8 karakter" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700">Konfirmasi Password Baru</label>
              <div class="relative">
                <Lock :size="18" class="absolute left-3 top-3 text-slate-400" />
                <input v-model="passwordForm.confirm" type="password" placeholder="Ulangi password baru" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
            </div>

            <div class="pt-4">
              <button type="submit" :disabled="isLoading" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70">
                <Save :size="18" />
                {{ isLoading ? 'Memproses...' : 'Ganti Password' }}
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="activeTab === 'notifications'" class="p-6 lg:p-8 animate-in fade-in duration-300">
          <h2 class="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">Preferensi Notifikasi</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Mail :size="16" class="text-indigo-600" /> Notifikasi Email
              </h3>
              <div class="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-700">Pengingat Ujian & Tugas</p>
                    <p class="text-xs text-slate-500">Terima email 1 hari sebelum deadline.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings.emailExam" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-700">Tugas Baru Diposting</p>
                    <p class="text-xs text-slate-500">Terima email saat guru memposting materi baru.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings.emailAssignment" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Smartphone :size="16" class="text-indigo-600" /> Notifikasi Aplikasi
              </h3>
              <div class="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-700">Nilai Keluar</p>
                    <p class="text-xs text-slate-500">Notifikasi instan saat nilai dipublikasikan.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings.pushGrades" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-700">Berita Sekolah</p>
                    <p class="text-xs text-slate-500">Info libur, acara, dan pengumuman.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings.pushNews" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>