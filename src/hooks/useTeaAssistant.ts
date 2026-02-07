import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tea-assistant`;

export const useTeaAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const { toast } = useToast();

  // Load messages from database on mount
  useEffect(() => {
    const loadMessages = async () => {
      const storedSessionId = localStorage.getItem('tea_assistant_session');
      if (storedSessionId) {
        const { data, error } = await supabase
          .from('tea_assistant_chats')
          .select('*')
          .eq('session_id', storedSessionId)
          .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
          setMessages(data.map(m => ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
            created_at: m.created_at,
          })));
        }
      } else {
        localStorage.setItem('tea_assistant_session', sessionId);
      }
    };
    loadMessages();
  }, [sessionId]);

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    const currentSessionId = localStorage.getItem('tea_assistant_session') || sessionId;
    try {
      await supabase.from('tea_assistant_chats').insert({
        session_id: currentSessionId,
        role,
        content,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage('user', content.trim());
    setIsLoading(true);

    let assistantContent = '';
    const assistantId = crypto.randomUUID();

    try {
      const allMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Lỗi kết nối');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      // Add initial assistant message
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        created_at: new Date().toISOString(),
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save assistant message to database
      if (assistantContent) {
        await saveMessage('assistant', assistantContent);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Không thể gửi tin nhắn',
        variant: 'destructive',
      });
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, toast]);

  const clearChat = useCallback(async () => {
    const currentSessionId = localStorage.getItem('tea_assistant_session');
    if (currentSessionId) {
      await supabase
        .from('tea_assistant_chats')
        .delete()
        .eq('session_id', currentSessionId);
    }
    
    // Create new session
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('tea_assistant_session', newSessionId);
    setMessages([]);
    
    toast({
      title: 'Đã xóa cuộc trò chuyện',
      description: 'Bạn có thể bắt đầu cuộc trò chuyện mới.',
    });
  }, [toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
};
