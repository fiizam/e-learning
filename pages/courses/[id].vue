<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  ArrowLeft, PlayCircle, FileText, HelpCircle, 
  CheckCircle2, ChevronDown, Download, Users, Lock
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter(); // Digunakan untuk navigasi ke halaman Quiz
const courseId = route.params.id;

// --- DATA DUMMY ---
const courseData = computed(() => {
  return {
    id: courseId,
    title: courseId === 'aij-xii' ? 'Administrasi Infrastruktur Jaringan' : 'Mata Pelajaran',
    description: 'Mata pelajaran ini membahas tentang konfigurasi VLAN, Routing, dan manajemen bandwidth pada jaringan komputer skala besar menggunakan Mikrotik dan Cisco.',
    teacher: 'Pak Hendra, S.Kom',
    progress: 75,
    lastAccessed: '2 Jam yang lalu',
    chapters: [
      {
        id: 1,
        title: 'Konsep VLAN (Virtual Local Area Network)',
        duration: '2 Jam 15 Menit',
        isOpen: true,
        items: [
          // Type: 'video', 'doc', 'quiz'
          { id: 'video-1', title: 'Pengenalan VLAN dan Manfaatnya', type: 'video', duration: '15:00', completed: true },
          { id: 'doc-1', title: 'Modul PDF: Teori Dasar VLAN', type: 'doc', size: '2.5 MB', completed: true },
          // ITEM KUIS (ID ini akan dikirim ke halaman Quiz)
          { id: 'quiz-1', title: 'Kuis Pemahaman Dasar', type: 'quiz', questions: 10, completed: false },
        ]
      },
      {
        id: 2,
        title: 'Konfigurasi VLAN pada Switch Manageable',
        duration: '3 Jam',
        isOpen: false,
        items: [
          { id: 'video-2', title: 'Video Tutorial: Access & Trunk Port', type: 'video', duration: '20:30', completed: true },
          { id: 'tugas-1', title: 'Praktikum Packet Tracer: Setting VLAN', type: 'assignment', deadline: 'Besok, 23:59', completed: false },
        ]
      },
      {
        id: 3,
        title: 'Inter-VLAN Routing',
        duration: '4 Jam',
        isOpen: false,
        items: [
          { id: 'video-3', title: 'Konsep Router on a Stick', type: 'video', duration: '18:45', completed: false },
          { id: 'doc-2', title: 'Studi Kasus Jaringan Sekolah', type: 'doc', size: '1.2 MB', completed: false },
        ]
      }
    ]
  };
});

// State Tab
const activeTab = ref('materi'); // 'materi', 'tugas', 'diskusi'

// Fungsi Toggle Accordion
const toggleChapter = (index) => {
  courseData.value.chapters[index].isOpen = !courseData.value.chapters[index].isOpen;
};

// Helper Icon
const getIcon = (type) => {
  switch(type) {
    case 'video': return PlayCircle;
    case 'doc': return FileText;
    case 'quiz': return HelpCircle;
    case 'assignment': return FileText;
    default: return FileText;
  }
};

// --- ACTION UTAMA: NAVIGASI KE KONTEN ---
const navigateToContent = (item) => {
  if (item.type === 'quiz') {
    // Arahkan ke halaman /quiz/[id]
    router.push(`/quiz/${item.id}`);
  } else if (item.type === 'video') {
    alert('Memutar Video: ' + item.title);
  } else if (item.type === 'doc') {
    alert('Mengunduh Dokumen: ' + item.title);
  } else {
    alert('Membuka konten: ' + item.title);
  }
};
</script>

<template>
  <div class="max-w-5xl mx-auto pb-12">
    
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/courses" class="p-2 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-slate-500">
        <ArrowLeft :size="20" />
      </NuxtLink>
      <div>
        <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-0.5">
          <span>Kelas Saya</span>
          <span>/</span>
          <span class="text-indigo-600">Produktif TKJ</span>
        </div>
        <h1 class="text-xl font-bold text-slate-800">{{ courseData.title }}</h1>
      </div>
    </div>

    <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative mb-8">
      <div class="absolute top-0 right-0 p-6 hidden md:block">
        <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
          <span class="text-3xl font-black text-indigo-200">TKJ</span>
        </div>
      </div>
      
      <div class="p-6 md:p-8 relative z-10">
        <p class="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
          {{ courseData.description }}
        </p>
        
        <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
              <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${courseData.teacher}`" />
            </div>
            <div>
              <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">Pengajar</p>
              <p class="text-sm font-bold text-slate-800">{{ courseData.teacher }}</p>
            </div>
          </div>

          <div class="flex-1 max-w-xs">
             <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-slate-500">Progress Belajar</span>
              <span class="text-xs font-bold text-indigo-600">{{ courseData.progress }}%</span>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-600 rounded-full w-[75%] relative overflow-hidden">
                 <div class="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <p class="text-[10px] text-slate-400 mt-1.5 font-medium">Terakhir akses: {{ courseData.lastAccessed }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-slate-200 mb-6 -mx-4 lg:-mx-8 px-4 lg:px-8 transition-all duration-300">
      <div class="flex items-center gap-1 max-w-5xl mx-auto">
        <button 
          v-for="tab in ['Materi', 'Tugas', 'Diskusi']" 
          :key="tab"
          @click="activeTab = tab.toLowerCase()"
          class="relative px-6 py-4 text-sm font-bold transition-colors"
          :class="activeTab === tab.toLowerCase() 
            ? 'text-indigo-600' 
            : 'text-slate-500 hover:text-slate-800'"
        >
          {{ tab }}
          <span 
            class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full transition-transform duration-300"
            :class="activeTab === tab.toLowerCase() ? 'scale-x-100' : 'scale-x-0'"
          ></span>
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'materi'" class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div 
        v-for="(chapter, idx) in courseData.chapters" 
        :key="chapter.id"
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
        :class="chapter.isOpen ? 'shadow-md ring-1 ring-indigo-50' : 'shadow-sm'"
      >
        <button 
          @click="toggleChapter(idx)"
          class="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors select-none"
        >
          <div>
            <h3 class="font-bold text-slate-800 text-sm md:text-base mb-1">
              Bab {{ idx + 1 }}: {{ chapter.title }}
            </h3>
            <p class="text-xs text-slate-500 font-medium flex items-center gap-2">
              <span>{{ chapter.items.length }} Materi</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{{ chapter.duration }}</span>
            </p>
          </div>
          <ChevronDown 
            :size="20" 
            class="text-slate-400 transition-transform duration-300"
            :class="chapter.isOpen ? 'rotate-180 text-indigo-600' : ''" 
          />
        </button>

        <div v-show="chapter.isOpen" class="border-t border-slate-100 bg-slate-50/50">
          
          <div v-for="(item, itemIdx) in chapter.items" :key="item.id" 
               @click="navigateToContent(item)"
               class="group flex items-start gap-4 p-4 hover:bg-white transition-colors border-b border-slate-100 last:border-0 cursor-pointer relative"
          >
            <div class="absolute left-[26px] top-0 bottom-0 w-px bg-slate-200 -z-10 group-first:top-4 group-last:bottom-auto group-last:h-4"></div>

            <div 
              class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 bg-white border-2 transition-colors"
              :class="item.completed ? 'border-emerald-500 text-emerald-500' : 'border-slate-300 text-slate-300'"
            >
              <CheckCircle2 v-if="item.completed" :size="14" class="stroke-[3]" />
              <div v-else class="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>

            <div class="flex-1 pt-0.5">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                  {{ item.title }}
                </h4>
                <span v-if="item.duration || item.size || item.questions" 
                      class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200 whitespace-nowrap ml-2">
                  {{ item.duration || item.size || item.questions + ' Soal' }}
                </span>
              </div>
              
              <div class="flex items-center gap-2 mt-1.5">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-100">
                  <component :is="getIcon(item.type)" :size="10" />
                  {{ item.type === 'doc' ? 'Dokumen' : item.type === 'quiz' ? 'Kuis' : 'Video' }}
                </span>
                <span v-if="item.deadline" class="text-[10px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                  Deadline: {{ item.deadline }}
                </span>
              </div>
            </div>

            <div class="ml-2">
              <button 
                v-if="item.type === 'quiz'" 
                class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Mulai Kuis
              </button>
              <button v-else class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <component :is="item.type === 'doc' ? Download : PlayCircle" :size="18" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div v-else class="py-12 text-center bg-white border border-dashed border-slate-300 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <component :is="activeTab === 'tugas' ? FileText : Users" :size="24" />
      </div>
      <h3 class="text-lg font-bold text-slate-800 capitalize">Belum ada {{ activeTab }}</h3>
      <p class="text-slate-500 text-sm mt-1">Guru belum memposting apapun di bagian ini.</p>
    </div>

  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>