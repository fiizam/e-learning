<script setup>
import { ref } from 'vue';
import { Trophy, Medal, Star, Flame, Target } from 'lucide-vue-next';

useHead({
  title: 'Peringkat & Prestasi - SMK 09 Learning Portal',
});

// Data User Login
const myRank = ref({ rank: 12, points: 2450, xp: 85 });

const topStudents = ref([
  { id: 1, name: 'Siti Aminah', class: 'XII TKJ 2', points: 3200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
  { id: 2, name: 'Budi Santoso', class: 'XII RPL 1', points: 3150, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
  { id: 3, name: 'Dewi Lestari', class: 'XII MM 3', points: 2980, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi' },
]);

const otherStudents = ref([
  { rank: 4, name: 'Ahmad Dhani', class: 'XII TKJ 1', points: 2800 },
  { rank: 5, name: 'Sarah Wijaya', class: 'XII RPL 2', points: 2750 },
  { rank: 6, name: 'Doni Tata', class: 'XII MM 1', points: 2600 },
  { rank: 7, name: 'Indah Permata', class: 'XII TKJ 2', points: 2550 },
]);
</script>

<template>
  <div class="space-y-8 pb-12">
    
    <div class="text-center max-w-2xl mx-auto mb-10">
      <h1 class="text-2xl font-bold text-slate-800">Papan Peringkat Siswa</h1>
      <p class="text-slate-500 mt-1">Kumpulkan poin dengan menyelesaikan tugas, kuis, dan aktif di forum untuk menjadi yang terbaik.</p>
    </div>

    <div class="flex items-end justify-center gap-4 md:gap-8 mb-12">
      
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full border-4 border-slate-200 overflow-hidden mb-[-20px] z-10 relative bg-white">
          <img :src="topStudents[1].avatar" />
          <div class="absolute -bottom-1 -right-1 bg-slate-400 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold border-2 border-white">2</div>
        </div>
        <div class="bg-gradient-to-t from-slate-100 to-white border border-slate-200 rounded-t-2xl w-28 md:w-36 h-40 flex flex-col items-center justify-end pb-4 shadow-sm">
          <p class="font-bold text-slate-800 text-sm truncate w-full text-center px-2">{{ topStudents[1].name }}</p>
          <p class="text-xs text-slate-500">{{ topStudents[1].points }} XP</p>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="relative z-20 mb-[-30px]">
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
            <Trophy :size="32" fill="currentColor" />
          </div>
          <div class="w-24 h-24 rounded-full border-4 border-amber-400 overflow-hidden bg-white relative">
            <img :src="topStudents[0].avatar" />
            <div class="absolute -bottom-1 -right-1 bg-amber-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white">1</div>
          </div>
        </div>
        <div class="bg-gradient-to-t from-amber-50 to-white border border-amber-200 rounded-t-2xl w-32 md:w-44 h-52 flex flex-col items-center justify-end pb-6 shadow-lg shadow-amber-100 z-10">
          <p class="font-bold text-slate-800 truncate w-full text-center px-2">{{ topStudents[0].name }}</p>
          <p class="text-sm font-bold text-amber-600">{{ topStudents[0].points }} XP</p>
          <div class="mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">Champion</div>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full border-4 border-orange-200 overflow-hidden mb-[-20px] z-10 relative bg-white">
          <img :src="topStudents[2].avatar" />
          <div class="absolute -bottom-1 -right-1 bg-orange-400 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold border-2 border-white">3</div>
        </div>
        <div class="bg-gradient-to-t from-orange-50 to-white border border-orange-200 rounded-t-2xl w-28 md:w-36 h-32 flex flex-col items-center justify-end pb-4 shadow-sm">
          <p class="font-bold text-slate-800 text-sm truncate w-full text-center px-2">{{ topStudents[2].name }}</p>
          <p class="text-xs text-slate-500">{{ topStudents[2].points }} XP</p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div class="relative z-10">
            <h3 class="font-bold text-indigo-100 mb-4">Statistik Saya</h3>
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-white/20 p-3 rounded-xl">
                <Medal :size="32" />
              </div>
              <div>
                <p class="text-sm text-indigo-100">Peringkat Saat Ini</p>
                <p class="text-2xl font-black">#{{ myRank.rank }}</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm font-medium">
                <span>Total Poin XP</span>
                <span>{{ myRank.points }}</span>
              </div>
              <div class="w-full h-2 bg-indigo-900/30 rounded-full overflow-hidden">
                <div class="h-full bg-amber-400 w-[70%]"></div>
              </div>
              <p class="text-xs text-indigo-200 mt-1">Butuh 550 XP lagi untuk naik peringkat.</p>
            </div>
          </div>
          <Star :size="120" class="absolute -right-6 -bottom-6 text-indigo-500 opacity-50 rotate-12" />
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target :size="18" class="text-rose-500" /> Misi Harian
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-700">Login 3 hari berturut-turut</p>
                <p class="text-[10px] text-slate-400">+50 XP</p>
              </div>
            </div>
            <div class="flex items-center gap-3 opacity-50">
              <div class="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <div class="flex-1 line-through">
                <p class="text-sm font-medium text-slate-700">Selesaikan 1 Kuis</p>
                <p class="text-[10px] text-slate-400">+100 XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 class="font-bold text-slate-800">Top Students</h3>
          <button class="text-xs font-bold text-indigo-600 hover:underline">Lihat Semua</button>
        </div>
        <div class="divide-y divide-slate-50">
          <div v-for="student in otherStudents" :key="student.rank" 
               class="flex items-center p-4 hover:bg-slate-50 transition-colors">
            <div class="w-10 font-bold text-slate-400 text-center mr-4">#{{ student.rank }}</div>
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 mr-4">
              {{ student.name.charAt(0) }}
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-slate-700 text-sm">{{ student.name }}</h4>
              <p class="text-xs text-slate-400">{{ student.class }}</p>
            </div>
            <div class="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-xs">
              {{ student.points }} XP
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>