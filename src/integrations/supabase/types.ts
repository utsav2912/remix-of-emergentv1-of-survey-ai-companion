export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      claims: {
        Row: {
          cause_of_loss: string | null
          compulsory_excess: number | null
          created_at: string
          id: string
          idv: number | null
          insurer: string | null
          loss_date: string | null
          nil_dep: boolean | null
          policy_number: string | null
          registration_number: string | null
          status: string
          updated_at: string
          user_id: string
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_year: number | null
          voluntary_excess: number | null
        }
        Insert: {
          cause_of_loss?: string | null
          compulsory_excess?: number | null
          created_at?: string
          id?: string
          idv?: number | null
          insurer?: string | null
          loss_date?: string | null
          nil_dep?: boolean | null
          policy_number?: string | null
          registration_number?: string | null
          status?: string
          updated_at?: string
          user_id: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
          voluntary_excess?: number | null
        }
        Update: {
          cause_of_loss?: string | null
          compulsory_excess?: number | null
          created_at?: string
          id?: string
          idv?: number | null
          insurer?: string | null
          loss_date?: string | null
          nil_dep?: boolean | null
          policy_number?: string | null
          registration_number?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
          voluntary_excess?: number | null
        }
        Relationships: []
      }
      labour_lines: {
        Row: {
          amount: number | null
          claim_id: string
          created_at: string
          description: string | null
          id: string
        }
        Insert: {
          amount?: number | null
          claim_id: string
          created_at?: string
          description?: string | null
          id?: string
        }
        Update: {
          amount?: number | null
          claim_id?: string
          created_at?: string
          description?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "labour_lines_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      parts_lines: {
        Row: {
          claim_id: string
          created_at: string
          depreciation_pct: number | null
          id: string
          net_amount: number | null
          part_category: string | null
          part_name: string | null
          qty: number | null
          repair_replace: string | null
          source: string | null
          unit_rate: number | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          depreciation_pct?: number | null
          id?: string
          net_amount?: number | null
          part_category?: string | null
          part_name?: string | null
          qty?: number | null
          repair_replace?: string | null
          source?: string | null
          unit_rate?: number | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          depreciation_pct?: number | null
          id?: string
          net_amount?: number | null
          part_category?: string | null
          part_name?: string | null
          qty?: number | null
          repair_replace?: string | null
          source?: string | null
          unit_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_lines_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          captured_at: string | null
          claim_id: string
          created_at: string
          gps_lat: number | null
          gps_lng: number | null
          id: string
          storage_path: string | null
        }
        Insert: {
          captured_at?: string | null
          claim_id: string
          created_at?: string
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          storage_path?: string | null
        }
        Update: {
          captured_at?: string | null
          claim_id?: string
          created_at?: string
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          claims_used: number
          created_at: string
          full_name: string | null
          id: string
          irdai_license: string | null
          onboarding_complete: boolean
          subscription_tier: string
          user_id: string
        }
        Insert: {
          city?: string | null
          claims_used?: number
          created_at?: string
          full_name?: string | null
          id?: string
          irdai_license?: string | null
          onboarding_complete?: boolean
          subscription_tier?: string
          user_id: string
        }
        Update: {
          city?: string | null
          claims_used?: number
          created_at?: string
          full_name?: string | null
          id?: string
          irdai_license?: string | null
          onboarding_complete?: boolean
          subscription_tier?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
