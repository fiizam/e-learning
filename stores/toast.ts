import { defineStore } from 'pinia';

// 1. Definisi Tipe Data untuk Toast Item
export interface ToastItem {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

// 2. Definisi Tipe Data untuk State
interface ToastState {
  items: ToastItem[];
}

// 3. Definisi Tipe Data untuk Parameter Action 'add'
interface AddToastParams {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info'; // Optional, default 'info'
  duration?: number; // Optional, default 3000
}

export const useToastStore = defineStore('toast', {
  // Gunakan Interface State di sini
  state: (): ToastState => ({
    items: [] 
  }),
  
  actions: {
    // Tambahkan tipe data ': AddToastParams' di sini
    add({ title, message, type = 'info', duration = 3000 }: AddToastParams) {
      const id = Date.now() + Math.random(); // Unique ID
      
      this.items.push({
        id,
        title,
        message,
        type,
        duration
      });

      // Auto remove setelah durasi habis
      if (duration > 0) {
        setTimeout(() => {
          this.remove(id);
        }, duration);
      }
    },

    // Tambahkan tipe data ': number' pada id
    remove(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
    }
  }
});