import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Loader2, Leaf, Sparkles, Bot, User, Droplets, X, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTeaAssistant } from '@/hooks/useTeaAssistant';
import { useAuthStore } from '@/store/authStore';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_PROMPTS = [
  { text: 'Pha trà xanh cho người mới', icon: <Leaf className="w-4 h-4" /> },
  { text: 'Pha trà ô long không bị chát', icon: <Sparkles className="w-4 h-4" /> },
  { text: 'Matcha latte chuẩn quán', icon: <Bot className="w-4 h-4" /> },
  { text: 'Trà túi lọc pha sao ngon?', icon: <Droplets className="w-4 h-4" /> },
];

export const TeaAssistantBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useTeaAssistant();
  const { user } = useAuthStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;

    if (isInitialMount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      isInitialMount.current = false;
      return;
    }

    const behavior = isLoading ? 'auto' : 'smooth';
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const content = inputValue;
    setInputValue('');
    await sendMessage(content);
    inputRef.current?.focus();
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return;
    sendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, pointerEvents: 'none' }}
            animate={{
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              height: isMinimized ? '64px' : '600px',
            }}
            exit={{ opacity: 0, y: 40, pointerEvents: 'none' }}
            transition={{
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1] // Custom ease-out quint for super smooth feel
            }}
            className="mb-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-emerald-900/20 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col w-[380px] md:w-[400px]"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Tea Master AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Trực tuyến</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-white hover:bg-white/10"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Area */}
                <ScrollArea className="flex-1 bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="p-4">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Xin chào yêu trà!</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Hôm nay tôi có thể giúp gì cho bạn?</p>

                        <div className="mt-6 grid grid-cols-1 gap-2 w-full">
                          {QUICK_PROMPTS.map((prompt) => (
                            <button
                              key={prompt.text}
                              onClick={() => handleQuickPrompt(prompt.text)}
                              className="text-xs text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2 group"
                            >
                              <span className="text-primary group-hover:scale-110 transition-transform">{prompt.icon}</span>
                              <span className="font-medium text-slate-600 dark:text-slate-300">{prompt.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${message.role === 'user' ? 'bg-slate-100 dark:bg-slate-800' : 'bg-primary/10 text-primary'
                                }`}>
                                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className={`px-4 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${message.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none'
                                  }`}>
                                  {message.role === 'assistant' ? (
                                    <div className="prose prose-xs dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary">
                                      <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                                    </div>
                                  ) : (
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 shadow-sm">
                              <div className="flex gap-1">
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer Input */}
                <div className="p-4 md:p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-2">
                    <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] p-2 pl-4 border border-slate-200/50 dark:border-slate-700/50 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all duration-300">
                      <textarea
                        ref={inputRef}
                        rows={1}
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Hỏi về các loại trà..."
                        className="w-full flex-1 bg-transparent border-none focus:ring-0 focus:outline-none py-3 text-[13px] md:text-sm resize-none min-h-[40px] max-h-[150px] placeholder:text-slate-400 dark:text-slate-200"
                        disabled={isLoading}
                      />

                      <div className="flex items-center gap-1 pb-1 pr-1">
                        {/* Nút Xóa hội thoại - Thu gọn */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          onClick={clearChat}
                          title="Xóa lịch sử hội thoại"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* Nút Gửi */}
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!inputValue.trim() || isLoading}
                          className={`h-9 w-9 rounded-xl transition-all duration-300 ${inputValue.trim()
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                            }`}
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Chú thích nhỏ phía dưới */}
                    <p className="text-[10px] text-center text-slate-400 font-medium tracking-wide uppercase opacity-80">
                      {isLoading ? "AI đang pha trà và suy nghĩ..." : "Trợ lý ảo hỗ trợ trải nghiệm thưởng trà"}
                    </p>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-white text-primary' : 'bg-primary text-white'
          } border border-primary/10`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full" />
        )}
      </motion.button>
    </div>
  );
};
