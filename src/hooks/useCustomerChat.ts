import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

export interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  is_admin_reply: boolean;
}

export const useCustomerChat = (isOpen: boolean) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && isOpen) {
      initChatRoom();
    }
  }, [user, isOpen]);

  const initChatRoom = async () => {
    setIsLoading(true);
    try {
      let { data: existingRoom, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!existingRoom) {
        const { data: newRoom, error: createError } = await supabase
          .from('chat_rooms')
          .insert({
            user_id: user?.id,
            customer_name: user?.user_metadata?.full_name || user?.email,
          })
          .select()
          .single();
        
        if (createError) throw createError;
        existingRoom = newRoom;
      }

      setRoom(existingRoom);
      fetchMessages(existingRoom.id);
    } catch (err) {
      console.error('Lỗi khởi tạo chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (roomId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (!error) {
      setMessages(data || []);
      scrollToBottom();
    }
  };

  useEffect(() => {
    if (!room) return;

    const channel = supabase
      .channel(`room-${room.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${room.id}` },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages(prev => {
            const isExist = prev.some(m => m.content === newMsg.content && m.sender_id === newMsg.sender_id);
            if (isExist) {
              return prev.map(m => (m.content === newMsg.content && m.id.length < 20) ? newMsg : m);
            }
            return [...prev, newMsg];
          });
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !room) return;

    const content = newMessage.trim();
    setNewMessage('');

    const tempId = Math.random().toString(36).substring(7);
    const optimisticMsg: Message = {
      id: tempId,
      content: content,
      created_at: new Date().toISOString(),
      sender_id: user.id,
      is_admin_reply: false
    };
    setMessages(prev => [...prev, optimisticMsg]);
    scrollToBottom();

    try {
      const { error: msgError } = await supabase
        .from('chat_messages')
        .insert({
          room_id: room.id,
          sender_id: user.id,
          content: content,
          is_admin_reply: false
        });

      if (msgError) throw msgError;

      await supabase
        .from('chat_rooms')
        .update({ last_message: content, updated_at: new Date().toISOString() })
        .eq('id', room.id);

    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err);
      setMessages(prev => prev.filter(m => m.id !== tempId));
    }
  };

  return {
    user,
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    scrollRef,
    handleSendMessage
  };
};
