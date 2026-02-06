<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
  LayoutDashboard, BookOpen, Calendar, GraduationCap, 
  LogOut, Bell, Menu, X, Search, Pin, PinOff,
  Settings, HelpCircle, ChevronRight, Heart, Code,
  // Icon tambahan untuk fitur baru
  Book, MessageSquare, Trophy, Megaphone 
} from 'lucide-vue-next';
import { useAcademicStore } from '~/stores/academic';
import { useAuthStore } from '~/stores/auth'; // Import Auth Store

const store = useAcademicStore();
const authStore = useAuthStore(); // Gunakan Store
const route = useRoute();

// --- STATE MANAGEMENT ---
const isMobileSidebarOpen = ref(false);
const isSidebarLocked = ref(false); 
const isHovered = ref(false);       

// Reset sidebar mobile saat pindah halaman
watch(() => route.path, () => {
  isMobileSidebarOpen.value = false;
});

// --- LOGIC ANIMASI ---
const isExpanded = computed(() => isHovered.value || isSidebarLocked.value);

const sidebarWidth = computed(() => isExpanded.value ? 'w-[280px]' : 'w-[84px]');

const textAnimationClass = computed(() => {
  return isExpanded.value 
    ? 'opacity-100 translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] delay-75' 
    : 'opacity-0 -translate-x-4 w-0 overflow-hidden transition-all duration-200 ease-in';
});

// --- ACTIONS ---
const toggleLock = () => {
  isSidebarLocked.value = !isSidebarLocked.value;
  if (!isSidebarLocked.value) isHovered.value = true;
};

// Fungsi Logout
const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="flex h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden">
    
    <div 
      v-if="isMobileSidebarOpen" 
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm lg:hidden transition-opacity duration-500"
    ></div>

    <aside 
      @mouseenter="!isSidebarLocked ? isHovered = true : null"
      @mouseleave="!isSidebarLocked ? isHovered = false : null"
      class="fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 shadow-xl lg:shadow-none transition-[width] duration-500 will-change-[width] ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="[
        isMobileSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0',
        `lg:${sidebarWidth}`
      ]"
    >
      
      <div class="h-24 flex items-center relative overflow-hidden transition-all duration-300"
           :class="isExpanded ? 'px-6' : 'px-0 justify-center'">
        <div class="flex items-center gap-4 whitespace-nowrap">
          <div class="relative group cursor-pointer flex-shrink-0 z-20">
            <div class="relative w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span class="font-bold text-xl tracking-tighter">09</span>
            </div>
          </div>
          <div :class="textAnimationClass" class="flex flex-col">
            <h1 class="font-bold text-slate-800 text-xl tracking-tight leading-none">SMK 09</h1>
            <p class="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1.5">Learning System</p>
          </div>
        </div>
        <button @click="isMobileSidebarOpen = false" class="absolute right-4 lg:hidden text-slate-400 p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <X :size="24" />
        </button>
      </div>

      <div 
        class="hidden lg:flex justify-end px-4 py-3 absolute top-24 right-0 z-20 transition-opacity duration-300" 
        :class="isExpanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'"
      >
        <button 
          @click="toggleLock"
          class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors active:scale-90"
          :title="isSidebarLocked ? 'Lepas Kunci' : 'Kunci Sidebar'"
        >
          <Pin v-if="isSidebarLocked" :size="15" class="fill-indigo-600 text-indigo-600" />
          <PinOff v-else :size="15" />
        </button>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div class="mb-2 min-h-[20px] px-4 flex items-center overflow-hidden">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap transition-all duration-300 delay-75"
             :class="isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'">
            Menu Utama
          </p>
        </div>

        <template v-for="(item, index) in [
          { name: 'Dashboard', icon: LayoutDashboard, link: '/' },
          { name: 'Kelas Saya', icon: BookOpen, link: '/courses' },
          { name: 'Perpustakaan', icon: Book, link: '/library' },
          { name: 'Pesan', icon: MessageSquare, link: '/inbox' },
          { name: 'Peringkat', icon: Trophy, link: '/leaderboard' },
          { name: 'Pengumuman', icon: Megaphone, link: '/announcements' },
          { name: 'Jadwal Pelajaran', icon: Calendar, link: '/schedule' },
          { name: 'Nilai & Rapor', icon: GraduationCap, link: '/grades' },
        ]" :key="index">
          <NuxtLink 
            :to="item.link" 
            class="group relative flex items-center min-h-[50px] rounded-xl transition-all duration-300 overflow-hidden"
            :class="[
              route.path === item.link 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
              isExpanded ? 'px-4 gap-3' : 'justify-center px-0'
            ]"
            :title="!isExpanded ? item.name : ''"
          >
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-indigo-600 rounded-r-full transition-all duration-300 ease-out"
                 :class="route.path === item.link ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'"></div>

            <component :is="item.icon" :size="22" 
                       class="flex-shrink-0 transition-all duration-300 z-10"
                       :class="[
                         route.path === item.link ? 'text-indigo-600' : 'group-hover:text-indigo-500',
                         !isExpanded && 'group-hover:scale-110'
                       ]" />
            <span class="text-sm whitespace-nowrap z-10 origin-left" :class="textAnimationClass">
              {{ item.name }}
            </span>
          </NuxtLink>
        </template>

        <div class="my-4 border-t border-slate-100 mx-2"></div>
        
        <NuxtLink 
          to="/settings" 
          class="group relative flex items-center min-h-[50px] rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all duration-300 mb-1.5"
          :class="[
             route.path === '/settings' ? 'bg-indigo-50 text-indigo-700 font-semibold' : '',
             isExpanded ? 'px-4 gap-3' : 'justify-center px-0'
          ]"
          :title="!isExpanded ? 'Pengaturan' : ''"
        >
          <Settings :size="22" class="flex-shrink-0 transition-transform duration-500 z-10" 
            :class="[
              route.path === '/settings' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500 group-hover:rotate-45',
              !isExpanded && 'group-hover:scale-110'
            ]" 
          />
          <span class="font-medium text-sm whitespace-nowrap z-10 origin-left" :class="textAnimationClass">Pengaturan</span>
        </NuxtLink>

        <button 
          @click="handleLogout"
          class="w-full group relative flex items-center min-h-[50px] rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 cursor-pointer"
          :class="isExpanded ? 'px-4 gap-3' : 'justify-center px-0'"
          :title="!isExpanded ? 'Sign Out' : ''"
        >
          <LogOut :size="22" class="flex-shrink-0 transition-all duration-300 z-10" 
            :class="!isExpanded && 'group-hover:scale-110'" />
          <span class="font-medium text-sm whitespace-nowrap z-10 origin-left" :class="textAnimationClass">Sign Out</span>
        </button>

      </nav>

      <div class="p-4 bg-slate-50/50 border-t border-slate-100">
        <div 
          class="flex items-center rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all duration-300 group overflow-hidden"
          :class="isExpanded ? 'p-3 gap-3' : 'p-0 w-11 h-11 justify-center'"
        >
          <img :src="store.student.avatar" class="w-9 h-9 rounded-full object-cover border border-slate-100" />
          <div :class="textAnimationClass" class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">{{ store.student.name }}</p>
            <p class="text-[10px] text-slate-400 truncate mt-0.5">Siswa Aktif</p>
          </div>
          <ChevronRight v-if="isExpanded" :size="16" class="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

    </aside>

    <main class="flex-1 flex flex-col h-full overflow-hidden relative w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform">
      <header class="h-20 flex items-center justify-between px-6 lg:px-8 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-30 sticky top-0">
        <div class="flex items-center gap-4">
          <button @click="isMobileSidebarOpen = true" class="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu :size="24" />
          </button>
          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-slate-800 tracking-tight">
              {{ 
                route.path === '/' ? 'Dashboard' : 
                route.path.includes('courses') ? 'Ruang Belajar' : 
                route.path.includes('schedule') ? 'Jadwal Akademik' : 
                route.path.includes('grades') ? 'Nilai & Rapor' : 
                route.path.includes('settings') ? 'Pengaturan Akun' : 
                route.path.includes('library') ? 'Perpustakaan Digital' :
                route.path.includes('inbox') ? 'Pesan & Diskusi' :
                route.path.includes('leaderboard') ? 'Peringkat Siswa' :
                route.path.includes('announcements') ? 'Pengumuman Sekolah' :
                'Sistem Akademik' 
              }}
            </h2>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center bg-white px-4 py-2 rounded-full border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all w-64 shadow-sm group">
            <Search :size="16" class="text-slate-400 mr-2 group-focus-within:text-indigo-500 transition-colors" />
            <input type="text" placeholder="Cari materi..." class="bg-transparent text-sm outline-none w-full text-slate-600 placeholder:text-slate-400" />
          </div>
          <button class="relative p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-95">
            <Bell :size="20" class="text-slate-500 hover:text-indigo-600 transition-colors" />
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto scroll-smooth custom-scrollbar-light flex flex-col">
        <div class="flex-1 p-4 lg:p-8">
          <slot />
        </div>

        <footer class="py-6 px-4 lg:px-8 border-t border-slate-200 bg-white/60 backdrop-blur-sm mt-auto">
          <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-md">
                <Code :size="16" />
              </span>
              <p class="text-sm text-slate-500 font-medium">
                &copy; 2025 <span class="text-slate-800 font-bold">SMK Negeri 09</span>.
              </p>
            </div>

            <div class="flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <span>Created with</span>
              <Heart :size="14" class="text-rose-500 fill-rose-500 animate-pulse" />
              <span>by</span>
              <a href="#" class="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md font-bold hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm">
                Phyzam
              </a>
            </div>

          </div>
        </footer>
      </div>

    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar,
.custom-scrollbar-light::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar-light::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb,
.custom-scrollbar-light::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover,
.custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>