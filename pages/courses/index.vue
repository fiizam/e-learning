<script setup>
import { ref, computed } from 'vue';
import { Search, BookOpen, Clock, MoreVertical, Filter } from 'lucide-vue-next';

useHead({
  title: 'Kelas Saya - SMK 09 Learning Portal',
});

// --- DUMMY DATA COURSES ---
const courses = ref([
  {
    id: 'aij-xii',
    title: 'Admin. Infrastruktur Jaringan',
    category: 'Produktif TKJ',
    teacher: 'Pak Hendra, S.Kom',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra',
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    image: 'https://images.unsplash.com/photo-1558494949-ef2bb6ffa030?auto=format&fit=crop&q=80&w=800',
    color: 'bg-indigo-600'
  },
  {
    id: 'tlw-xii',
    title: 'Teknologi Layanan WAN',
    category: 'Produktif TKJ',
    teacher: 'Bu Siti Aminah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    color: 'bg-emerald-600'
  },
  {
    id: 'mtk-xii',
    title: 'Matematika Terapan',
    category: 'Umum',
    teacher: 'Pak Budi Santoso',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    progress: 90,
    totalModules: 20,
    completedModules: 18,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    color: 'bg-rose-600'
  },
  {
    id: 'pkn-xii',
    title: 'Pendidikan Kewarganegaraan',
    category: 'Umum',
    teacher: 'Bu Ratna Sari',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ratna',
    progress: 10,
    totalModules: 8,
    completedModules: 1,
    image: 'https://images.unsplash.com/photo-1569701813229-33284b6436eb?auto=format&fit=crop&q=80&w=800',
    color: 'bg-amber-500'
  },
  {
    id: 'eng-xii',
    title: 'Bahasa Inggris Teknis',
    category: 'Muatan Lokal',
    teacher: 'Mr. John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    progress: 0,
    totalModules: 15,
    completedModules: 0,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
    color: 'bg-blue-500'
  }
]);

const searchQuery = ref('');
const selectedCategory = ref('Semua');

// Filter Logic
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        course.teacher.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = selectedCategory.value === 'Semua' || course.category === selectedCategory.value;
    
    return matchSearch && matchCategory;
  });
});
</script>

<template>
  <div class="space-y-8">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Ruang Belajar</h1>
        <p class="text-slate-500 mt-1 text-sm">Akses materi pelajaran dan lanjutkan progress belajarmu.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group">
          <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari mapel atau guru..." 
            class="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 w-full md:w-64 transition-all shadow-sm"
          />
        </div>
        <button class="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
          <Filter :size="18" />
        </button>
      </div>
    </div>

    <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar-hide">
      <button 
        v-for="cat in ['Semua', 'Produktif TKJ', 'Umum', 'Muatan Lokal']" 
        :key="cat"
        @click="selectedCategory = cat"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border"
        :class="selectedCategory === cat 
          ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      
      <NuxtLink 
        v-for="course in filteredCourses" 
        :key="course.id"
        :to="`/courses/${course.id}`"
        class="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
      >
        <div class="h-40 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
          <img :src="course.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <span class="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-slate-800 shadow-sm">
            {{ course.category }}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <div class="mb-4">
            <h3 class="font-bold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
              {{ course.title }}
            </h3>
          </div>

          <div class="flex items-center gap-3 mb-6">
            <img :src="course.avatar" class="w-8 h-8 rounded-full bg-slate-100" />
            <div class="text-xs">
              <p class="text-slate-500 font-medium">Pengajar</p>
              <p class="text-slate-700 font-bold truncate max-w-[150px]">{{ course.teacher }}</p>
            </div>
          </div>

          <div class="mt-auto">
            <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-slate-500 flex items-center gap-1">
                <BookOpen :size="14" /> {{ course.completedModules }}/{{ course.totalModules }} Modul
              </span>
              <span class="text-xs font-bold" :class="course.progress === 100 ? 'text-emerald-600' : 'text-indigo-600'">
                {{ course.progress }}%
              </span>
            </div>
            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                :class="course.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'"
                :style="{ width: `${course.progress}%` }"
              >
                <div class="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>

    </div>

    <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search :size="24" class="text-slate-400" />
      </div>
      <h3 class="text-lg font-bold text-slate-800">Tidak ditemukan</h3>
      <p class="text-slate-500 text-sm mt-1">Coba cari dengan kata kunci lain.</p>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>