import { useAuthStore } from '~/stores/auth';
import { useSupabaseUser, navigateTo, defineNuxtRouteMiddleware } from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const authStore = useAuthStore();

  // 1. Refresh Profile jika user ada tapi profile kosong (Refresh Page)
  if (user.value && !authStore.profile) {
    await authStore.fetchProfile(user.value.id);
  }

  // 2. Jika belum login, tendang ke login
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login');
  }

  // 3. JIKA SUDAH LOGIN
  if (user.value) {
    const role = authStore.profile?.role;

    // A. User login mencoba akses halaman Login
    if (to.path === '/login') {
      if (role === 'admin') return navigateTo('/admin/dashboard');
      return navigateTo('/');
    }

    // B. PROTEKSI HALAMAN ADMIN (Hanya boleh Admin)
    if (to.path.startsWith('/admin') && role !== 'admin') {
      return navigateTo('/'); 
    }

    // C. PROTEKSI HALAMAN ROOT/SISWA (Admin diarahkan ke Dashboard Admin)
    // Jika Admin akses '/' (Dashboard Siswa), paksa ke '/admin/dashboard'
    if (to.path === '/' && role === 'admin') {
      return navigateTo('/admin/dashboard');
    }
  }
});