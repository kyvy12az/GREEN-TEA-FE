import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCustomerChat } from '@/hooks/useCustomerChat';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatFooter } from './ChatFooter';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    scrollRef,
    handleSendMessage
  } = useCustomerChat(isOpen);

  if (!user) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5">
          <ChatHeader onClose={() => setIsOpen(false)} />
          
          <ChatBody 
            isLoading={isLoading} 
            messages={messages} 
            scrollRef={scrollRef} 
          />

          <ChatFooter 
            newMessage={newMessage} 
            setNewMessage={setNewMessage} 
            onSendMessage={handleSendMessage} 
          />
        </Card>
      )}
    </div>
  );
};
