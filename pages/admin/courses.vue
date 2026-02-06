<script setup>
import { ref, onMounted } from 'vue';
import { 
  BookOpen, MoreHorizontal, Plus, Users, 
  Clock, Trash2, X, Loader2 
} from 'lucide-vue-next';
import { useSupabaseClient } from '#imports';
import { useToastStore } from '~/stores/toast';

definePageMeta({ layout: 'admin' });

const supabase = useSupabaseClient();
const toast = useToastStore();

const courses = ref([]);
const teachers = ref([]); // Data untuk dropdown
const isLoading = ref(true);
const showModal = ref(false);
const isSubmitting = ref(false);

const newCourse = ref({
  title: '',
  description: '',
  teacher_id: '',
  category: 'Umum',
  color: 'bg-indigo-500' // Default color
});

// Pilihan warna cover
const colorOptions = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 
  'bg-sky-500', 'bg-purple-500', 'bg-slate-600'
];

// --- FETCH DATA ---
const fetchData = async () => {
  isLoading.value = true;
  
  // 1. Ambil Courses + Nama Guru (Join)
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select(`
      *,
      profiles:teacher_id (full_name)
    `)
    .order('created_at', { ascending: false });

  if (coursesData) courses.value = coursesData;

  // 2. Ambil List Guru untuk Dropdown
  const { data: teachersData } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'teacher');
    
  if (teachersData) teachers.value = teachersData;
  
  isLoading.value = false;
};

onMounted(fetchData);

// --- ACTIONS ---
const handleCreateCourse = async () => {
  if (!newCourse.value.title || !newCourse.value.teacher_id) {
    toast.add({ type: 'warning', title: 'Validasi', message: 'Judul dan Guru Pengampu wajib diisi.' });
    return;
  }

  isSubmitting.value = true;
  
  const { error } = await supabase.from('courses').insert({
    title: newCourse.value.title,
    description: newCourse.value.description,
    teacher_id: newCourse.value.teacher_id,
    category: newCourse.value.category,
    cover_image: newCourse.value.color // Kita simpan class warna di kolom cover_image sementara
  });

  if (error) {
    toast.add({ type: 'error', title: 'Gagal', message: error.message });
  } else {
    toast.add({ type: 'success', title: 'Berhasil', message: 'Mata pelajaran berhasil dibuat.' });
    showModal.value = false;
    newCourse.value = { title: '', description: '', teacher_id: '', category: 'Umum', color: 'bg-indigo-500' };
    fetchData(); // Refresh list
  }
  isSubmitting.value = false;
};

const handleDeleteCourse = async (id) => {
  if (!confirm('Hapus mapel ini? Semua materi di dalamnya juga akan terhapus.')) return;
  
  const { error } = await supabase.from('courses').delete().eq('id', id);
  
  if (error) {
    toast.add({ type: 'error', title: 'Gagal', message: error.message });
  } else {
    toast.add({ type: 'success', title: 'Terhapus', message: 'Mata pelajaran dihapus.' });
    fetchData();
  }
};
</script>

<template>
  <div class="space-y-6 animate-fade-in-up">
    
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Manajemen Mapel</h1>
        <p class="text-slate-500 text-sm">Kelola mata pelajaran dan modul pembelajaran.</p>
      </div>
      <button @click="showModal = true" class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2">
        <Plus :size="18" /> Buat Mapel Baru
      </button>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <Loader2 class="animate-spin text-indigo-600" :size="40" />
    </div>

    <div v-else-if="courses.length === 0" class="p-10 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <BookOpen :size="24" />
      </div>
      <h3 class="font-bold text-slate-800">Belum ada Mapel</h3>
      <p class="text-slate-500 text-sm mb-4">Silakan buat mata pelajaran pertama Anda.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div 
        v-for="course in courses" 
        :key="course.id"
        class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
      >
        <div class="h-32 relative" :class="course.cover_image || 'bg-slate-500'">
          <div class="absolute inset-0 bg-black/10"></div>
          
          <button @click="handleDeleteCourse(course.id)" class="absolute top-3 right-3 bg-white/20 hover:bg-rose-500 hover:text-white backdrop-blur-md rounded-lg p-1.5 text-white transition z-20">
            <Trash2 :size="16" />
          </button>

          <div class="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-700 z-10 border border-slate-100">
             <BookOpen :size="24" class="text-indigo-600" />
          </div>
        </div>

        <div class="pt-8 pb-6 px-6 flex-1 flex flex-col">
          <div class="flex-1">
            <div class="flex justify-between items-start mb-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-emerald-700">
                Aktif
              </span>
              <span class="text-xs font-bold text-slate-400">{{ course.category || 'Umum' }}</span>
            </div>
            
            <h3 class="font-bold text-lg text-slate-800 mb-1 line-clamp-2 leading-tight" :title="course.title">
              {{ course.title }}
            </h3>
            <p class="text-sm text-slate-500 mb-4 line-clamp-2">{{ course.description || 'Tidak ada deskripsi.' }}</p>
          </div>

          <div class="pt-4 border-t border-slate-100 mt-2">
             <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Pengajar</p>
             <div class="flex items-center gap-2">
               <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                 {{ course.profiles?.full_name?.charAt(0) || '?' }}
               </div>
               <span class="text-sm font-bold text-slate-700">{{ course.profiles?.full_name || 'Belum ada guru' }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="font-bold text-slate-800">Buat Mapel Baru</h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-600"><X :size="20" /></button>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1.5">Judul Mata Pelajaran</label>
            <input v-model="newCourse.title" type="text" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Contoh: Matematika Wajib" />
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-600 mb-1.5">Deskripsi Singkat</label>
             <textarea v-model="newCourse.description" rows="2" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Deskripsi materi..."></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
               <label class="block text-xs font-bold text-slate-600 mb-1.5">Kategori</label>
               <select v-model="newCourse.category" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option>Muatan Nasional</option>
                 <option>Muatan Kewilayahan</option>
                 <option>Produktif TKJ</option>
                 <option>Produktif RPL</option>
               </select>
            </div>
            <div>
               <label class="block text-xs font-bold text-slate-600 mb-1.5">Guru Pengampu</label>
               <select v-model="newCourse.teacher_id" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option disabled value="">Pilih Guru</option>
                 <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.full_name }}</option>
               </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-2">Warna Sampul</label>
            <div class="flex gap-2">
              <button 
                v-for="color in colorOptions" 
                :key="color"
                @click="newCourse.color = color"
                class="w-8 h-8 rounded-full border-2 transition-all"
                :class="[color, newCourse.color === color ? 'border-slate-800 scale-110 shadow-md' : 'border-transparent opacity-70']"
              ></button>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
          <button @click="showModal = false" class="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl text-sm transition">Batal</button>
          <button 
            @click="handleCreateCourse" 
            :disabled="isSubmitting"
            class="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2 text-sm transition"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin" :size="16" />
            {{ isSubmitting ? 'Memproses...' : 'Buat Mapel' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>