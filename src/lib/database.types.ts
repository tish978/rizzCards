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
      pickup_lines: {
        Row: {
          id: string
          created_at: string
          text: string
          category: string
          difficulty: 'easy' | 'medium' | 'hard' | null
          style: string | null
          tags: string[] | null
          user_id: string | null
          likes_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          text: string
          category: string
          difficulty?: 'easy' | 'medium' | 'hard' | null
          style?: string | null
          tags?: string[] | null
          user_id?: string | null
          likes_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          text?: string
          category?: string
          difficulty?: 'easy' | 'medium' | 'hard' | null
          style?: string | null
          tags?: string[] | null
          user_id?: string | null
          likes_count?: number
        }
      }
      user_likes: {
        Row: {
          user_id: string
          pickup_line_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          pickup_line_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          pickup_line_id?: string
          created_at?: string
        }
      }
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