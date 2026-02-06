<script setup>
import { useToastStore } from '~/stores/toast';
import { 
  CheckCircle2, XCircle, AlertTriangle, Info, X 
} from 'lucide-vue-next';

const store = useToastStore();

// Helper untuk menentukan warna & icon berdasarkan tipe
const getToastStyle = (type) => {
  switch (type) {
    case 'success':
      return {
        container: 'bg-white border-l-4 border-emerald-500',
        iconBg: 'bg-emerald-100 text-emerald-600',
        title: 'text-emerald-800',
        icon: CheckCircle2
      };
    case 'error':
      return {
        container: 'bg-white border-l-4 border-rose-500',
        iconBg: 'bg-rose-100 text-rose-600',
        title: 'text-rose-800',
        icon: XCircle
      };
    case 'warning':
      return {
        container: 'bg-white border-l-4 border-amber-500',
        iconBg: 'bg-amber-100 text-amber-600',
        title: 'text-amber-800',
        icon: AlertTriangle
      };
    default: // info
      return {
        container: 'bg-white border-l-4 border-indigo-500',
        iconBg: 'bg-indigo-100 text-indigo-600',
        title: 'text-indigo-800',
        icon: Info
      };
  }
};
</script>

<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 md:px-0">
    
    <TransitionGroup 
      name="toast" 
      tag="div" 
      class="flex flex-col gap-3"
    >
      <div 
        v-for="item in store.items" 
        :key="item.id"
        class="pointer-events-auto relative w-full rounded-xl shadow-lg shadow-slate-200 p-4 flex items-start gap-3 transition-all duration-300 overflow-hidden ring-1 ring-slate-100"
        :class="getToastStyle(item.type).container"
      >
        <div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center" :class="getToastStyle(item.type).iconBg">
          <component :is="getToastStyle(item.type).icon" :size="18" />
        </div>

        <div class="flex-1 pt-0.5">
          <h4 class="font-bold text-sm mb-0.5" :class="getToastStyle(item.type).title">{{ item.title }}</h4>
          <p class="text-xs text-slate-500 leading-relaxed font-medium">{{ item.message }}</p>
        </div>

        <button 
          @click="store.remove(item.id)" 
          class="shrink-0 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X :size="16" />
        </button>

        <div v-if="item.duration > 0" class="absolute bottom-0 left-0 h-0.5 bg-current opacity-20 animate-shrink" 
             :style="{ 
               width: '100%', 
               animationDuration: `${item.duration}ms`,
               color: item.type === 'success' ? '#10b981' : item.type === 'error' ? '#f43f5e' : item.type === 'warning' ? '#f59e0b' : '#6366f1' 
             }">
        </div>
      </div>
    </TransitionGroup>

  </div>
</template>

<style scoped>
/* Animasi Masuk & Keluar (Slide + Fade) */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

/* Animasi Progress Bar Berjalan */
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
.animate-shrink {
  animation-name: shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>