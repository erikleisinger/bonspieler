export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bracket_game_team_junction: {
        Row: {
          bracket_game_id: number | null
          created_at: string
          id: number
          team_id: number | null
        }
        Insert: {
          bracket_game_id?: number | null
          created_at?: string
          id?: number
          team_id?: number | null
        }
        Update: {
          bracket_game_id?: number | null
          created_at?: string
          id?: number
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bracket_game_team_junction_bracket_game_id_fkey"
            columns: ["bracket_game_id"]
            isOneToOne: false
            referencedRelation: "bracket_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bracket_game_team_junction_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      bracket_games: {
        Row: {
          bracket_id: number | null
          created_at: string
          draw_number: number | null
          id: number
          lineWidth: string | null
          local_id: string | null
          loser_bracket_game_id: number | null
          loser_team_id: number | null
          readable_id: string | null
          round_number: number | null
          winner_bracket_game_id: number | null
          winner_team_id: number | null
          y: number | null
        }
        Insert: {
          bracket_id?: number | null
          created_at?: string
          draw_number?: number | null
          id?: number
          lineWidth?: string | null
          local_id?: string | null
          loser_bracket_game_id?: number | null
          loser_team_id?: number | null
          readable_id?: string | null
          round_number?: number | null
          winner_bracket_game_id?: number | null
          winner_team_id?: number | null
          y?: number | null
        }
        Update: {
          bracket_id?: number | null
          created_at?: string
          draw_number?: number | null
          id?: number
          lineWidth?: string | null
          local_id?: string | null
          loser_bracket_game_id?: number | null
          loser_team_id?: number | null
          readable_id?: string | null
          round_number?: number | null
          winner_bracket_game_id?: number | null
          winner_team_id?: number | null
          y?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bracket_games_bracket_id_fkey"
            columns: ["bracket_id"]
            isOneToOne: false
            referencedRelation: "brackets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bracket_games_loser_bracket_game_id_fkey"
            columns: ["loser_bracket_game_id"]
            isOneToOne: false
            referencedRelation: "bracket_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bracket_games_loser_team_id_fkey"
            columns: ["loser_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bracket_games_winner_bracket_game_id_fkey"
            columns: ["winner_bracket_game_id"]
            isOneToOne: false
            referencedRelation: "bracket_games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bracket_games_winner_team_id_fkey"
            columns: ["winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      bracket_groups: {
        Row: {
          created_at: string
          end_team_count: number | null
          event_id: number | null
          id: number
          name: string | null
          stage_num: number | null
          start_team_count: number | null
        }
        Insert: {
          created_at?: string
          end_team_count?: number | null
          event_id?: number | null
          id?: number
          name?: string | null
          stage_num?: number | null
          start_team_count?: number | null
        }
        Update: {
          created_at?: string
          end_team_count?: number | null
          event_id?: number | null
          id?: number
          name?: string | null
          stage_num?: number | null
          start_team_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bracket_groups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      brackets: {
        Row: {
          bracket_group_id: number | null
          created_at: string
          id: number
          name: string | null
          stage_num: number | null
        }
        Insert: {
          bracket_group_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          stage_num?: number | null
        }
        Update: {
          bracket_group_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          stage_num?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "brackets_bracket_group_id_fkey"
            columns: ["bracket_group_id"]
            isOneToOne: false
            referencedRelation: "bracket_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      event_stages: {
        Row: {
          created_at: string
          end_team_count: number | null
          event_id: number | null
          id: number
          name: string | null
          stage_num: number | null
          start_team_count: number | null
        }
        Insert: {
          created_at?: string
          end_team_count?: number | null
          event_id?: number | null
          id?: number
          name?: string | null
          stage_num?: number | null
          start_team_count?: number | null
        }
        Update: {
          created_at?: string
          end_team_count?: number | null
          event_id?: number | null
          id?: number
          name?: string | null
          stage_num?: number | null
          start_team_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_pool_stages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          id: number
          name: string | null
          owner_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          owner_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          owner_id?: string | null
        }
        Relationships: []
      }
      pools: {
        Row: {
          created_at: string
          event_stage_id: number | null
          id: number
          name: string | null
          team_count: number | null
        }
        Insert: {
          created_at?: string
          event_stage_id?: number | null
          id?: number
          name?: string | null
          team_count?: number | null
        }
        Update: {
          created_at?: string
          event_stage_id?: number | null
          id?: number
          name?: string | null
          team_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pools_event_pool_stage_id_fkey"
            columns: ["event_stage_id"]
            isOneToOne: false
            referencedRelation: "event_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      team_event_junction: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
          team_id: number | null
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
          team_id?: number | null
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_event_junction_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_event_junction_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      tournament_schema: {
        Row: {
          created_at: string
          id: number
          name: string | null
          schema: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          schema?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          schema?: Json | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
