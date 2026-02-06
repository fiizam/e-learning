<script setup>
import { ref } from 'vue';
import { 
  GraduationCap, Calendar, Clock, ChevronDown, 
  MapPin, Users, Edit3 
} from 'lucide-vue-next';

definePageMeta({ layout: 'admin' });

// Dummy Data Kelas
const classes = ref([
  { 
    id: 'X-TKJ-1', name: 'X TKJ 1', major: 'Teknik Komputer Jaringan', 
    students: 34, homeroom: 'Pak Wahyu', room: 'Lab Jaringan A', expanded: true 
  },
  { 
    id: 'XI-RPL-2', name: 'XI RPL 2', major: 'Rekayasa Perangkat Lunak', 
    students: 32, homeroom: 'Bu Ningsih', room: 'Lab Coding 1', expanded: false 
  }
]);

// Dummy Jadwal
const schedules = [
  { day: 'Senin', time: '07:00 - 08:30', subject: 'Upacara Bendera', teacher: '-', type: 'general' },
  { day: 'Senin', time: '08:30 - 10:00', subject: 'Matematika', teacher: 'Bu Rina', type: 'lesson' },
  { day: 'Senin', time: '10:00 - 10:30', subject: 'Istirahat', teacher: '-', type: 'break' },
  { day: 'Senin', time: '10:30 - 12:00', subject: 'Bahasa Indonesia', teacher: 'Pak Joko', type: 'lesson' },
];

const toggleExpand = (id) => {
  const cls = classes.value.find(c => c.id === id);
  if(cls) cls.expanded = !cls.expanded;
};
</script>

<template>
  <div class="space-y-6 animate-fade-in-up">
    
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Kelas & Jadwal</h1>
        <p class="text-slate-500 text-sm">Atur rombongan belajar dan jadwal pelajaran.</p>
      </div>
      <div class="flex gap-2">
        <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50">
          Kelola Rombel
        </button>
        <button class="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
          Buat Jadwal
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div 
        v-for="cls in classes" 
        :key="cls.id"
        class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
      >
        <div 
          @click="toggleExpand(cls.id)"
          class="p-5 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
              {{ cls.name.split(' ')[0] }}
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-lg">{{ cls.name }}</h3>
              <p class="text-xs text-slate-500 font-medium">{{ cls.major }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 text-sm text-slate-600">
            <div class="hidden md:flex items-center gap-2"><Users :size="16" /> {{ cls.students }} Siswa</div>
            <div class="hidden md:flex items-center gap-2"><MapPin :size="16" /> {{ cls.room }}</div>
            <ChevronDown :size="20" class="transition-transform duration-300" :class="{ 'rotate-180': cls.expanded }" />
          </div>
        </div>

        <div v-show="cls.expanded" class="border-t border-slate-100 p-6 animate-fade-in-down">
          <div class="flex justify-between items-center mb-4">
            <h4 class="font-bold text-slate-700 flex items-center gap-2"><Calendar :size="18" /> Jadwal Pelajaran (Senin)</h4>
            <button class="text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1">
              <Edit3 :size="12" /> Edit Jadwal
            </button>
          </div>

          <div class="overflow-hidden rounded-xl border border-slate-200">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-3 w-32">Waktu</th>
                  <th class="p-3">Mata Pelajaran</th>
                  <th class="p-3">Guru</th>
                  <th class="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="(sch, i) in schedules" :key="i" class="bg-white hover:bg-slate-50">
                  <td class="p-3 font-mono text-slate-600 text-xs">{{ sch.time }}</td>
                  <td class="p-3 font-bold text-slate-800" :class="{'text-slate-400 italic': sch.type !== 'lesson'}">
                    {{ sch.subject }}
                  </td>
                  <td class="p-3 text-slate-600">{{ sch.teacher }}</td>
                  <td class="p-3 text-right">
                    <span v-if="sch.type === 'lesson'" class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span v-else class="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
.animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>