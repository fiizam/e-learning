<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  User, Lock, Eye, EyeOff, ArrowRight, 
  Loader2, CheckCircle2, AlertCircle, LayoutGrid 
} from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

// Menggunakan layout khusus auth (jika ada), atau default kosong
definePageMeta({ layout: 'auth' });

const router = useRouter();
const authStore = useAuthStore();

// --- STATE ---
const form = ref({
  email: '',
  password: '',
  remember: false
});

const showPassword = ref(false);
const isRedirecting = ref(false); // State untuk animasi transisi halaman

// State Notifikasi Mini
const notification = ref({
  show: false,
  type: 'success', // success | error
  title: '',
  message: ''
});

// --- HELPER NOTIFIKASI ---
const showNotification = (type, title, message) => {
  notification.value = { show: true, type, title, message };
  // Auto hide setelah 3 detik
  setTimeout(() => {
    notification.value.show = false;
  }, 4000);
};

// --- ACTION LOGIN ---
const handleLogin = async () => {
  // 1. Reset State
  notification.value.show = false;
  
  // 2. Validasi Input
  if (!form.value.email || !form.value.password) {
    showNotification('error', 'Input Tidak Lengkap', 'Harap isi email dan password Anda.');
    return;
  }

  // 3. Proses Login
  const result = await authStore.login(form.value.email, form.value.password);

  if (result.success) {
    // --- LOGIN SUKSES ---
    showNotification('success', 'Login Berhasil', 'Selamat datang kembali!');
    
    // Aktifkan Loading Overlay Transisi
    isRedirecting.value = true;

    // Delay sedikit agar animasi loading terlihat user (UX Experience)
    setTimeout(() => {
      const role = authStore.profile?.role;

      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }, 2000); // 2 Detik animasi loading "Menyiapkan Dashboard"

  } else {
    // --- LOGIN GAGAL ---
    showNotification('error', 'Gagal Masuk', result.message || 'Email atau password salah.');
  }
};
</script>

<template>
  <div class="min-h-screen flex bg-white relative overflow-hidden font-sans">

    <Transition name="toast">
      <div 
        v-if="notification.show" 
        class="fixed top-6 right-6 z-[60] flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all duration-300 backdrop-blur-md max-w-sm w-full"
        :class="notification.type === 'success' ? 'bg-white/90 border-emerald-200' : 'bg-white/90 border-rose-200'"
      >
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          :class="notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'"
        >
          <CheckCircle2 v-if="notification.type === 'success'" :size="18" />
          <AlertCircle v-else :size="18" />
        </div>
        <div>
          <h4 
            class="text-sm font-bold"
            :class="notification.type === 'success' ? 'text-emerald-800' : 'text-rose-800'"
          >
            {{ notification.title }}
          </h4>
          <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {{ notification.message }}
          </p>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isRedirecting" class="fixed inset-0 z-[100] bg-indigo-600 flex flex-col items-center justify-center text-white">
        <div class="relative">
          <div class="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative z-10 mb-8 mx-auto">
            <LayoutGrid class="text-indigo-600" :size="40" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-2 animate-bounce-slow">Login Berhasil</h2>
        <p class="text-indigo-200 text-sm flex items-center gap-2">
          <Loader2 class="animate-spin" :size="16" />
          Menyiapkan Dashboard Anda...
        </p>
      </div>
    </Transition>

    <div class="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 opacity-90"></div>
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-3xl opacity-20"></div>
      
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div class="relative z-10 max-w-lg px-12 text-center text-white space-y-6">
        <div class="inline-flex p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/10 shadow-xl">
           <LayoutGrid :size="32" class="text-indigo-200" />
        </div>
        <h1 class="text-4xl font-black tracking-tight leading-tight">
          Learning Management System
        </h1>
        <p class="text-indigo-100 text-lg font-light leading-relaxed">
          Platform pembelajaran digital terintegrasi untuk SMK Negeri 09. Akses materi, ujian, dan nilai dalam satu genggaman.
        </p>

        <div class="grid grid-cols-2 gap-4 pt-8 text-left">
           <div class="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
             <h3 class="text-2xl font-bold">1.2k+</h3>
             <p class="text-xs text-indigo-200 uppercase tracking-wider mt-1">Siswa Aktif</p>
           </div>
           <div class="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
             <h3 class="text-2xl font-bold">100%</h3>
             <p class="text-xs text-indigo-200 uppercase tracking-wider mt-1">Online Uptime</p>
           </div>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 xl:px-24 bg-white relative">
      
      <div class="lg:hidden absolute top-6 left-6">
        <div class="flex items-center gap-2 font-bold text-indigo-600">
           <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
             <LayoutGrid :size="18" />
           </div>
           SMK 09
        </div>
      </div>

      <div class="w-full max-w-md mx-auto animate-fade-in-up">
        
        <div class="mb-10">
          <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Selamat Datang 👋</h2>
          <p class="text-slate-500 mt-2">Silakan masukkan akun sekolah Anda.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <div class="space-y-1.5 group">
            <label class="text-sm font-bold text-slate-700 ml-1">Email Sekolah</label>
            <div class="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
              <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <User :size="20" />
              </div>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="nama@sekolah.id" 
                class="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div class="space-y-1.5 group">
            <div class="flex justify-between items-center ml-1">
              <label class="text-sm font-bold text-slate-700">Password</label>
            </div>
            <div class="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
              <div class="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Lock :size="20" />
              </div>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                required
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-3.5 text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-slate-100"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
             <label class="flex items-center space-x-2.5 cursor-pointer group">
              <div class="relative">
                <input v-model="form.remember" type="checkbox" class="peer sr-only">
                <div class="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                <CheckCircle2 :size="14" class="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span class="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Ingat Saya</span>
            </label>
            <a href="#" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Lupa Password?</a>
          </div>

          <button 
            type="submit" 
            :disabled="authStore.isLoading || isRedirecting"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 group overflow-hidden relative"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            
            <span v-if="authStore.isLoading" class="flex items-center gap-2 relative z-10">
              <Loader2 class="animate-spin" :size="20" />
              Memverifikasi...
            </span>
            <span v-else class="flex items-center gap-2 relative z-10">
              Masuk Sekarang
              <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

        </form>

        <p class="mt-8 text-center text-sm text-slate-500">
          Belum punya akun? <span class="text-indigo-600 font-bold cursor-pointer hover:underline">Hubungi Tata Usaha</span>
        </p>

      </div>

      <div class="absolute bottom-6 left-0 w-full text-center">
        <p class="text-xs text-slate-400 font-medium">&copy; {{ new Date().getFullYear() }} SMK Negeri 09. All Rights Reserved. Create By Phyzam</p>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Animasi Masuk Halaman */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Animasi Toast Notification */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

/* Animasi Fade Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animasi Bounce Slow */
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounceSlow 2s infinite;
}
</style>