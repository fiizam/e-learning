<script setup>
import { ref } from 'vue';
import { Save, Globe, Shield, Bell, UploadCloud, AlertTriangle } from 'lucide-vue-next';

definePageMeta({ layout: 'admin' });

const activeTab = ref('general');
const generalForm = ref({
  schoolName: 'SMK Negeri 09',
  academicYear: '2025/2026',
  semester: 'Ganjil',
  maintenanceMode: false
});

const isSaving = ref(false);

const saveSettings = () => {
  isSaving.value = true;
  setTimeout(() => { isSaving.value = false; alert('Pengaturan disimpan!'); }, 1500);
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
    
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Pengaturan Sistem</h1>
      <p class="text-slate-500 text-sm">Konfigurasi global aplikasi E-Learning.</p>
    </div>

    <div class="flex border-b border-slate-200">
      <button 
        v-for="tab in [{id:'general', label:'Umum', icon:Globe}, {id:'security', label:'Keamanan', icon:Shield}]"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-6 py-3 border-b-2 transition-all font-bold text-sm"
        :class="activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
      >
        <component :is="tab.icon" :size="18" /> {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'general'" class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
      
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
          <UploadCloud :size="32" />
        </div>
        <div>
          <h3 class="font-bold text-slate-800">Logo Sekolah</h3>
          <p class="text-xs text-slate-500 mb-3">Format PNG/JPG, Maks 2MB.</p>
          <button class="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900">Upload Baru</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">Nama Sekolah</label>
          <input v-model="generalForm.schoolName" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-600 mb-1.5">Tahun Ajaran Aktif</label>
           <select v-model="generalForm.academicYear" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
             <option>2024/2025</option>
             <option>2025/2026</option>
           </select>
        </div>
      </div>

      <div class="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-4">
        <div class="p-2 bg-white rounded-lg text-rose-600 shadow-sm shrink-0">
          <AlertTriangle :size="20" />
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-slate-800 text-sm">Mode Maintenance</h4>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="generalForm.maintenanceMode" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>
          <p class="text-xs text-slate-600">Jika aktif, hanya Admin yang bisa mengakses sistem. Siswa akan melihat halaman "Sedang Perbaikan".</p>
        </div>
      </div>

    </div>

    <div v-else class="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm text-center">
      <Shield :size="48" class="mx-auto text-slate-300 mb-4" />
      <h3 class="font-bold text-slate-800">Pengaturan Keamanan</h3>
      <p class="text-slate-500 text-sm">Konfigurasi password policy dan 2FA akan muncul di sini.</p>
    </div>

    <div class="flex justify-end pt-4">
      <button 
        @click="saveSettings" 
        :disabled="isSaving"
        class="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-70"
      >
        <Save :size="18" /> {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
</style>