<script setup>
import { 
  BookOpen, Clock, AlertCircle, CheckCircle2, 
  Calendar, ArrowRight, MoreHorizontal, TrendingUp 
} from 'lucide-vue-next';
import { useAcademicStore } from '~/stores/academic';

// Gunakan Store
const store = useAcademicStore();

// Set Judul Halaman
useHead({
  title: 'Dashboard - SMK 09 Learning Portal',
});

// --- DUMMY DATA UNTUK DASHBOARD ---

// 1. Jadwal Hari Ini
const todaySchedule = [
  {
    id: 1,
    subject: 'Pemrograman Web Lanjut',
    time: '07:30 - 09:30',
    teacher: 'Pak Budi Santoso',
    room: 'Lab RPL 1',
    status: 'Sedang Berlangsung',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 2,
    subject: 'Basis Data (MySQL)',
    time: '10:00 - 12:00',
    teacher: 'Bu Siti Aminah',
    room: 'Lab RPL 2',
    status: 'Akan Datang',
    color: 'text-slate-600 bg-white border-slate-200'
  },
  {
    id: 3,
    subject: 'Bahasa Inggris Teknis',
    time: '13:00 - 14:30',
    teacher: 'Mr. John Doe',
    room: 'Kelas XI-2',
    status: 'Akan Datang',
    color: 'text-slate-600 bg-white border-slate-200'
  }
];

// 2. Tugas / Assignments
const assignments = [
  {
    id: 1,
    title: 'Membuat REST API dengan Laravel',
    course: 'Pemrograman Backend',
    due: 'Besok, 23:59',
    type: 'Project',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Analisis ERD Sistem Perpustakaan',
    course: 'Basis Data',
    due: '2 Hari Lagi',
    type: 'Tugas',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Presentasi UI/UX Design',
    course: 'Desain Kreatif',
    due: 'Minggu Depan',
    type: 'Presentasi',
    priority: 'Low'
  }
];
</script>

<template>
  <div class="space-y-6">
    
    <div class="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
      <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

      <div class="relative z-10">
        <h1 class="text-2xl font-bold text-slate-800">
          Halo, {{ store.student.name.split(' ')[0] }}! 👋
        </h1>
        <p class="text-slate-500 mt-1 text-sm">
          Kamu memiliki <span class="text-indigo-600 font-bold">2 jadwal kelas</span> dan <span class="text-rose-500 font-bold">1 tugas prioritas</span> hari ini.
        </p>
      </div>

      <div class="relative z-10 flex gap-3">
        <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200">
          Lihat Jadwal
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
            <CheckCircle2 :size="20" />
          </div>
          <span class="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">+2% bln ini</span>
        </div>
        <h3 class="text-3xl font-bold text-slate-800">{{ store.stats.attendance }}%</h3>
        <p class="text-sm text-slate-500 font-medium mt-1">Total Kehadiran</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen :size="20" />
          </div>
        </div>
        <h3 class="text-3xl font-bold text-slate-800">{{ store.stats.assignments }}</h3>
        <p class="text-sm text-slate-500 font-medium mt-1">Tugas Selesai</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
            <TrendingUp :size="20" />
          </div>
        </div>
        <h3 class="text-3xl font-bold text-slate-800">{{ store.stats.gpa }}</h3>
        <p class="text-sm text-slate-500 font-medium mt-1">IPK Semester</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2.5 bg-violet-50 text-violet-600 rounded-xl group-hover:scale-110 transition-transform">
            <Clock :size="20" />
          </div>
        </div>
        <h3 class="text-3xl font-bold text-slate-800">128<span class="text-sm font-medium text-slate-400 ml-1">Jam</span></h3>
        <p class="text-sm text-slate-500 font-medium mt-1">Waktu Belajar</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-bold text-slate-800">Jadwal Hari Ini</h3>
              <p class="text-sm text-slate-500">Rabu, 25 Oktober 2023</p>
            </div>
            <button class="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
              <MoreHorizontal :size="20" />
            </button>
          </div>

          <div class="space-y-0 relative">
            <div class="absolute left-[26px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

            <div v-for="(item, index) in todaySchedule" :key="item.id" class="relative pl-16 py-3 group">
              <div 
                class="absolute left-[19px] top-8 w-4 h-4 rounded-full border-[3px] z-10 bg-white transition-colors"
                :class="index === 0 ? 'border-indigo-500 animate-pulse' : 'border-slate-300'"
              ></div>

              <div class="absolute left-0 top-3 text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 hidden">
                {{ item.time.split(' - ')[0] }}
              </div>

              <div 
                class="p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                :class="item.color"
              >
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold px-2 py-0.5 rounded text-opacity-80 bg-black/5">
                      {{ item.time }}
                    </span>
                    <span v-if="index === 0" class="flex h-2 w-2 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  </div>
                  <h4 class="font-bold text-base">{{ item.subject }}</h4>
                  <div class="flex items-center gap-2 text-sm opacity-80 mt-1">
                    <span class="flex items-center gap-1"><span class="w-1 h-1 bg-current rounded-full"></span> {{ item.teacher }}</span>
                    <span class="flex items-center gap-1"><span class="w-1 h-1 bg-current rounded-full"></span> {{ item.room }}</span>
                  </div>
                </div>
                
                <button class="shrink-0 p-2 rounded-full bg-white/50 hover:bg-white text-current opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight :size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-slate-800">Tugas Mendesak</h3>
            <span class="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full">3</span>
          </div>

          <div class="space-y-3">
            <div v-for="task in assignments" :key="task.id" class="group p-3 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                  :class="{
                    'bg-rose-100 text-rose-600': task.priority === 'High',
                    'bg-amber-100 text-amber-600': task.priority === 'Medium',
                    'bg-slate-100 text-slate-600': task.priority === 'Low',
                  }"
                >
                  {{ task.priority }}
                </span>
                <span class="text-xs text-slate-400 font-medium">{{ task.due }}</span>
              </div>
              <h4 class="text-sm font-bold text-slate-700 group-hover:text-indigo-700 leading-tight mb-1">{{ task.title }}</h4>
              <p class="text-xs text-slate-400">{{ task.course }}</p>
            </div>
          </div>

          <button class="w-full mt-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all dashed">
            Lihat Semua Tugas
          </button>
        </div>

        <div class="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
          
          <div class="flex items-center gap-3 mb-4 relative z-10">
            <div class="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Calendar :size="18" class="text-indigo-300" />
            </div>
            <div>
              <p class="text-xs text-slate-400 font-medium uppercase tracking-wider">Event Sekolah</p>
              <p class="font-bold text-sm">Ujian Tengah Semester</p>
            </div>
          </div>
          
          <div class="flex items-end justify-between relative z-10">
            <div>
              <span class="text-3xl font-bold">12</span>
              <span class="text-sm text-slate-400 ml-1">Nov</span>
            </div>
            <p class="text-xs text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded border border-indigo-500/30">2 Minggu Lagi</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Styling Tambahan jika diperlukan */
</style>