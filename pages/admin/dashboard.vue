<script setup>
import { ref, onMounted } from 'vue';
import { 
  Users, BookOpen, GraduationCap, Activity, 
  TrendingUp, Clock, MoreHorizontal, AlertCircle,
  CheckCircle2, XCircle, FileText, Server, 
  PieChart, Download, Calendar as CalendarIcon,
  ChevronDown, Search, Filter
} from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

// Menggunakan Layout Admin
definePageMeta({ layout: 'admin' });

const authStore = useAuthStore();
const isLoading = ref(true);

// --- DATA DUMMY (Mencerminkan Real-time Data) ---

// 1. Kartu Statistik Utama
const stats = [
  { 
    title: 'Total Siswa', 
    value: '1,240', 
    trend: '+45 bulan ini', 
    trendUp: true, 
    icon: Users, 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50',
    desc: 'Akun aktif terverifikasi'
  },
  { 
    title: 'Total Guru', 
    value: '64', 
    trend: 'Stabil', 
    trendUp: true, 
    icon: GraduationCap, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50',
    desc: 'Tersertifikasi'
  },
  { 
    title: 'Mapel & Materi', 
    value: '385', 
    trend: '+12 minggu ini', 
    trendUp: true, 
    icon: BookOpen, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50',
    desc: 'Modul pembelajaran'
  },
  { 
    title: 'Penyimpanan', 
    value: '450 GB', 
    trend: '82% Terpakai', 
    trendUp: false, 
    icon: Server, 
    color: 'text-rose-600', 
    bg: 'bg-rose-50',
    desc: 'Kuota Server 500GB'
  },
];

// 2. Data Grafik Aktivitas Login (CSS Bar Chart)
const loginActivity = [45, 70, 55, 90, 65, 85, 50, 80, 75, 95, 85, 60];

// 3. Mapel Terpopuler (Course Performance)
const topCourses = [
  { id: 1, name: 'Jaringan Dasar (TKJ)', instructor: 'Budi Santoso', students: 340, rating: 4.8, status: 'Active' },
  { id: 2, name: 'Pemrograman Web', instructor: 'Siti Aminah', students: 215, rating: 4.9, status: 'Active' },
  { id: 3, name: 'Desain Grafis', instructor: 'Rudi Hermawan', students: 180, rating: 4.6, status: 'Active' },
  { id: 4, name: 'Matematika XII', instructor: 'Dewi Lestari', students: 150, rating: 4.5, status: 'Review' },
];

// 4. Antrian Persetujuan (Pending Approvals)
const pendingTasks = [
  { id: 1, type: 'Guru Baru', user: 'Pak Joko (RPL)', time: '10 menit lalu', status: 'pending' },
  { id: 2, type: 'Reset Password', user: 'Siswa: Ahmad', time: '1 jam lalu', status: 'pending' },
  { id: 3, type: 'Upload Materi', user: 'Bu Rina (B.Ing)', time: '3 jam lalu', status: 'pending' },
];

// 5. System Health
const systemHealth = {
  cpu: 24,
  ram: 65,
  storage: 82
};

// --- LOGIC WAKTU ---
const currentTime = ref('');
const greeting = ref('');

onMounted(() => {
  // Simulasi Loading Data
  setTimeout(() => isLoading.value = false, 800);
  
  updateTime();
  setInterval(updateTime, 60000);
});

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  
  if (hours < 12) greeting.value = 'Selamat Pagi';
  else if (hours < 15) greeting.value = 'Selamat Siang';
  else if (hours < 18) greeting.value = 'Selamat Sore';
  else greeting.value = 'Selamat Malam';
};
</script>

<template>
  <div class="space-y-8 pb-10">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-down">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {{ greeting }}, {{ authStore.profile?.full_name?.split(' ')[0] || 'Admin' }}! 
          <span class="text-2xl animate-wave">👋</span>
        </h1>
        <p class="text-slate-500 mt-1 text-sm md:text-base">
          Pantau seluruh aktivitas E-Learning sekolah dalam satu layar.
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <CalendarIcon :size="16" />
          <span>Hari Ini</span>
          <ChevronDown :size="14" class="text-slate-400" />
        </button>

        <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-200 text-sm font-bold transition-all active:scale-95">
          <Download :size="16" />
          <span class="hidden sm:inline">Unduh Laporan</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-6px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
      >
        <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150" :class="stat.bg.replace('bg-', 'bg-')"></div>

        <div class="flex justify-between items-start mb-4">
          <div :class="[stat.bg, stat.color]" class="p-3.5 rounded-2xl transition-colors shadow-sm">
            <component :is="stat.icon" :size="24" />
          </div>
          <span 
            class="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide"
            :class="stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
          >
            <TrendingUp :size="12" /> {{ stat.trend }}
          </span>
        </div>
        
        <div>
          <h3 class="text-3xl font-black text-slate-800 mb-1 tracking-tight">{{ stat.value }}</h3>
          <p class="text-xs text-slate-400 mt-1 font-medium">{{ stat.desc }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      <div class="xl:col-span-2 space-y-8 animate-fade-in-up delay-100">
        
        <div class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Activity :size="20" class="text-indigo-600" />
                Statistik Akses
              </h3>
              <p class="text-sm text-slate-500">Jumlah login siswa & guru 2 minggu terakhir</p>
            </div>
            <div class="hidden sm:flex gap-2">
              <span class="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span class="text-xs text-slate-500 font-bold">Traffic Siswa</span>
            </div>
          </div>

          <div class="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
            <div 
              v-for="(height, i) in loginActivity" 
              :key="i" 
              class="w-full bg-slate-50 rounded-t-lg relative group transition-all hover:bg-indigo-50 cursor-pointer"
            >
              <div 
                class="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-1000 ease-out group-hover:bg-indigo-600 group-hover:shadow-lg shadow-indigo-200"
                :style="{ height: isLoading ? '0%' : height + '%' }"
              ></div>
              <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl font-bold">
                {{ height }} User
                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span v-for="i in 12" :key="i">H-{{ 13-i }}</span>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 class="font-bold text-lg text-slate-800">Mata Pelajaran Populer</h3>
              <p class="text-sm text-slate-500">Kelas dengan interaksi tertinggi bulan ini</p>
            </div>
            <button class="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Lihat Semua</button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead class="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th class="p-4 pl-6">Nama Kursus</th>
                  <th class="p-4">Pengajar</th>
                  <th class="p-4 text-center">Siswa</th>
                  <th class="p-4 text-center">Rating</th>
                  <th class="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr v-for="course in topCourses" :key="course.id" class="hover:bg-slate-50 transition-colors group">
                  <td class="p-4 pl-6 font-bold text-slate-700 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {{ course.name.charAt(0) }}
                    </div>
                    {{ course.name }}
                  </td>
                  <td class="p-4 text-slate-600">{{ course.instructor }}</td>
                  <td class="p-4 text-center font-bold text-slate-700">{{ course.students }}</td>
                  <td class="p-4 text-center text-amber-500 font-bold">⭐ {{ course.rating }}</td>
                  <td class="p-4 text-center">
                    <span 
                      class="px-2.5 py-1 rounded-full text-xs font-bold"
                      :class="course.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                    >
                      {{ course.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div class="space-y-8 animate-fade-in-up delay-200">

        <div class="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20"></div>

          <div class="flex items-center justify-between mb-6 relative z-10">
            <h3 class="font-bold text-lg flex items-center gap-2">
              <Server :size="18" class="text-indigo-400" /> Server Health
            </h3>
            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30 animate-pulse">
              Running
            </span>
          </div>

          <div class="space-y-5 relative z-10">
            <div>
              <div class="flex justify-between text-xs font-bold mb-1.5 text-slate-400">
                <span>CPU Load</span>
                <span>{{ systemHealth.cpu }}%</span>
              </div>
              <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="bg-indigo-500 h-2 rounded-full transition-all duration-1000" :style="{ width: systemHealth.cpu + '%' }"></div>
              </div>
            </div>

             <div>
              <div class="flex justify-between text-xs font-bold mb-1.5 text-slate-400">
                <span>RAM Usage</span>
                <span>{{ systemHealth.ram }}%</span>
              </div>
              <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="bg-emerald-500 h-2 rounded-full transition-all duration-1000" :style="{ width: systemHealth.ram + '%' }"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-bold mb-1.5 text-slate-400">
                <span>Storage ({{ stats[3].value }})</span>
                <span class="text-rose-400">{{ systemHealth.storage }}%</span>
              </div>
              <div class="w-full bg-slate-700 rounded-full h-2">
                <div class="bg-rose-500 h-2 rounded-full transition-all duration-1000" :style="{ width: systemHealth.storage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200">
          <div class="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 class="font-bold text-lg text-slate-800">Menunggu Persetujuan</h3>
            <span class="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full">{{ pendingTasks.length }}</span>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="task in pendingTasks" :key="task.id" class="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
              <div class="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle :size="20" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-800">{{ task.type }}</p>
                <p class="text-xs text-slate-500 truncate">{{ task.user }} • {{ task.time }}</p>
              </div>
              <div class="flex gap-2">
                <button class="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition" title="Setujui">
                  <CheckCircle2 :size="18" />
                </button>
                <button class="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition" title="Tolak">
                  <XCircle :size="18" />
                </button>
              </div>
            </div>
          </div>
          <button class="w-full py-3 text-sm font-bold text-slate-500 hover:text-indigo-600 border-t border-slate-100 transition-colors">
            Lihat Semua Antrian
          </button>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 class="font-bold text-lg text-slate-800 mb-6">Distribusi Pengguna</h3>
          <div class="flex items-center gap-6">
            <div class="relative w-32 h-32 rounded-full flex items-center justify-center" 
                 style="background: conic-gradient(#4f46e5 0% 75%, #10b981 75% 95%, #f59e0b 95% 100%);">
              <div class="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span class="text-lg font-black text-slate-800">1.3K</span>
                <span class="text-[10px] text-slate-400 font-bold uppercase">Total</span>
              </div>
            </div>
            
            <div class="space-y-3 flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Siswa
                </div>
                <span class="text-xs font-bold">75%</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Guru
                </div>
                <span class="text-xs font-bold">20%</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Staff
                </div>
                <span class="text-xs font-bold">5%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Keyframe Animations */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-wave {
  animation: wave 2s infinite;
  display: inline-block;
  transform-origin: 70% 70%;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
</style>