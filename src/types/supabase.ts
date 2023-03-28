export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      r_host_users: {
        Row: {
          host: number;
          id: number;
          uuid: string;
        };
        Insert: {
          host: number;
          id?: number;
          uuid: string;
        };
        Update: {
          host?: number;
          id?: number;
          uuid?: string;
        };
      };
      r_hosts: {
        Row: {
          created_at: string | null;
          host_slug: string;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          host_slug: string;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          host_slug?: string;
          id?: number;
        };
      };
      r_post: {
        Row: {
          content: string;
          title: string;
          id: number;
        };
        Insert: {
          content?: string;
          title?: string;
          id?: number;
        };
        Update: {
          content?: string;
          title?: string;
          id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {};
    Enums: {
      [_ in never]: never;
    };
  };
}
