<script setup>
import { ref } from 'vue';
import { 
  LayoutDashboard, Users, BookOpen, LogOut, 
  Settings, ChevronRight, GraduationCap, Layers,
  Bell, Search, Menu, Heart, Code
} from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isSidebarOpen = ref(false);

// Fungsi Logout
const handleLogout = () => authStore.logout();

// Menu Items Configuration
const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/admin/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    title: 'Data Pengguna', 
    path: '/admin/users', 
    icon: Users 
  },
  { 
    title: 'Manajemen Mapel', 
    path: '/admin/courses', 
    icon: BookOpen 
  },
  { 
    title: 'Kelas & Jadwal', 
    path: '/admin/classes', 
    icon: GraduationCap 
  },
  { 
    title: 'Pengaturan Sistem', 
    path: '/admin/settings', 
    icon: Settings 
  },
];
</script>

<template>
  <div class="flex h-screen bg-slate-50 font-sans overflow-hidden">
    
    <aside 
      @mouseenter="isSidebarOpen = true"
      @mouseleave="isSidebarOpen = false"
      class="h-screen bg-slate-900 text-slate-300 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative z-50 shadow-2xl"
      :class="isSidebarOpen ? 'w-72' : 'w-20'"
    >
      
      <div class="h-20 flex items-center justify-center border-b border-slate-800/50 relative overflow-hidden shrink-0">
        <div class="flex items-center gap-3 transition-all duration-300" :class="isSidebarOpen ? 'px-6 w-full justify-start' : 'justify-center'">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-900/50">
            <Layers :size="24" />
          </div>
          
          <div 
            class="whitespace-nowrap overflow-hidden transition-all duration-300 origin-left"
            :class="isSidebarOpen ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0'"
          >
            <h1 class="font-bold text-lg text-white tracking-tight leading-none">SMK 09</h1>
            <p class="text-[10px] font-bold text-indigo-400 tracking-widest uppercase mt-1">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        
        <p 
          class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 transition-opacity duration-300 whitespace-nowrap"
          :class="isSidebarOpen ? 'opacity-100 delay-100' : 'opacity-0 hidden'"
        >
          Main Menu
        </p>

        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          class="group flex items-center gap-3 px-3 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden"
          active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
          :class="!$route.path.startsWith(item.path) ? 'hover:bg-slate-800 hover:text-white' : ''"
        >
          <div class="shrink-0 transition-transform duration-300 group-hover:scale-110 flex justify-center w-6">
            <component :is="item.icon" :size="22" stroke-width="2" />
          </div>

          <span 
            class="font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300"
            :class="isSidebarOpen ? 'opacity-100 translate-x-0 max-w-[200px]' : 'opacity-0 -translate-x-4 max-w-0'"
          >
            {{ item.title }}
          </span>

          <div 
            v-if="!isSidebarOpen"
            class="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]"
          >
            {{ item.title }}
            <div class="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-slate-800"></div>
          </div>

          <ChevronRight 
            v-if="isSidebarOpen && $route.path === item.path" 
            :size="16" 
            class="ml-auto opacity-100 transition-opacity duration-300 animate-pulse"
          />
        </NuxtLink>
      </nav>

      <div class="p-3 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shrink-0">
        <div 
          class="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all duration-300"
          :class="isSidebarOpen ? 'justify-start' : 'justify-center'"
        >
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shrink-0 shadow-md">
            <div class="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span class="font-bold text-xs text-white">
                {{ authStore.profile?.full_name?.charAt(0) || 'A' }}
              </span>
            </div>
          </div>

          <div 
            class="flex-1 overflow-hidden transition-all duration-300 flex items-center justify-between"
            :class="isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'"
          >
            <div class="min-w-0">
              <p class="text-xs font-bold text-white truncate max-w-[100px]">
                {{ authStore.profile?.full_name?.split(' ')[0] || 'Admin' }}
              </p>
              <p class="text-[10px] text-slate-400 uppercase tracking-wider">Super Admin</p>
            </div>
            
            <button 
              @click="handleLogout"
              class="p-1.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-lg transition-colors"
              title="Keluar"
            >
              <LogOut :size="16" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
        
        <div>
          <h2 class="text-xl font-bold text-slate-800 tracking-tight">
            Dashboard
          </h2>
          <p class="text-xs text-slate-500 mt-0.5 font-medium">Overview & Statistik Sekolah</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative hidden md:block">
            <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari data..." 
              class="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all w-64"
            />
          </div>

          <button class="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all">
            <Bell :size="20" />
            <span class="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto scroll-smooth flex flex-col">
        <div class="flex-1 p-8">
          <div class="max-w-7xl mx-auto">
            <slot />
          </div>
        </div>

        <footer class="py-6 px-8 border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto">
          <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
                <Code :size="16" />
              </span>
              <p class="text-sm text-slate-500 font-medium">
                &copy; 2025 <span class="text-slate-800 font-bold">SMK Negeri 09</span> System.
              </p>
            </div>

            <div class="flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <span>Created with</span>
              <Heart :size="14" class="text-rose-500 fill-rose-500 animate-pulse" />
              <span>by</span>
              <a href="https://x.com/phyzam_me" class="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md font-bold hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm">
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
/* Scrollbar Kustom untuk Sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155; /* Slate-700 */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569; /* Slate-600 */
}
</style>