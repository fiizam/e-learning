<script setup>
defineProps(['error']);

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-4 font-sans">
    <div class="text-center max-w-lg">
      
      <div class="text-9xl font-black text-indigo-100 select-none mb-4">
        404
      </div>
      
      <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative -mt-16 z-10">
        <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        </div>

        <h1 class="text-2xl font-bold text-slate-800 mb-2">Halaman Tidak Ditemukan</h1>
        <p class="text-slate-500 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau link yang Anda tuju salah.
        </p>

        <button 
          @click="handleError"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          Kembali ke Dashboard
        </button>
      </div>
      
      <p class="mt-8 text-xs text-slate-400 font-medium">SMK Negeri 09 Learning System</p>
    </div>
  </div>
</template>