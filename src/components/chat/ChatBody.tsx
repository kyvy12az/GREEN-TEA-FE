import { Loader2 } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Message } from '@/hooks/useCustomerChat';

interface ChatBodyProps {
  isLoading: boolean;
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const ChatBody = ({ isLoading, messages, scrollRef }: ChatBodyProps) => {
  return (
    <CardContent className="flex-1 p-4 overflow-hidden bg-slate-50">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : (
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
              Chào bạn! Bạn cần chúng mình hỗ trợ gì về trà Nihon không ạ? 🍵
            </div>
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.is_admin_reply ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.is_admin_reply
                      ? 'bg-white text-slate-800 rounded-tl-none'
                      : 'bg-primary text-white rounded-tr-none'
                  }`}
                >
                  {msg.content}
                  <div className={`text-[10px] mt-1 opacity-70 ${msg.is_admin_reply ? 'text-slate-500' : 'text-white'}`}>
                    {format(new Date(msg.created_at), 'HH:mm', { locale: vi })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      )}
    </CardContent>
  );
};
