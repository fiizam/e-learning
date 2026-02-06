<script setup>
import { ref, computed } from 'vue';
import { 
  ClipboardList, Calendar, Clock, AlertCircle, 
  CheckCircle2, FileText, UploadCloud, X, ChevronRight,
  Download, Award
} from 'lucide-vue-next';

useHead({
  title: 'Tugas & Ujian - SMK 09 Learning Portal',
});

// --- STATE MANAGEMENT ---
const activeTab = ref('pending'); // 'pending', 'completed'
const selectedTask = ref(null);   // Untuk menyimpan data tugas yang sedang diklik (Slide-over)
const isDragging = ref(false);    // State untuk drag & drop zone

// --- DUMMY DATA TUGAS ---
const assignments = ref([
  {
    id: 1,
    title: 'Membuat REST API dengan Laravel',
    course: 'Pemrograman Web Lanjut',
    type: 'Project', // Project, Quiz, Essay
    deadline: '2023-10-27T23:59:00',
    description: 'Buatlah API CRUD sederhana untuk manajemen data "Produk". Wajib menggunakan Resource Controller dan API Resource. Sertakan file Postman Collection dalam format JSON.',
    status: 'pending', // pending, submitted, late, graded
    points: 100,
    fileType: '.zip, .rar',
    teacher: 'Pak Budi Santoso'
  },
  {
    id: 2,
    title: 'Analisis ERD Sistem Perpustakaan',
    course: 'Basis Data',
    type: 'Essay',
    deadline: '2023-10-28T15:00:00',
    description: 'Analisis studi kasus perpustakaan kota. Buatlah ERD (Entity Relationship Diagram) lengkap dengan kardinalitasnya. Upload dalam format PDF.',
    status: 'pending',
    points: 80,
    fileType: '.pdf',
    teacher: 'Bu Siti Aminah'
  },
  {
    id: 3,
    title: 'Kuis Logika Algoritma Dasar',
    course: 'Dasar Pemrograman',
    type: 'Quiz',
    deadline: '2023-10-20T10:00:00',
    description: 'Kuis pilihan ganda 20 soal mengenai percabangan dan perulangan.',
    status: 'late', // Terlambat
    points: 100,
    fileType: 'link',
    teacher: 'Pak Ahmad Dhani'
  },
  {
    id: 4,
    title: 'Desain Prototype Aplikasi Absensi',
    course: 'Desain UI/UX',
    type: 'Project',
    deadline: '2023-10-15T23:59:00',
    description: 'Link Figma prototype.',
    status: 'graded', // Sudah dinilai
    submittedDate: '2023-10-14T20:30:00',
    points: 100,
    score: 95,
    feedback: 'Desain sangat rapi, penggunaan auto-layout sudah tepat. Tingkatkan lagi pada bagian kontras warna.',
    teacher: 'Bu Sarah Wijaya'
  },
  {
    id: 5,
    title: 'Laporan Praktikum Jaringan',
    course: 'Infrastruktur Jaringan',
    type: 'Laporan',
    deadline: '2023-10-18T23:59:00',
    description: 'Laporan setting Mikrotik dasar.',
    status: 'submitted', // Menunggu dinilai
    submittedDate: '2023-10-18T10:00:00',
    points: 100,
    score: null,
    teacher: 'Pak Dedi'
  }
]);

// --- COMPUTED LOGIC ---
const filteredAssignments = computed(() => {
  if (activeTab.value === 'pending') {
    return assignments.value.filter(a => ['pending', 'late'].includes(a.status));
  } else {
    return assignments.value.filter(a => ['submitted', 'graded'].includes(a.status));
  }
});

// Helper: Hitung sisa hari
const getDaysLeft = (dateString) => {
  const diff = new Date(dateString) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Terlewat';
  if (days === 0) return 'Hari ini';
  return `${days} Hari lagi`;
};

// Helper: Format Tanggal
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// --- ACTIONS ---
const openDetail = (task) => {
  selectedTask.value = task;
  // Prevent body scroll when modal open
  document.body.style.overflow = 'hidden';
};

const closeDetail = () => {
  selectedTask.value = null;
  document.body.style.overflow = 'auto';
};

const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  alert('Simulasi: File berhasil didrop (Backend belum terhubung)');
};
</script>

<template>
  <div class="space-y-6 relative min-h-screen">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Tugas & Ujian</h1>
        <p class="text-slate-500 mt-1 text-sm">Kelola semua penugasan akademikmu di sini.</p>
      </div>
      
      <div class="bg-slate-100 p-1 rounded-xl flex">
        <button 
          @click="activeTab = 'pending'"
          class="px-6 py-2 rounded-lg text-sm font-semibold transition-all relative z-10"
          :class="activeTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          Perlu Dikerjakan
          <span v-if="assignments.filter(a => ['pending', 'late'].includes(a.status)).length > 0" class="ml-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {{ assignments.filter(a => ['pending', 'late'].includes(a.status)).length }}
          </span>
        </button>
        <button 
          @click="activeTab = 'completed'"
          class="px-6 py-2 rounded-lg text-sm font-semibold transition-all relative z-10"
          :class="activeTab === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          Selesai / Dinilai
        </button>
      </div>
    </div>

    <div v-if="filteredAssignments.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
      <div class="bg-slate-50 p-4 rounded-full mb-4">
        <ClipboardList :size="40" class="text-slate-300" />
      </div>
      <p class="text-slate-500 font-medium">Tidak ada tugas di kategori ini.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      <div 
        v-for="task in filteredAssignments" 
        :key="task.id"
        @click="openDetail(task)"
        class="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full relative overflow-hidden"
      >
        <div class="absolute top-4 right-4">
          <span v-if="task.status === 'pending'" class="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full border border-indigo-100">
            {{ getDaysLeft(task.deadline) }}
          </span>
          <span v-if="task.status === 'late'" class="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded-full border border-rose-100 flex items-center gap-1">
            <AlertCircle :size="10" /> Terlambat
          </span>
          <span v-if="task.status === 'graded'" class="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
            <Award :size="10" /> {{ task.score }}/100
          </span>
          <span v-if="task.status === 'submitted'" class="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-100">
            Menunggu Dinilai
          </span>
        </div>

        <div class="flex items-start gap-4 mb-4">
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="{
              'bg-blue-50 text-blue-600': task.type === 'Project',
              'bg-purple-50 text-purple-600': task.type === 'Quiz',
              'bg-orange-50 text-orange-600': task.type === 'Essay' || task.type === 'Laporan',
            }"
          >
            <FileText :size="24" />
          </div>
          <div class="pr-16"> <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{{ task.course }}</p>
            <h3 class="font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
              {{ task.title }}
            </h3>
          </div>
        </div>

        <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 text-slate-500">
            <Calendar :size="14" />
            <span>{{ new Date(task.deadline).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) }}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-500">
            <Clock :size="14" />
            <span>{{ new Date(task.deadline).toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'}) }}</span>
          </div>
        </div>
      </div>
    </div>


    <div 
      v-if="selectedTask" 
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
      @click="closeDetail"
    ></div>

    <div 
      class="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="selectedTask ? 'translate-x-0' : 'translate-x-full'"
    >
      <div v-if="selectedTask" class="h-full flex flex-col">
        
        <div class="p-6 border-b border-slate-100 flex items-start justify-between bg-white shrink-0">
          <div>
            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
              {{ selectedTask.type }}
            </span>
            <h2 class="text-xl font-bold text-slate-800 leading-tight">{{ selectedTask.title }}</h2>
            <p class="text-sm text-slate-500 mt-1">{{ selectedTask.course }} • {{ selectedTask.teacher }}</p>
          </div>
          <button @click="closeDetail" class="p-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors text-slate-400">
            <X :size="20" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div class="flex items-center gap-3 p-4 rounded-xl border"
            :class="selectedTask.status === 'late' ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700'"
          >
            <Clock :size="20" />
            <div>
              <p class="text-xs font-bold uppercase opacity-70">Batas Waktu</p>
              <p class="font-semibold text-sm">{{ formatDate(selectedTask.deadline) }}</p>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-slate-800 mb-2">Instruksi Tugas</h3>
            <div class="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {{ selectedTask.description }}
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Pengumpulan Tugas
              <span class="text-xs font-normal text-slate-500">Format: {{ selectedTask.fileType }}</span>
            </h3>

            <div v-if="['pending', 'late'].includes(selectedTask.status)">
              <div 
                class="border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer"
                :class="isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop="handleDrop"
              >
                <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UploadCloud :size="24" />
                </div>
                <p class="font-medium text-slate-700">Drag & Drop file di sini</p>
                <p class="text-xs text-slate-400 mt-1">atau klik untuk menjelajah</p>
                <input type="file" class="hidden" />
              </div>
              <button class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200">
                Kirim Tugas
              </button>
            </div>

            <div v-else class="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white text-emerald-600 rounded-lg shadow-sm">
                  <CheckCircle2 :size="20" />
                </div>
                <div>
                  <p class="font-bold text-emerald-800 text-sm">Tugas Berhasil Dikirim</p>
                  <p class="text-xs text-emerald-600">{{ formatDate(selectedTask.submittedDate) }}</p>
                </div>
              </div>
              
              <div class="bg-white/60 rounded-lg p-3 flex items-center justify-between">
                <div class="flex items-center gap-2 overflow-hidden">
                   <FileText :size="16" class="text-slate-400 shrink-0" />
                   <span class="text-sm text-slate-600 truncate">tugas_akhir_rizky.zip</span>
                </div>
                <button class="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Lihat</button>
              </div>

              <div v-if="selectedTask.status === 'graded'" class="mt-4 pt-4 border-t border-emerald-200/50">
                <p class="text-xs font-bold text-emerald-800 uppercase mb-2">Nilai & Masukan</p>
                <div class="flex items-start gap-4">
                  <div class="text-center bg-white p-2 rounded-lg border border-emerald-100 shadow-sm min-w-[60px]">
                    <span class="block text-2xl font-bold text-emerald-600">{{ selectedTask.score }}</span>
                    <span class="text-[10px] text-slate-400">Poin</span>
                  </div>
                  <p class="text-sm text-emerald-900 italic">"{{ selectedTask.feedback }}"</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div class="p-4 border-t border-slate-100 bg-slate-50 shrink-0 text-center text-xs text-slate-400">
          Jika ada kendala, hubungi guru mata pelajaran terkait.
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Transisi untuk list item (opsional, untuk kehalusan) */
.group {
  transition-property: all;
  transition-duration: 300ms;
}
</style>