import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <CardHeader className="bg-primary p-4 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
      <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Hỗ trợ trực tuyến
      </CardTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:bg-white/20 h-8 w-8"
      >
        <X className="h-5 w-5" />
      </Button>
    </CardHeader>
  );
};
