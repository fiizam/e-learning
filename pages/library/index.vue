<script setup>
import { ref, computed } from 'vue';
import { Search, Book, Bookmark, Filter, Star, Download, Eye } from 'lucide-vue-next';

useHead({
  title: 'Perpustakaan Digital - SMK 09 Learning Portal',
});

// --- DATA BUKU DUMMY ---
const books = ref([
  {
    id: 1,
    title: 'Mastering Laravel 10',
    author: 'Taylor Otwell',
    category: 'Pemrograman',
    rating: 4.8,
    views: 1240,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=450',
    type: 'E-Book'
  },
  {
    id: 2,
    title: 'Jaringan Komputer Dasar',
    author: 'Kementerian Pendidikan',
    category: 'Jaringan',
    rating: 4.5,
    views: 890,
    cover: 'https://images.unsplash.com/photo-1588912914074-ce633dcc5a85?auto=format&fit=crop&q=80&w=300&h=450',
    type: 'Modul'
  },
  {
    id: 3,
    title: 'English for IT Professionals',
    author: 'Oxford Press',
    category: 'Bahasa',
    rating: 4.7,
    views: 560,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300&h=450',
    type: 'E-Book'
  },
  {
    id: 4,
    title: 'Desain UI/UX Modern',
    author: 'Google Design Team',
    category: 'Desain',
    rating: 4.9,
    views: 2100,
    cover: 'https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?auto=format&fit=crop&q=80&w=300&h=450',
    type: 'Jurnal'
  },
  {
    id: 5,
    title: 'Kewirausahaan Era Digital',
    author: 'Dr. Rhenald Kasali',
    category: 'Bisnis',
    rating: 4.6,
    views: 780,
    cover: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&q=80&w=300&h=450',
    type: 'E-Book'
  }
]);

const searchQuery = ref('');
const selectedCategory = ref('Semua');
const categories = ['Semua', 'Pemrograman', 'Jaringan', 'Desain', 'Bahasa', 'Bisnis'];

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchSearch = book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCat = selectedCategory.value === 'Semua' || book.category === selectedCategory.value;
    return matchSearch && matchCat;
  });
});
</script>

<template>
  <div class="space-y-8 pb-12">
    
    <div class="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-3xl font-bold mb-4">Perpustakaan Digital</h1>
        <p class="text-indigo-100 mb-8 leading-relaxed">
          Akses ribuan koleksi buku, jurnal akademik, dan modul pembelajaran secara gratis untuk menunjang prestasimu.
        </p>
        
        <div class="flex items-center bg-white p-2 rounded-2xl shadow-lg">
          <Search :size="20" class="text-slate-400 ml-3" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari judul buku, pengarang, atau topik..." 
            class="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-700 placeholder:text-slate-400"
          />
          <button class="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition">
            Cari
          </button>
        </div>
      </div>
      
      <Book :size="300" class="absolute -right-12 -bottom-12 text-indigo-500 opacity-30 rotate-12" />
      <div class="absolute top-10 right-20 w-32 h-32 bg-indigo-400 rounded-full blur-3xl opacity-50"></div>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar-hide">
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="selectedCategory = cat"
        class="px-5 py-2.5 rounded-full text-sm font-bold border transition whitespace-nowrap"
        :class="selectedCategory === cat 
          ? 'bg-slate-800 text-white border-slate-800' 
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="filteredBooks.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div 
        v-for="book in filteredBooks" 
        :key="book.id"
        class="group bg-white rounded-2xl border border-slate-200 p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div class="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
          <img :src="book.cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
            {{ book.type }}
          </div>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <button class="bg-white text-slate-800 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-600">
              <Eye :size="14" /> Baca
            </button>
          </div>
        </div>

        <div class="px-1">
          <p class="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-1">{{ book.category }}</p>
          <h3 class="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2" :title="book.title">{{ book.title }}</h3>
          <p class="text-xs text-slate-500 mb-3">{{ book.author }}</p>
          
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <div class="flex items-center gap-1 text-amber-500">
              <Star :size="12" fill="currentColor" />
              <span class="text-xs font-bold text-slate-700">{{ book.rating }}</span>
            </div>
            <div class="text-[10px] text-slate-400 font-medium">
              {{ book.views }} dibaca
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <div class="inline-block p-4 bg-slate-50 rounded-full mb-4">
        <Book :size="32" class="text-slate-400" />
      </div>
      <h3 class="font-bold text-slate-700">Buku tidak ditemukan</h3>
      <p class="text-slate-500 text-sm">Coba cari dengan kata kunci lain.</p>
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
</style>