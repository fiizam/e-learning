<script setup>
import { ref } from 'vue';
import { 
  Trophy, TrendingUp, BookOpen, Download, 
  ChevronDown, AlertCircle, FileText 
} from 'lucide-vue-next';

useHead({
  title: 'Transkrip Nilai - SMK 09 Learning Portal',
});

// --- DATA DUMMY NILAI ---
const academicSummary = ref({
  gpa: 88.5,
  rank: 3,
  totalCredits: 42,
  completedCredits: 38
});

const semesterList = ['Ganjil 2023/2024', 'Genap 2023/2024', 'Ganjil 2024/2025'];
const selectedSemester = ref('Ganjil 2024/2025');

const grades = ref([
  {
    id: 1,
    code: 'TKJ-P-101',
    subject: 'Admin. Infrastruktur Jaringan',
    category: 'Produktif',
    kkm: 78,
    assignments: 85,
    quiz: 90,
    uts: 82,
    uas: 88,
    finalScore: 86.5,
    grade: 'A',
    status: 'Lulus',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  },
  {
    id: 2,
    code: 'TKJ-P-102',
    subject: 'Teknologi Layanan WAN',
    category: 'Produktif',
    kkm: 78,
    assignments: 75,
    quiz: 70,
    uts: 72,
    uas: 80,
    finalScore: 75.5,
    grade: 'C',
    status: 'Remedial',
    color: 'text-rose-600 bg-rose-50 border-rose-100'
  },
  {
    id: 3,
    code: 'UM-MTK-12',
    subject: 'Matematika Terapan',
    category: 'Umum',
    kkm: 75,
    assignments: 95,
    quiz: 100,
    uts: 92,
    uas: 94,
    finalScore: 95.0,
    grade: 'A+',
    status: 'Lulus',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
  },
  {
    id: 4,
    code: 'UM-BING-12',
    subject: 'Bahasa Inggris Teknis',
    category: 'Muatan Lokal',
    kkm: 75,
    assignments: 80,
    quiz: 85,
    uts: 80,
    uas: 82,
    finalScore: 81.5,
    grade: 'B',
    status: 'Lulus',
    color: 'text-blue-600 bg-blue-50 border-blue-100'
  }
]);

// Helper untuk warna grade huruf
const getGradeColor = (grade) => {
  if (grade.includes('A')) return 'text-emerald-600';
  if (grade.includes('B')) return 'text-blue-600';
  if (grade.includes('C')) return 'text-amber-600';
  return 'text-rose-600';
};
</script>

<template>
  <div class="space-y-8 pb-12">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Transkrip Nilai</h1>
        <p class="text-slate-500 mt-1 text-sm">Pantau perkembangan akademik dan hasil evaluasi belajar.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <select v-model="selectedSemester" class="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer hover:bg-slate-50 transition">
            <option v-for="sem in semesterList" :key="sem">{{ sem }}</option>
          </select>
          <ChevronDown :size="16" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <button class="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 transition-all">
          <Download :size="18" /> <span class="hidden md:inline">Download Rapor</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Trophy :size="80" />
        </div>
        <div class="relative z-10">
          <p class="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">Rata-rata Nilai</p>
          <div class="flex items-end gap-2 mb-1">
            <span class="text-4xl font-black">{{ academicSummary.gpa }}</span>
            <span class="text-sm font-medium opacity-80 mb-1.5">/ 100</span>
          </div>
          <p class="text-xs text-indigo-100 bg-white/20 inline-flex px-2 py-0.5 rounded backdrop-blur-sm">
            Top {{ academicSummary.rank }} di Kelas
          </p>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div class="flex items-start justify-between mb-4">
          <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <BookOpen :size="20" />
          </div>
          <span class="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Total</span>
        </div>
        <div class="mb-1">
          <span class="text-2xl font-bold text-slate-800">{{ academicSummary.completedCredits }}</span>
          <span class="text-slate-400 text-sm ml-1">/ {{ academicSummary.totalCredits }} Mapel</span>
        </div>
        <p class="text-xs text-slate-500">Mata pelajaran terselesaikan</p>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm md:col-span-2 flex flex-col justify-center">
        <div class="flex items-center justify-between mb-4">
           <h3 class="font-bold text-slate-700 text-sm flex items-center gap-2">
             <TrendingUp :size="16" class="text-indigo-500" /> Grafik Performa
           </h3>
        </div>
        <div class="flex items-end gap-3 h-24 w-full">
          <div v-for="g in grades" :key="g.id" class="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-full bg-slate-100 rounded-t-lg relative overflow-hidden h-full flex items-end">
              <div class="w-full transition-all duration-1000 group-hover:bg-indigo-500"
                   :class="g.finalScore < g.kkm ? 'bg-rose-400' : 'bg-indigo-400'"
                   :style="{ height: `${g.finalScore}%` }">
              </div>
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {{ g.finalScore }}
              </div>
            </div>
            <span class="text-[10px] font-bold text-slate-400 truncate w-12 text-center">{{ g.code }}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-bold text-slate-800">Detail Nilai Akademik</h3>
        <button class="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Lihat Riwayat Lengkap</button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th class="p-4 font-bold rounded-tl-3xl">Mata Pelajaran</th>
              <th class="p-4 font-bold text-center">KKM</th>
              <th class="p-4 font-bold text-center">Tugas (20%)</th>
              <th class="p-4 font-bold text-center">Quiz (20%)</th>
              <th class="p-4 font-bold text-center">UTS (30%)</th>
              <th class="p-4 font-bold text-center">UAS (30%)</th>
              <th class="p-4 font-bold text-center">Akhir</th>
              <th class="p-4 font-bold text-center rounded-tr-3xl">Grade</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="item in grades" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
              <td class="p-4">
                <div>
                  <div class="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{{ item.subject }}</div>
                  <div class="text-xs text-slate-400">{{ item.code }} • {{ item.category }}</div>
                </div>
              </td>
              <td class="p-4 text-center font-medium text-slate-500">{{ item.kkm }}</td>
              <td class="p-4 text-center text-slate-600">{{ item.assignments }}</td>
              <td class="p-4 text-center text-slate-600">{{ item.quiz }}</td>
              <td class="p-4 text-center text-slate-600">{{ item.uts }}</td>
              <td class="p-4 text-center text-slate-600">{{ item.uas }}</td>
              <td class="p-4 text-center">
                <span class="font-bold" :class="item.finalScore < item.kkm ? 'text-rose-600' : 'text-slate-800'">
                  {{ item.finalScore }}
                </span>
              </td>
              <td class="p-4 text-center">
                <div class="flex flex-col items-center">
                  <span class="text-lg font-black leading-none mb-1" :class="getGradeColor(item.grade)">{{ item.grade }}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-bold border capitalize whitespace-nowrap"
                        :class="item.finalScore < item.kkm ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'">
                    {{ item.status }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-start gap-3 text-xs text-slate-500">
        <AlertCircle :size="16" class="mt-0.5 text-indigo-500 shrink-0" />
        <p>
          Nilai Akhir dihitung berdasarkan bobot persentase masing-masing komponen. 
          Jika nilai akhir di bawah KKM, siswa diwajibkan mengikuti program remedial. 
          Hubungi wali kelas untuk informasi lebih lanjut.
        </p>
      </div>
    </div>

  </div>
</template>