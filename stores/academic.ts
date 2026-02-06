import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAcademicStore = defineStore('academic', () => {
  // --- STATE (Data Siswa) ---
  const student = ref({
    name: 'Andi Saputra',
    nisn: '212210056',
    class: 'XII TKJ 2',
    // Avatar tetap menggunakan URL eksternal atau bisa diganti lokal juga
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
  })

  // --- STATE (Statistik) ---
  const stats = ref({
    completedCourses: 12,
    activeCourses: 4,
    assignments: 3,
    gpa: 88.5
  })

  // --- STATE (Daftar Mata Pelajaran) ---
  const courses = ref([
    {
      id: 1,
      title: 'Administrasi Infrastruktur Jaringan',
      teacher: 'Bpk. Hartono, S.Kom',
      category: 'Produktif TKJ',
      progress: 75,
      // Menggunakan gambar m1.jpg (Jaringan)
      thumbnail: '/images/aij.jpg', 
      lessons: [
        { title: 'Konsep VLAN', completed: true, duration: '15 Min' },
        { title: 'Konfigurasi Routing OSPF', completed: true, duration: '25 Min' },
        { title: 'Manajemen Bandwidth', completed: true, duration: '20 Min' },
        { title: 'Firewall & Keamanan', completed: false, duration: '30 Min' }
      ]
    },
    {
      id: 2,
      title: 'Pemrograman Web & Perangkat Bergerak',
      teacher: 'Ibu Ratna Sari, M.Pd',
      category: 'Produktif RPL',
      progress: 40,
      // Menggunakan gambar m2.jpg (Coding)
      thumbnail: '/images/web.jpg',
      lessons: [
        { title: 'HTML5 & Semantik', completed: true, duration: '10 Min' },
        { title: 'CSS3 Flexbox & Grid', completed: true, duration: '45 Min' },
        { title: 'Dasar Javascript', completed: false, duration: '30 Min' },
        { title: 'Vue.js Framework', completed: false, duration: '60 Min' }
      ]
    },
    {
      id: 3,
      title: 'Bahasa Inggris: Technical Terms',
      teacher: 'Ms. Jessica Lim',
      category: 'Umum',
      progress: 10,
      // Menggunakan gambar m3.jpg (English)
      thumbnail: '/images/english.jpg',
      lessons: [
        { title: 'Hardware Vocabulary', completed: true, duration: '15 Min' },
        { title: 'Writing Technical Reports', completed: false, duration: '20 Min' }
      ]
    }
  ])

  // --- ACTIONS (Fungsi Helper) ---
  function getCourseById(id: number) {
    return courses.value.find(c => c.id === id)
  }

  return { student, stats, courses, getCourseById }
})