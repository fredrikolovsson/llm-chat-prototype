import { z } from 'zod';
import { publicProcedure } from '../../initialization/index.js';
import { supabase } from '../../../../clients/supabase/index.js';

export const llmChat = {
  sendUserMessage: publicProcedure
    .input(
      z.object({
        text: z.string(),
        user_id: z.string(),
        chat_room_id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const response = await supabase.from('chat_messages').insert(input);
      return response;
    }),
};
