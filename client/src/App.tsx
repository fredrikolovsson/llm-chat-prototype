import * as React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import * as DatabaseTypes from "../../../ts-chat-server/src/clients/supabase/database.types";
import { supabase } from "../utils/supabase";
import { trpc } from "./trpc";
import { Session } from "@supabase/supabase-js";

type State = {
  chat_rooms: DatabaseTypes.Tables<"chat_rooms">[];
  chat_messages: DatabaseTypes.Tables<"chat_messages">[];
  llms: DatabaseTypes.Tables<"llms">[];
  llm_providers: DatabaseTypes.Tables<"llm_providers">[];
  users: DatabaseTypes.Tables<"users">[];
};

function Page() {
  const [data, setData] = React.useState<State>({
    chat_messages: [],
    chat_rooms: [],
    llms: [],
    llm_providers: [],
    users: [],
  });

  const [session, setSession] = React.useState<Session | null>(null);
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    async function getData() {
      const { data: users } = await supabase.from("users").select();
      const { data: chat_rooms } = await supabase.from("chat_rooms").select();
      const { data: chat_messages } = await supabase
        .from("chat_messages")
        .select();
      const { data: llms } = await supabase.from("llms").select();
      const { data: llm_providers } = await supabase
        .from("llm_providers")
        .select();
      // const { data: users } = await supabase.from('users').select()

      setData({
        chat_rooms: chat_rooms || [],
        chat_messages: chat_messages || [],
        llms: llms || [],
        llm_providers: llm_providers || [],
        users: users || [],
      });
    }

    getData();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return (
    <div>
      {Object.keys(data).map((key) => (
        <li key={key}>
          {key}: {JSON.stringify(data[key], null, 2)}
        </li>
      ))}
      <button
        onClick={() =>
          trpc.llmChat.sendUserMessage.mutate({
            chat_room_id: data.chat_rooms[0].chat_room_id,
            text: "Mjau",
            user_id: data.users[0].user_id,
          })
        }
      >
        Insert
      </button>
    </div>
  );
}

export default Page;
