export type ProjectCategory =
  | "website"
  | "automation"
  | "crm"
  | "whatsapp"
  | "digital-presence"
  | "full-system";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";

export type CampaignType =
  | "whatsapp"
  | "email"
  | "sms"
  | "social"
  | "cold_call"
  | "referral";

export type CampaignGoal =
  | "lead_gen"
  | "retention"
  | "upsell"
  | "brand"
  | "other";

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type CampaignEventType =
  | "sent"
  | "delivered"
  | "read"
  | "replied"
  | "lead"
  | "sale"
  | "unsubscribe";

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
      campaigns: {
        Row: {
          id: string;
          name: string;
          type: CampaignType;
          target_audience: string | null;
          goal: CampaignGoal | null;
          message_template: string | null;
          start_date: string;
          end_date: string | null;
          status: CampaignStatus;
          budget: number | null;
          notes: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: CampaignType;
          target_audience?: string | null;
          goal?: CampaignGoal | null;
          message_template?: string | null;
          start_date: string;
          end_date?: string | null;
          status?: CampaignStatus;
          budget?: number | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<{
          name: string;
          type: CampaignType;
          target_audience: string | null;
          goal: CampaignGoal | null;
          message_template: string | null;
          start_date: string;
          end_date: string | null;
          status: CampaignStatus;
          budget: number | null;
          notes: string | null;
          created_by: string | null;
        }>;
        Relationships: [];
      };
      campaign_events: {
        Row: {
          id: string;
          campaign_id: string;
          event_type: CampaignEventType;
          contact_name: string | null;
          contact_phone: string | null;
          contact_email: string | null;
          source: string | null;
          metadata: Record<string, unknown> | null;
          occurred_at: string;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          event_type: CampaignEventType;
          contact_name?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;
          source?: string | null;
          metadata?: Record<string, unknown> | null;
          occurred_at?: string;
        };
        Update: Partial<{
          event_type: CampaignEventType;
          contact_name: string | null;
          contact_phone: string | null;
          contact_email: string | null;
          source: string | null;
          metadata: Record<string, unknown> | null;
          occurred_at: string;
        }>;
        Relationships: [];
      };
      campaign_snapshots: {
        Row: {
          id: string;
          campaign_id: string;
          snapshot_date: string;
          sent: number;
          delivered: number;
          read_count: number;
          replied: number;
          leads: number;
          sales: number;
          revenue: number;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          snapshot_date: string;
          sent?: number;
          delivered?: number;
          read_count?: number;
          replied?: number;
          leads?: number;
          sales?: number;
          revenue?: number;
        };
        Update: Partial<{
          campaign_id: string;
          snapshot_date: string;
          sent: number;
          delivered: number;
          read_count: number;
          replied: number;
          leads: number;
          sales: number;
          revenue: number;
        }>;
        Relationships: [];
      };
    };
    Views: {
      campaign_metrics: {
        Row: {
          id: string;
          name: string;
          type: string;
          status: string;
          start_date: string;
          end_date: string | null;
          budget: number | null;
          goal: string | null;
          target_audience: string | null;
          total_sent: number | null;
          total_replied: number | null;
          total_leads: number | null;
          total_sales: number | null;
          total_revenue: number | null;
          reply_rate: number | null;
          lead_rate: number | null;
          close_rate: number | null;
        };
        Relationships: [];
      };
    };
    Functions: { [K in never]: never };
    Enums: { [K in never]: never };
  };
}
