export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          chat_message_id: string;
          chat_room_id: string | null;
          created_at: string;
          llm_id: string | null;
          text: string | null;
          user_id: string | null;
        };
        Insert: {
          chat_message_id?: string;
          chat_room_id?: string | null;
          created_at?: string;
          llm_id?: string | null;
          text?: string | null;
          user_id?: string | null;
        };
        Update: {
          chat_message_id?: string;
          chat_room_id?: string | null;
          created_at?: string;
          llm_id?: string | null;
          text?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_chat_room_id_fkey';
            columns: ['chat_room_id'];
            isOneToOne: false;
            referencedRelation: 'chat_rooms';
            referencedColumns: ['chat_room_id'];
          },
          {
            foreignKeyName: 'chat_messages_llm_id_fkey';
            columns: ['llm_id'];
            isOneToOne: false;
            referencedRelation: 'llms';
            referencedColumns: ['llm_id'];
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      chat_rooms: {
        Row: {
          chat_room_id: string;
          created_at: string;
          created_by: string | null;
          latest_llm: string | null;
          title: string | null;
        };
        Insert: {
          chat_room_id?: string;
          created_at?: string;
          created_by?: string | null;
          latest_llm?: string | null;
          title?: string | null;
        };
        Update: {
          chat_room_id?: string;
          created_at?: string;
          created_by?: string | null;
          latest_llm?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_rooms_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      llm_providers: {
        Row: {
          api_key: string | null;
          created_at: string;
          llm_provider_id: string;
          name: string | null;
        };
        Insert: {
          api_key?: string | null;
          created_at?: string;
          llm_provider_id?: string;
          name?: string | null;
        };
        Update: {
          api_key?: string | null;
          created_at?: string;
          llm_provider_id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      llms: {
        Row: {
          created_at: string;
          llm_id: string;
          llm_provider_id: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          llm_id?: string;
          llm_provider_id?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          llm_id?: string;
          llm_provider_id?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'llms_llm_provider_id_fkey';
            columns: ['llm_provider_id'];
            isOneToOne: false;
            referencedRelation: 'llm_providers';
            referencedColumns: ['llm_provider_id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          user_id: string;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          user_id?: string;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
