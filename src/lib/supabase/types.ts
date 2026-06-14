export type ProjectCategory =
  | "website"
  | "automation"
  | "crm"
  | "whatsapp"
  | "digital-presence"
  | "full-system";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";

export type BusinessLeadStatus =
  | "new"
  | "qualified"
  | "contacted"
  | "follow_up"
  | "won"
  | "lost";

export type TouchpointChannel =
  | "whatsapp"
  | "email"
  | "phone"
  | "linkedin"
  | "manual"
  | "pdf";

export type TouchpointStatus = "draft" | "sent" | "opened" | "replied";

export type UserRole = "owner" | "admin" | "editor";

export interface BusinessLead {
  id: string;
  name: string;
  category: string | null;
  address: string | null;
  city: string | null;
  country: string;
  phone: string | null;
  website: string | null;
  google_maps_url: string | null;
  place_id: string | null;
  google_rating: number | null;
  review_count: number | null;
  has_website: boolean;
  score: number;
  score_reasons: string[] | null;
  status: BusinessLeadStatus;
  search_query: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadAudit {
  id: string;
  lead_id: string;
  audited_at: string;
  http_status: number | null;
  is_https: boolean | null;
  redirects_to_https: boolean | null;
  page_title: string | null;
  meta_description: string | null;
  has_favicon: boolean | null;
  load_speed_ms: number | null;
  mobile_friendly: boolean | null;
  has_cta: boolean | null;
  has_contact_form: boolean | null;
  has_phone: boolean | null;
  social_links: string[] | null;
  raw: Record<string, unknown> | null;
  audit_score_delta: number;
}

export interface LeadTouchpoint {
  id: string;
  lead_id: string;
  touch_number: number;
  channel: TouchpointChannel | null;
  status: TouchpointStatus;
  content: string | null;
  notes: string | null;
  reminder_date: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface LeadReport {
  id: string;
  lead_id: string;
  content: ReportContent;
  created_at: string;
}

export interface ReportContent {
  business_name: string;
  website: string | null;
  score: number;
  score_reasons: string[];
  tips: ReportTip[];
  generated_at: string;
}

export interface ReportTip {
  category: string;
  title: string;
  body: string;
}

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
          privacy_policy_accepted: boolean;
          consent_to_contact: boolean;
          marketing_consent: boolean;
          privacy_policy_version: string | null;
          source_page: string | null;
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
          privacy_policy_accepted?: boolean;
          consent_to_contact?: boolean;
          marketing_consent?: boolean;
          privacy_policy_version?: string | null;
          source_page?: string | null;
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
          privacy_policy_accepted?: boolean;
          consent_to_contact?: boolean;
          marketing_consent?: boolean;
          privacy_policy_version?: string | null;
          source_page?: string | null;
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
      business_leads: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          address: string | null;
          city: string | null;
          country: string;
          phone: string | null;
          website: string | null;
          google_maps_url: string | null;
          place_id: string | null;
          google_rating: number | null;
          review_count: number | null;
          has_website: boolean;
          score: number;
          score_reasons: string[] | null;
          status: BusinessLeadStatus;
          search_query: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string;
          phone?: string | null;
          website?: string | null;
          google_maps_url?: string | null;
          place_id?: string | null;
          google_rating?: number | null;
          review_count?: number | null;
          has_website?: boolean;
          score?: number;
          score_reasons?: string[] | null;
          status?: BusinessLeadStatus;
          search_query?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          category?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string;
          phone?: string | null;
          website?: string | null;
          google_maps_url?: string | null;
          place_id?: string | null;
          google_rating?: number | null;
          review_count?: number | null;
          has_website?: boolean;
          score?: number;
          score_reasons?: string[] | null;
          status?: BusinessLeadStatus;
          search_query?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      lead_audits: {
        Row: {
          id: string;
          lead_id: string;
          audited_at: string;
          http_status: number | null;
          is_https: boolean | null;
          redirects_to_https: boolean | null;
          page_title: string | null;
          meta_description: string | null;
          has_favicon: boolean | null;
          load_speed_ms: number | null;
          mobile_friendly: boolean | null;
          has_cta: boolean | null;
          has_contact_form: boolean | null;
          has_phone: boolean | null;
          social_links: string[] | null;
          raw: Record<string, unknown> | null;
          audit_score_delta: number;
        };
        Insert: {
          id?: string;
          lead_id: string;
          audited_at?: string;
          http_status?: number | null;
          is_https?: boolean | null;
          redirects_to_https?: boolean | null;
          page_title?: string | null;
          meta_description?: string | null;
          has_favicon?: boolean | null;
          load_speed_ms?: number | null;
          mobile_friendly?: boolean | null;
          has_cta?: boolean | null;
          has_contact_form?: boolean | null;
          has_phone?: boolean | null;
          social_links?: string[] | null;
          raw?: Record<string, unknown> | null;
          audit_score_delta?: number;
        };
        Update: {
          http_status?: number | null;
          is_https?: boolean | null;
          redirects_to_https?: boolean | null;
          page_title?: string | null;
          meta_description?: string | null;
          has_favicon?: boolean | null;
          load_speed_ms?: number | null;
          mobile_friendly?: boolean | null;
          has_cta?: boolean | null;
          has_contact_form?: boolean | null;
          has_phone?: boolean | null;
          social_links?: string[] | null;
          raw?: Record<string, unknown> | null;
          audit_score_delta?: number;
        };
        Relationships: [];
      };
      lead_touchpoints: {
        Row: {
          id: string;
          lead_id: string;
          touch_number: number;
          channel: TouchpointChannel | null;
          status: TouchpointStatus;
          content: string | null;
          notes: string | null;
          reminder_date: string | null;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          touch_number: number;
          channel?: TouchpointChannel | null;
          status?: TouchpointStatus;
          content?: string | null;
          notes?: string | null;
          reminder_date?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          channel?: TouchpointChannel | null;
          status?: TouchpointStatus;
          content?: string | null;
          notes?: string | null;
          reminder_date?: string | null;
          sent_at?: string | null;
        };
        Relationships: [];
      };
      lead_reports: {
        Row: {
          id: string;
          lead_id: string;
          content: ReportContent;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          content: ReportContent;
          created_at?: string;
        };
        Update: {
          content?: ReportContent;
        };
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
