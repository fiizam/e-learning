<script setup>
import { ref, onMounted } from 'vue';
import { 
  CalendarDays, Clock, MapPin, Download, 
  ChevronRight, Bell, Info 
} from 'lucide-vue-next';

// Metadata Halaman
useHead({
  title: 'Jadwal Pelajaran - SMK 09 Learning Portal',
});

// --- STATE MANAGEMENT ---
const activeDay = ref('Senin'); // Default tab aktif untuk tampilan Mobile
const currentDayName = ref(''); // Menyimpan nama hari ini

// --- DATA JADWAL MINGGUAN LENGKAP ---
const weeklySchedule = [
  {
    day: 'Senin',
    isToday: false,
    lessons: [
      { id: 1, subject: 'Upacara Bendera', time: '07:00 - 07:45', room: 'Lapangan Utama', type: 'event', teacher: '-' },
      { id: 2, subject: 'Pendidikan Agama Islam', time: '07:45 - 09:15', room: 'Kelas XI-2', type: 'general', teacher: 'Pak Ustadz Ahmad' },
      { id: 3, subject: 'Bahasa Indonesia', time: '09:15 - 10:45', room: 'Kelas XI-2', type: 'general', teacher: 'Bu Indah' },
      { id: 99, type: 'break', time: '10:45 - 11:15', label: 'Istirahat Pertama' },
      { id: 4, subject: 'Pemrograman Web (Praktek)', time: '11:15 - 15:00', room: 'Lab RPL 1', type: 'lab', teacher: 'Pak Budi Santoso' },
    ]
  },
  {
    day: 'Selasa',
    isToday: false,
    lessons: [
      { id: 5, subject: 'Matematika Terapan', time: '07:15 - 09:30', room: 'Kelas XI-2', type: 'general', teacher: 'Pak Hartono' },
      { id: 6, subject: 'Bahasa Inggris Teknis', time: '09:30 - 11:00', room: 'Lab Bahasa', type: 'general', teacher: 'Mr. John Doe' },
      { id: 99, type: 'break', time: '11:00 - 11:30', label: 'Istirahat' },
      { id: 7, subject: 'Basis Data (Teori)', time: '11:30 - 13:00', room: 'Kelas XI-2', type: 'theory', teacher: 'Bu Siti Aminah' },
      { id: 8, subject: 'PKN', time: '13:00 - 14:30', room: 'Kelas XI-2', type: 'general', teacher: 'Bu Ratna' },
    ]
  },
  {
    day: 'Rabu',
    isToday: false,
    lessons: [
      { id: 9, subject: 'Basis Data (Praktek)', time: '07:15 - 11:30', room: 'Lab RPL 2', type: 'lab', teacher: 'Bu Siti Aminah' },
      { id: 99, type: 'break', time: '11:30 - 12:00', label: 'Istirahat / Sholat' },
      { id: 10, subject: 'Produk Kreatif & Kewirausahaan', time: '12:00 - 14:30', room: 'Workshop', type: 'theory', teacher: 'Pak Dedi' },
    ]
  },
  {
    day: 'Kamis',
    isToday: false,
    lessons: [
      { id: 11, subject: 'Desain UI/UX', time: '07:15 - 10:45', room: 'Lab Multimedia', type: 'lab', teacher: 'Bu Sarah Wijaya' },
      { id: 99, type: 'break', time: '10:45 - 11:15', label: 'Istirahat' },
      { id: 12, subject: 'Sejarah Indonesia', time: '11:15 - 12:45', room: 'Kelas XI-2', type: 'general', teacher: 'Pak Bambang' },
      { id: 13, subject: 'Penjaskes', time: '13:00 - 14:30', room: 'Lapangan', type: 'general', teacher: 'Pak Roni' },
    ]
  },
  {
    day: 'Jumat',
    isToday: false,
    lessons: [
      { id: 14, subject: 'Senam Pagi / Jumat Bersih', time: '06:30 - 07:30', room: 'Lingkungan Sekolah', type: 'event', teacher: 'Wali Kelas' },
      { id: 15, subject: 'Pemrograman Berorientasi Objek', time: '07:30 - 11:00', room: 'Lab RPL 1', type: 'lab', teacher: 'Pak Budi Santoso' },
      { id: 16, subject: 'Sholat Jumat & Keputrian', time: '11:30 - 13:00', room: 'Masjid / Aula', type: 'event', teacher: '-' },
    ]
  }
];

// --- DATA EVENT MENDATANG ---
const upcomingEvents = [
  { id: 1, title: 'Ujian Tengah Semester', date: '12 Nov 2023', type: 'exam', daysLeft: 14 },
  { id: 2, title: 'Libur Hari Guru', date: '25 Nov 2023', type: 'holiday', daysLeft: 27 },
  { id: 3, title: 'Kunjungan Industri', date: '05 Des 2023', type: 'event', daysLeft: 37 },
];

// --- LOGIC OTOMATIS ---
onMounted(() => {
  // 1. Deteksi Hari Ini
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayIndex = new Date().getDay();
  const todayName = days[todayIndex];
  
  // 2. Jika bukan weekend, set tab aktif ke hari ini
  if (todayName !== 'Minggu' && todayName !== 'Sabtu') {
    activeDay.value = todayName;
    currentDayName.value = todayName;
    
    // Tandai di data array
    const dayData = weeklySchedule.find(d => d.day === todayName);
    if (dayData) dayData.isToday = true;
  } else {
    activeDay.value = 'Senin'; // Default ke Senin jika dibuka pas weekend
  }
});

// Helper Warna Kartu Pelajaran
const getCardColor = (type) => {
  switch (type) {
    case 'lab': return 'bg-indigo-50 border-indigo-100 text-indigo-900';
    case 'theory': return 'bg-white border-slate-200 text-slate-800';
    case 'event': return 'bg-amber-50 border-amber-100 text-amber-900';
    default: return 'bg-white border-slate-200 text-slate-800';
  }
};

// Helper Warna Garis Samping Kartu
const getSideColor = (type) => {
  switch (type) {
    case 'lab': return 'bg-indigo-500';
    case 'theory': return 'bg-slate-400';
    case 'event': return 'bg-amber-500';
    default: return 'bg-slate-300';
  }
};
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Jadwal Pelajaran</h1>
        <p class="text-slate-500 mt-1 text-sm">Tahun Ajaran 2023/2024 - Semester Ganjil</p>
      </div>
      <button class="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
        <Download :size="16" />
        Unduh PDF
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      
      <div class="xl:col-span-3 space-y-6">
        
        <div class="flex xl:hidden overflow-x-auto pb-2 gap-2 no-scrollbar">
          <button 
            v-for="item in weeklySchedule" 
            :key="item.day"
            @click="activeDay = item.day"
            class="flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all border"
            :class="activeDay === item.day 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'"
          >
            {{ item.day }}
            <span v-if="item.isToday" class="ml-1 w-2 h-2 bg-rose-400 rounded-full inline-block"></span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div class="hidden xl:grid grid-cols-5 divide-x divide-slate-200 min-h-[600px]">
            <div v-for="dayData in weeklySchedule" :key="dayData.day" class="flex flex-col">
              
              <div class="p-4 text-center border-b border-slate-200" :class="dayData.isToday ? 'bg-indigo-50/50' : 'bg-slate-50/50'">
                <h3 class="font-bold text-slate-800" :class="dayData.isToday ? 'text-indigo-600' : ''">{{ dayData.day }}</h3>
                <span v-if="dayData.isToday" class="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Hari Ini</span>
              </div>

              <div class="flex-1 p-3 space-y-3 bg-slate-50/30">
                <div v-for="lesson in dayData.lessons" :key="lesson.id">
                  
                  <div v-if="lesson.type === 'break'" class="flex items-center gap-2 py-2 opacity-60">
                    <div class="h-px bg-slate-300 flex-1"></div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase">{{ lesson.label }}</span>
                    <div class="h-px bg-slate-300 flex-1"></div>
                  </div>

                  <div v-else 
                    class="relative p-3 rounded-xl border shadow-sm hover:shadow-md transition-all group cursor-default"
                    :class="getCardColor(lesson.type)"
                  >
                    <div class="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" :class="getSideColor(lesson.type)"></div>
                    
                    <div class="pl-2.5">
                      <p class="text-[10px] font-bold opacity-70 mb-0.5 flex items-center gap-1">
                        <Clock :size="10" /> {{ lesson.time }}
                      </p>
                      <h4 class="text-sm font-bold leading-tight mb-1">{{ lesson.subject }}</h4>
                      
                      <div class="flex items-center gap-1 text-[11px] opacity-80 mt-2">
                        <MapPin :size="10" />
                        <span class="truncate">{{ lesson.room }}</span>
                      </div>
                      <div class="text-[10px] opacity-60 mt-0.5 truncate">
                        {{ lesson.teacher }}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="xl:hidden p-5">
            <div v-for="dayData in weeklySchedule.filter(d => d.day === activeDay)" :key="dayData.day" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div v-if="dayData.lessons.length === 0" class="text-center py-10 text-slate-400">
                Libur / Tidak ada jadwal
              </div>

              <div v-for="lesson in dayData.lessons" :key="lesson.id">
                
                <div v-if="lesson.type === 'break'" class="flex items-center justify-center py-2">
                  <span class="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                    ☕ {{ lesson.label }} ({{ lesson.time }})
                  </span>
                </div>

                <div v-else class="flex gap-4 group">
                  <div class="flex flex-col items-end min-w-[60px] pt-1">
                    <span class="text-sm font-bold text-slate-800">{{ lesson.time.split(' - ')[0] }}</span>
                    <span class="text-xs text-slate-400">{{ lesson.time.split(' - ')[1] }}</span>
                  </div>

                  <div class="relative flex flex-col items-center">
                    <div class="w-3 h-3 rounded-full border-2 border-white shadow-sm z-10" :class="getSideColor(lesson.type)"></div>
                    <div class="flex-1 w-0.5 bg-slate-100 -mt-1 -mb-2 group-last:hidden"></div>
                  </div>

                  <div class="flex-1 pb-4">
                    <div class="p-4 rounded-xl border shadow-sm transition-colors" :class="getCardColor(lesson.type)">
                      <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-slate-800">{{ lesson.subject }}</h4>
                        <span class="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5">{{ lesson.room }}</span>
                      </div>
                      <p class="text-sm text-slate-500">{{ lesson.teacher }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div class="flex flex-wrap gap-4 text-xs text-slate-500 px-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded bg-indigo-500"></span> Praktek / Lab
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded bg-slate-300"></span> Teori Umum
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded bg-amber-500"></span> Event / Upacara
          </div>
        </div>
      </div>

      <div class="xl:col-span-1 space-y-6">
        
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <CalendarDays :size="20" />
            </div>
            <h3 class="font-bold text-slate-800">Agenda Akademik</h3>
          </div>

          <div class="space-y-4">
            <div v-for="event in upcomingEvents" :key="event.id" class="relative pl-4 border-l-2" 
              :class="{
                'border-rose-500': event.type === 'exam',
                'border-amber-500': event.type === 'holiday',
                'border-indigo-500': event.type === 'event'
              }"
            >
              <p class="text-xs text-slate-400 font-medium mb-0.5">{{ event.date }}</p>
              <h4 class="text-sm font-bold text-slate-700 leading-tight">{{ event.title }}</h4>
              <p class="text-[10px] font-bold mt-1 inline-block px-1.5 py-0.5 rounded"
                :class="{
                  'bg-rose-100 text-rose-600': event.type === 'exam',
                  'bg-amber-100 text-amber-600': event.type === 'holiday',
                  'bg-indigo-100 text-indigo-600': event.type === 'event'
                }"
              >
                {{ event.daysLeft }} hari lagi
              </p>
            </div>
          </div>

          <button class="w-full mt-5 text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors">
            Lihat Kalender Lengkap <ChevronRight :size="12" />
          </button>
        </div>

        <div class="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-5 text-white">
          <div class="flex items-start gap-3">
            <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bell :size="18" />
            </div>
            <div>
              <h4 class="font-bold text-sm mb-1">Pengumuman</h4>
              <p class="text-xs text-indigo-100 leading-relaxed">
                Hari Jumat (27 Nov) Mata Pelajaran <strong>PBO</strong> ditiadakan diganti tugas mandiri di E-Learning.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Utility CSS untuk menyembunyikan scrollbar di tab mobile */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>