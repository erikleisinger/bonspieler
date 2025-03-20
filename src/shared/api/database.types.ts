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
      draws: {
        Row: {
          created_at: string
          draw_number: number | null
          id: string
          time: string | null
          tournament_id: string | null
          tournament_stage_id: string | null
        }
        Insert: {
          created_at?: string
          draw_number?: number | null
          id?: string
          time?: string | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
        }
        Update: {
          created_at?: string
          draw_number?: number | null
          id?: string
          time?: string | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "draws_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draws_tournament_stage_id_fkey"
            columns: ["tournament_stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
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
      game_connections: {
        Row: {
          created_at: string
          destination_game_id: string | null
          id: string
          origin_game_id: string | null
          tournament_id: string | null
          tournament_stage_id: string | null
          winner: boolean | null
        }
        Insert: {
          created_at?: string
          destination_game_id?: string | null
          id?: string
          origin_game_id?: string | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
          winner?: boolean | null
        }
        Update: {
          created_at?: string
          destination_game_id?: string | null
          id?: string
          origin_game_id?: string | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
          winner?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "game_connections_destination_game_id_fkey"
            columns: ["destination_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_connections_origin_game_id_fkey"
            columns: ["origin_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_connections_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_connections_tournament_stage_id_fkey"
            columns: ["tournament_stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          draw_number: number | null
          group_number: number | null
          id: string
          is_seed: boolean | null
          readable_id: string | null
          round_number: number | null
          tournament_id: string | null
          tournament_stage_id: string | null
        }
        Insert: {
          created_at?: string
          draw_number?: number | null
          group_number?: number | null
          id?: string
          is_seed?: boolean | null
          readable_id?: string | null
          round_number?: number | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
        }
        Update: {
          created_at?: string
          draw_number?: number | null
          group_number?: number | null
          id?: string
          is_seed?: boolean | null
          readable_id?: string | null
          round_number?: number | null
          tournament_id?: string | null
          tournament_stage_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_tournament_stage_id_fkey"
            columns: ["tournament_stage_id"]
            isOneToOne: false
            referencedRelation: "tournament_stages"
            referencedColumns: ["id"]
          },
        ]
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
      team_game_connections: {
        Row: {
          created_at: string
          game_id: string | null
          id: string
          team_id: string | null
        }
        Insert: {
          created_at?: string
          game_id?: string | null
          id?: string
          team_id?: string | null
        }
        Update: {
          created_at?: string
          game_id?: string | null
          id?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_game_connections_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_game_connections_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          team_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          team_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
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
          id: string
          name: string | null
          tournament_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          tournament_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_stages: {
        Row: {
          created_at: string
          id: string
          name: string | null
          num_end_teams: number | null
          num_start_teams: number | null
          order: number | null
          schema: Json | null
          tournament_id: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          num_end_teams?: number | null
          num_start_teams?: number | null
          order?: number | null
          schema?: Json | null
          tournament_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          num_end_teams?: number | null
          num_start_teams?: number | null
          order?: number | null
          schema?: Json | null
          tournament_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_stages_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          name: string | null
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string | null
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string | null
          start_date?: string | null
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
