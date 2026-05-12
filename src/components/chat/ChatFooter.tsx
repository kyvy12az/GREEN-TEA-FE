import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardFooter } from '@/components/ui/card';

interface ChatFooterProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export const ChatFooter = ({ newMessage, setNewMessage, onSendMessage }: ChatFooterProps) => {
  return (
    <CardFooter className="p-4 border-t bg-white rounded-b-xl">
      <form onSubmit={onSendMessage} className="flex w-full gap-2">
        <Input
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full focus-visible:ring-primary"
        />
        <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </CardFooter>
  );
};
