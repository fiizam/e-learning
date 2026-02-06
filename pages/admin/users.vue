<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  Plus, Search, Trash2, Edit, Mail, Filter, 
  Loader2, CheckCircle2, AlertCircle, X 
} from 'lucide-vue-next';
import { useSupabaseClient } from '#imports';
import { useToastStore } from '~/stores/toast';

definePageMeta({ layout: 'admin' });

const supabase = useSupabaseClient();
const toast = useToastStore();

const users = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const searchQuery = ref('');
const activeTab = ref('all');
const showModal = ref(false);

// Form State
const newUser = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'student'
});

// --- FETCH DATA (READ) ---
const fetchUsers = async () => {
  isLoading.value = true;
  // Ambil data dari tabel profiles, urutkan dari yang terbaru
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    toast.add({ type: 'error', title: 'Gagal', message: 'Gagal memuat data user.' });
  } else {
    users.value = data || [];
  }
  isLoading.value = false;
};

onMounted(fetchUsers);

// --- COMPUTED FILTER ---
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const search = searchQuery.value.toLowerCase();
    const fullName = user.full_name ? user.full_name.toLowerCase() : '';
    const email = user.email ? user.email.toLowerCase() : ''; // Note: Tabel profiles harusnya punya email jika disinkron, atau kita join auth
    
    // Pencarian Basic
    const matchesSearch = fullName.includes(search);
    
    // Filter Tab
    const matchesRole = activeTab.value === 'all' ? true : user.role === activeTab.value;
    
    return matchesSearch && matchesRole;
  });
});

// --- ACTIONS (CREATE & DELETE) ---

const handleCreateUser = async () => {
  if (!newUser.value.email || !newUser.value.password || !newUser.value.firstName) {
    toast.add({ type: 'warning', title: 'Validasi', message: 'Mohon lengkapi semua data wajib.' });
    return;
  }

  isSubmitting.value = true;
  const fullName = `${newUser.value.firstName} ${newUser.value.lastName}`.trim();

  // 1. Daftar ke Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: newUser.value.email,
    password: newUser.value.password,
    options: {
      data: {
        full_name: fullName,
        role: newUser.value.role
      }
    }
  });

  if (error) {
    toast.add({ type: 'error', title: 'Gagal Daftar', message: error.message });
  } else {
    // 2. Manual Update Profile (Opsional, trigger SQL biasanya sudah menangani ini)
    // Kita pastikan role terupdate
    if (data.user) {
      await supabase.from('profiles').update({ 
        role: newUser.value.role,
        full_name: fullName
      }).eq('id', data.user.id);
    }

    toast.add({ type: 'success', title: 'Berhasil', message: `User ${fullName} berhasil ditambahkan.` });
    showModal.value = false;
    
    // Reset Form
    newUser.value = { email: '', password: '', firstName: '', lastName: '', role: 'student' };
    
    // Refresh Table
    await fetchUsers(); 
  }
  isSubmitting.value = false;
};

const handleDeleteUser = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan.')) return;

  const { error } = await supabase.from('profiles').delete().eq('id', id);

  if (error) {
    toast.add({ type: 'error', title: 'Gagal Hapus', message: error.message });
  } else {
    toast.add({ type: 'success', title: 'Terhapus', message: 'Data pengguna telah dihapus.' });
    fetchUsers(); // Refresh UI
  }
};

// Helper UI
const getRoleBadge = (role) => {
  switch(role) {
    case 'admin': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'teacher': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'student': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};
</script>

<template>
  <div class="space-y-6 animate-fade-in-up">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Data Pengguna</h1>
        <p class="text-slate-500 text-sm">Kelola akun siswa, guru, dan administrator.</p>
      </div>
      <button @click="showModal = true" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition flex items-center gap-2">
        <Plus :size="18" /> Tambah User
      </button>
    </div>

    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between">
      <div class="flex p-1 bg-slate-100 rounded-xl overflow-x-auto">
        <button 
          v-for="tab in ['all', 'student', 'teacher', 'admin']" 
          :key="tab"
          @click="activeTab = tab"
          class="px-5 py-2 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap"
          :class="activeTab === tab ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'"
        >
          {{ tab === 'all' ? 'Semua User' : tab }}
        </button>
      </div>

      <div class="relative w-full md:w-72">
        <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari nama pengguna..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition text-sm font-medium"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div v-if="isLoading" class="p-12 flex justify-center text-indigo-600">
        <Loader2 class="animate-spin" :size="32" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th class="p-5">Profil</th>
              <th class="p-5">Role</th>
              <th class="p-5">Kelas</th>
              <th class="p-5">Terdaftar</th>
              <th class="p-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/80 transition-colors group">
              <td class="p-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200 overflow-hidden">
                    <img v-if="user.avatar_url" :src="user.avatar_url" class="w-full h-full object-cover" />
                    <span v-else>{{ user.full_name?.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800">{{ user.full_name }}</p>
                    <p class="text-xs text-slate-500 font-mono" v-if="user.nisn">NISN: {{ user.nisn }}</p>
                  </div>
                </div>
              </td>
              <td class="p-5">
                <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border" :class="getRoleBadge(user.role)">
                  {{ user.role }}
                </span>
              </td>
              <td class="p-5">
                <span class="text-slate-600 font-medium">{{ user.class_name || '-' }}</span>
              </td>
              <td class="p-5 text-slate-500 text-xs">
                {{ new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </td>
              <td class="p-5 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="handleDeleteUser(user.id)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Hapus User">
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!isLoading && filteredUsers.length === 0" class="p-10 text-center">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Filter :size="24" />
        </div>
        <h3 class="text-slate-800 font-bold">Tidak ada data</h3>
        <p class="text-slate-500 text-sm mt-1">Belum ada user yang sesuai dengan filter Anda.</p>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 transition-all">
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="font-bold text-slate-800">Tambah Pengguna Baru</h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-600"><X :size="20" /></button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1.5">Nama Depan</label>
              <input v-model="newUser.firstName" type="text" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Budi" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1.5">Nama Belakang</label>
              <input v-model="newUser.lastName" type="text" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Santoso" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1.5">Email (Username)</label>
            <div class="relative">
              <Mail :size="16" class="absolute left-3 top-3 text-slate-400" />
              <input v-model="newUser.email" type="email" class="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="nama@sekolah.id" />
            </div>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-600 mb-1.5">Password Awal</label>
             <input v-model="newUser.password" type="password" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Minimal 6 karakter" />
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-600 mb-1.5">Role (Peran)</label>
             <select v-model="newUser.role" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
               <option value="student">Siswa (Murid)</option>
               <option value="teacher">Guru (Pengajar)</option>
               <option value="admin">Administrator</option>
             </select>
          </div>
        </div>

        <div class="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
          <button @click="showModal = false" class="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl text-sm transition">Batal</button>
          <button 
            @click="handleCreateUser" 
            :disabled="isSubmitting"
            class="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2 text-sm transition"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin" :size="16" />
            {{ isSubmitting ? 'Menyimpan...' : 'Simpan User' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
</style>