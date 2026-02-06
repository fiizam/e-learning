<script setup>
import { Megaphone, Calendar, ChevronRight } from 'lucide-vue-next';

useHead({ title: 'Pengumuman Sekolah' });

const announcements = [
  { id: 1, title: 'Jadwal Libur Hari Raya Idul Fitri', date: '04 Mei 2024', tag: 'Akademik', color: 'bg-emerald-100 text-emerald-700', content: 'Diberitahukan kepada seluruh siswa bahwa kegiatan belajar mengajar diliburkan mulai tanggal...' },
  { id: 2, title: 'Pelaksanaan Ujian Tengah Semester (UTS)', date: '28 Apr 2024', tag: 'Ujian', color: 'bg-rose-100 text-rose-700', content: 'UTS Semester Genap akan dilaksanakan secara daring menggunakan sistem CBT...' },
  { id: 3, title: 'Pendaftaran Ekstrakurikuler Baru', date: '20 Apr 2024', tag: 'Kesiswaan', color: 'bg-indigo-100 text-indigo-700', content: 'Bagi siswa kelas X yang belum memilih ekskul, harap segera mendaftar...' },
];
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6 pb-12">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
        <Megaphone :size="24" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Papan Pengumuman</h1>
        <p class="text-slate-500 text-sm">Informasi terbaru seputar kegiatan sekolah.</p>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="item in announcements" :key="item.id" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div class="flex justify-between items-start mb-3">
          <span class="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider" :class="item.color">{{ item.tag }}</span>
          <div class="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Calendar :size="12" /> {{ item.date }}
          </div>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{{ item.title }}</h3>
        <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">{{ item.content }}</p>
        <div class="mt-4 pt-4 border-t border-slate-100 flex justify-end">
          <span class="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">Baca Selengkapnya <ChevronRight :size="14"/></span>
        </div>
      </div>
    </div>
  </div>
</template>