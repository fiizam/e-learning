export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string | null
          class_name: string | null
          avatar_url: string | null
          created_at: string
          nisn: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string | null
          class_name?: string | null
          avatar_url?: string | null
          created_at?: string
          nisn?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string | null
          class_name?: string | null
          avatar_url?: string | null
          created_at?: string
          nisn?: string | null
        }
      }
      courses: {
        Row: {
          id: number
          title: string
          description: string | null
          teacher_id: string | null
          category: string | null
          cover_image: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          teacher_id?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          teacher_id?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
        }
      }
      // Tambahkan tabel lain jika diperlukan
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}