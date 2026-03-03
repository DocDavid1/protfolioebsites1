export type ProjectCategory =
  | "website"
  | "automation"
  | "crm"
  | "whatsapp"
  | "digital-presence"
  | "full-system";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          client: string | null;
          website_url: string;
          category: ProjectCategory | null;
          description: string | null;
          full_description: string | null;
          tags: string[] | null;
          preview_image_path: string | null;
          results: string[] | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          client?: string | null;
          website_url: string;
          category?: ProjectCategory | null;
          description?: string | null;
          full_description?: string | null;
          tags?: string[] | null;
          preview_image_path?: string | null;
          results?: string[] | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          client?: string | null;
          website_url?: string;
          category?: ProjectCategory | null;
          description?: string | null;
          full_description?: string | null;
          tags?: string[] | null;
          preview_image_path?: string | null;
          results?: string[] | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          email: string | null;
          business: string | null;
          service: string | null;
          message: string | null;
          source: string | null;
          status: LeadStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          business?: string | null;
          service?: string | null;
          message?: string | null;
          source?: string | null;
          status?: LeadStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          business?: string | null;
          service?: string | null;
          message?: string | null;
          source?: string | null;
          status?: LeadStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          is_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          meta: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          meta?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action?: string;
          meta?: Record<string, unknown> | null;
          created_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [K in never]: never };
    Functions: { [K in never]: never };
    Enums: { [K in never]: never };
  };
}
