import { defineStore } from 'pinia';
// IMPORT EKSPLISIT
import { useSupabaseClient, useSupabaseUser, navigateTo } from '#imports';

interface UserProfile {
  id: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
  class_name?: string;
  avatar_url?: string;
}

interface AuthState {
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    profile: null,
    isLoading: false
  }),
  
  actions: {
    // Fungsi Login
    async login(email: string, password: string) {
      const supabase = useSupabaseClient();
      this.isLoading = true;

      try {
        // 1. Login ke Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) throw error;
        if (!data.user) throw new Error("User tidak ditemukan di Auth.");

        // 2. FETCH PROFILE (Sangat Penting)
        // Kita paksa ambil data profile. Jika gagal, throw error.
        await this.fetchProfile(data.user.id);

        if (!this.profile) {
           throw new Error("Data Profil (Role) tidak ditemukan di Database. Pastikan Admin sudah mendaftarkan user ini di tabel Profiles.");
        }
        
        return { success: true };
      } catch (error: any) {
        let msg = error.message || 'Terjadi kesalahan saat login.';
        if (msg.includes('Invalid login credentials')) {
          msg = 'Email atau password salah.';
        }
        return { success: false, message: msg };
      } finally {
        this.isLoading = false;
      }
    },

    // Ambil Data Profil
    async fetchProfile(userId: string) {
      const supabase = useSupabaseClient();
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (error) {
          console.error("Error fetch profile:", error.message);
          return;
        }

        if (data) {
          this.profile = data as UserProfile;
          const supabaseUser = useSupabaseUser();
          this.user = supabaseUser.value;
        }
      } catch (err) {
        console.error("Fetch profile failed", err);
      }
    },

    // Logout
    async logout() {
      const supabase = useSupabaseClient();
      await supabase.auth.signOut();
      
      this.user = null;
      this.profile = null;
      return navigateTo('/login');
    },
    
    // Cek Sesi
    async checkSession() {
      const user = useSupabaseUser();
      if (user.value) {
        await this.fetchProfile(user.value.id);
      }
    }
  }
});