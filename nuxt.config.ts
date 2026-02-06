// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],

  // HAPUS konfigurasi manual postcss di sini.
  // Modul @nuxtjs/tailwindcss v3 akan mengurusnya otomatis.

  // Konfigurasi Supabase
  supabase: {
    redirect: false
  },

  app: {
    head: {
      title: 'SMK 09 Learning System',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  compatibilityDate: '2024-07-04',
  
  // TypeScript strict mode
  typescript: {
    strict: true
  }
})