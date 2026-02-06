<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  Clock, ChevronLeft, ChevronRight, Flag, 
  CheckCircle2, AlertCircle, XCircle, LayoutGrid, Save 
} from 'lucide-vue-next';
import { useToastStore } from '~/stores/toast'; // Import Toast Store

const route = useRoute();
const router = useRouter();
const toast = useToastStore(); // Inisialisasi Toast

// --- STATE DATA ---
const quizMeta = ref({
  id: route.params.id,
  title: 'Evaluasi Bab 1: Konsep Dasar VLAN',
  subject: 'Admin. Infrastruktur Jaringan',
  duration: 45 * 60, // 45 Menit dalam detik
  totalQuestions: 10,
  minScore: 75
});

// Data Soal Dummy (Kompleks: Pilihan Ganda)
const questions = ref([
  {
    id: 1,
    text: "Apa keuntungan utama menggunakan VLAN dalam sebuah jaringan berskala besar?",
    options: [
      { id: 'A', text: "Meningkatkan kecepatan internet secara drastis" },
      { id: 'B', text: "Membatasi broadcast domain dan meningkatkan keamanan" },
      { id: 'C', text: "Mengganti fungsi Router sepenuhnya" },
      { id: 'D', text: "Memperluas jangkauan sinyal Wi-Fi" },
      { id: 'E', text: "Menghapus kebutuhan akan Switch Manageable" }
    ],
    correct: 'B'
  },
  {
    id: 2,
    text: "Perintah mana yang digunakan untuk melihat konfigurasi VLAN yang sedang berjalan pada Switch Cisco?",
    options: [
      { id: 'A', text: "show ip interface brief" },
      { id: 'B', text: "show vlan brief" },
      { id: 'C', text: "display vlan all" },
      { id: 'D', text: "config terminal vlan" },
      { id: 'E', text: "debug vlan packet" }
    ],
    correct: 'B'
  },
  {
    id: 3,
    text: "VLAN ID standar (Normal Range) berkisar antara angka...",
    options: [
      { id: 'A', text: "1 - 1005" },
      { id: 'B', text: "1006 - 4094" },
      { id: 'C', text: "0 - 255" },
      { id: 'D', text: "1 - 4096" },
      { id: 'E', text: "10 - 100" }
    ],
    correct: 'A'
  },
  {
    id: 4,
    text: "Jenis port switch yang dikonfigurasi untuk membawa traffic dari banyak VLAN sekaligus disebut...",
    options: [
      { id: 'A', text: "Access Port" },
      { id: 'B', text: "Trunk Port" },
      { id: 'C', text: "Hybrid Port" },
      { id: 'D', text: "Console Port" },
      { id: 'E', text: "Management Port" }
    ],
    correct: 'B'
  },
  {
    id: 5,
    text: "Protokol standar IEEE yang digunakan untuk mekanisme Tagging VLAN (Trunking) adalah...",
    options: [
      { id: 'A', text: "IEEE 802.11ac" },
      { id: 'B', text: "IEEE 802.1Q" },
      { id: 'C', text: "IEEE 802.1X" },
      { id: 'D', text: "ISL (Inter-Switch Link)" },
      { id: 'E', text: "STP (Spanning Tree Protocol)" }
    ],
    correct: 'B'
  }
  // (Simulasi 5 soal saja untuk demo code)
]);

// --- STATE UJIAN ---
const currentQuestionIndex = ref(0);
const answers = ref({}); // { 1: 'A', 2: 'C' }
const flaggedQuestions = ref(new Set()); // Set ID soal yang ditandai ragu
const timeLeft = ref(quizMeta.value.duration);
const isFinished = ref(false);
const showConfirmSubmit = ref(false);
const scoreResult = ref(0);

// --- TIMER LOGIC ---
let timerInterval;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

onMounted(() => {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      finishQuiz(); // Auto submit waktu habis
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

// --- NAVIGATION LOGIC ---
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const jumpToQuestion = (index) => {
  currentQuestionIndex.value = index;
};

// --- ACTION LOGIC ---
const selectAnswer = (optionId) => {
  answers.value[currentQuestion.value.id] = optionId;
};

const toggleFlag = () => {
  const qId = currentQuestion.value.id;
  if (flaggedQuestions.value.has(qId)) {
    flaggedQuestions.value.delete(qId);
  } else {
    flaggedQuestions.value.add(qId);
  }
};

const calculateScore = () => {
  let correctCount = 0;
  questions.value.forEach(q => {
    if (answers.value[q.id] === q.correct) {
      correctCount++;
    }
  });
  // Rumus: (Benar / Total Soal) * 100
  return Math.round((correctCount / questions.value.length) * 100);
};

const finishQuiz = () => {
  clearInterval(timerInterval);
  scoreResult.value = calculateScore();
  isFinished.value = true;
  showConfirmSubmit.value = false;

  // LOGIKA NOTIFIKASI
  if (scoreResult.value >= quizMeta.value.minScore) {
    toast.add({
      type: 'success',
      title: 'Ujian Selesai!',
      message: `Selamat! Anda lulus dengan nilai ${scoreResult.value}.`,
      duration: 5000
    });
  } else {
    toast.add({
      type: 'warning',
      title: 'Ujian Selesai',
      message: `Nilai Anda ${scoreResult.value}. Jangan menyerah, tingkatkan belajar lagi!`,
      duration: 5000
    });
  }
};

// --- HELPER UI ---
const getNavButtonClass = (index, qId) => {
  const isCurrent = currentQuestionIndex.value === index;
  const isAnswered = !!answers.value[qId];
  const isFlagged = flaggedQuestions.value.has(qId);

  if (isCurrent) return 'ring-2 ring-indigo-500 bg-white text-indigo-700 border-indigo-200';
  if (isFlagged) return 'bg-amber-100 text-amber-700 border-amber-300';
  if (isAnswered) return 'bg-emerald-500 text-white border-emerald-600';
  return 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200';
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    
    <div v-if="isFinished" class="max-w-2xl mx-auto pt-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
        <div class="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
             :class="scoreResult >= quizMeta.minScore ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'">
          <CheckCircle2 v-if="scoreResult >= quizMeta.minScore" :size="48" />
          <XCircle v-else :size="48" />
        </div>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-2">Ujian Selesai!</h2>
        <p class="text-slate-500 mb-8">Anda telah menyelesaikan {{ quizMeta.title }}</p>

        <div class="text-6xl font-black mb-2" :class="scoreResult >= quizMeta.minScore ? 'text-slate-800' : 'text-rose-500'">
          {{ scoreResult }}
        </div>
        <div class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">Nilai Akhir</div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div class="text-xs text-slate-500">Durasi Pengerjaan</div>
            <div class="font-bold text-slate-700">32:15 Menit</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div class="text-xs text-slate-500">KKM (Minimum)</div>
            <div class="font-bold text-slate-700">{{ quizMeta.minScore }}</div>
          </div>
        </div>

        <button @click="router.push('/courses/' + quizMeta.id.split('-')[0])" 
                class="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
          Kembali ke Materi
        </button>
      </div>
    </div>

    <div v-else class="h-screen flex flex-col">
      
      <header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 z-20 shrink-0">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <LayoutGrid :size="20" />
          </div>
          <div>
            <h1 class="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{{ quizMeta.title }}</h1>
            <p class="text-xs text-slate-500 hidden md:block">{{ quizMeta.subject }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-md">
            <Clock :size="16" class="animate-pulse" />
            <span class="font-mono font-bold text-lg tracking-widest">{{ formatTime(timeLeft) }}</span>
          </div>
        </div>
      </header>

      <div class="flex-1 flex overflow-hidden">
        
        <main class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
          <div class="max-w-3xl mx-auto pb-24">
            
            <div class="mb-6 flex items-center gap-3">
              <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 transition-all duration-300"
                     :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"></div>
              </div>
              <span class="text-xs font-bold text-slate-500">
                Soal {{ currentQuestionIndex + 1 }} / {{ questions.length }}
              </span>
            </div>

            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-6">
              <div class="flex items-start gap-4 mb-6">
                <span class="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600 text-sm">
                  {{ currentQuestionIndex + 1 }}
                </span>
                <p class="text-lg text-slate-800 font-medium leading-relaxed">
                  {{ currentQuestion.text }}
                </p>
              </div>

              <div class="space-y-3">
                <div v-for="opt in currentQuestion.options" :key="opt.id"
                     @click="selectAnswer(opt.id)"
                     class="group relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50"
                     :class="answers[currentQuestion.id] === opt.id 
                        ? 'border-indigo-600 bg-indigo-50/50' 
                        : 'border-slate-100 hover:border-slate-300'">
                  
                  <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors"
                       :class="answers[currentQuestion.id] === opt.id 
                          ? 'border-indigo-600 bg-indigo-600' 
                          : 'border-slate-300 group-hover:border-indigo-400'">
                    <div class="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                  
                  <span class="font-bold mr-2 w-6" :class="answers[currentQuestion.id] === opt.id ? 'text-indigo-700' : 'text-slate-500'">
                    {{ opt.id }}.
                  </span>
                  <span class="text-slate-700" :class="{ 'font-semibold': answers[currentQuestion.id] === opt.id }">
                    {{ opt.text }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between gap-4">
              <button 
                @click="prevQuestion" 
                :disabled="currentQuestionIndex === 0"
                class="px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                <ChevronLeft :size="18" /> Sebelumnya
              </button>

              <button 
                @click="toggleFlag"
                class="px-4 py-3 rounded-xl font-bold transition flex items-center gap-2"
                :class="flaggedQuestions.has(currentQuestion.id) ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'"
              >
                <Flag :size="18" :fill="flaggedQuestions.has(currentQuestion.id) ? 'currentColor' : 'none'" />
                <span class="hidden md:inline">{{ flaggedQuestions.has(currentQuestion.id) ? 'Ditandai Ragu' : 'Ragu-ragu' }}</span>
              </button>

              <button 
                v-if="currentQuestionIndex < questions.length - 1"
                @click="nextQuestion" 
                class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-200"
              >
                Selanjutnya <ChevronRight :size="18" />
              </button>

              <button 
                v-else
                @click="showConfirmSubmit = true"
                class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-200"
              >
                <Save :size="18" /> Selesai
              </button>
            </div>

          </div>
        </main>

        <aside class="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col">
          <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-800">Navigasi Soal</h3>
            <div class="flex items-center gap-4 mt-2 text-[10px] text-slate-500 font-semibold">
              <div class="flex items-center gap-1"><div class="w-3 h-3 bg-emerald-500 rounded-full"></div> Isi</div>
              <div class="flex items-center gap-1"><div class="w-3 h-3 bg-white border border-slate-300 rounded-full"></div> Kosong</div>
              <div class="flex items-center gap-1"><div class="w-3 h-3 bg-amber-100 border border-amber-300 rounded-full"></div> Ragu</div>
            </div>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div class="grid grid-cols-5 gap-3">
              <button 
                v-for="(q, idx) in questions" 
                :key="q.id"
                @click="jumpToQuestion(idx)"
                class="w-full aspect-square rounded-lg font-bold text-sm border flex items-center justify-center transition-all duration-200 relative"
                :class="getNavButtonClass(idx, q.id)"
              >
                {{ idx + 1 }}
                <div v-if="flaggedQuestions.has(q.id)" class="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
              </button>
            </div>
          </div>

          <div class="p-6 bg-slate-50 border-t border-slate-200">
            <button @click="showConfirmSubmit = true" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition-all">
              Kumpulkan Jawaban
            </button>
          </div>
        </aside>

      </div>
    </div>

    <div v-if="showConfirmSubmit" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
        <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 :size="32" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 text-center mb-2">Kumpulkan Ujian?</h3>
        <p class="text-slate-500 text-center text-sm mb-6">
          Pastikan Anda telah memeriksa kembali jawaban Anda. Waktu tersisa <span class="font-mono font-bold text-slate-700">{{ formatTime(timeLeft) }}</span>.
        </p>

        <div class="space-y-3">
          <div class="flex justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span class="text-slate-500">Total Soal</span>
            <span class="font-bold text-slate-800">{{ questions.length }}</span>
          </div>
          <div class="flex justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span class="text-slate-500">Dijawab</span>
            <span class="font-bold text-emerald-600">{{ Object.keys(answers).length }}</span>
          </div>
          <div class="flex justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span class="text-slate-500">Ragu-ragu</span>
            <span class="font-bold text-amber-500">{{ flaggedQuestions.size }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-8">
          <button @click="showConfirmSubmit = false" class="py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition">Batal</button>
          <button @click="finishQuiz" class="py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition">Ya, Kumpulkan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>