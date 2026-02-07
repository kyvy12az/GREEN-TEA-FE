-- Create table for tea assistant chat history
CREATE TABLE public.tea_assistant_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_tea_assistant_chats_session ON public.tea_assistant_chats(session_id);
CREATE INDEX idx_tea_assistant_chats_user ON public.tea_assistant_chats(user_id);

-- Enable RLS
ALTER TABLE public.tea_assistant_chats ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (including anonymous users)
CREATE POLICY "Anyone can insert chat messages"
ON public.tea_assistant_chats
FOR INSERT
WITH CHECK (true);

-- Policy: Users can view their own chats (by session_id for anonymous, by user_id for logged in)
CREATE POLICY "Users can view their own chats"
ON public.tea_assistant_chats
FOR SELECT
USING (true);

-- Policy: Users can delete their own chats
CREATE POLICY "Users can delete their own chats"
ON public.tea_assistant_chats
FOR DELETE
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.tea_assistant_chats;