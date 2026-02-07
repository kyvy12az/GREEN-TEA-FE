import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Loader2, Leaf, Sparkles, Bot, User, MessageSquarePlus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTeaAssistant } from '@/hooks/useTeaAssistant';
import { useAuthStore } from '@/store/authStore';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_PROMPTS = [
  'Pha trà xanh cho người mới',
  'Pha trà ô long không bị chát',
  'Matcha latte chuẩn quán',
  'Trà túi lọc pha sao ngon?',
];

const TeaAssistantPage = () => {
  const { messages, isLoading, sendMessage, clearChat } = useTeaAssistant();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    <div className="flex flex-col h-screen bg-[#F8F9FA] dark:bg-slate-950">
      {/* Header - Glassmorphism */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl">
              <Bot className="w-6 h-6 text-primary dark:text-primary" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Tea Master AI</h1>
            <p className="text-[11px] text-primary dark:text-primary font-medium">Trực tuyến</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors rounded-full"
            title="Về trang chủ"
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors rounded-full"
            title="Xóa cuộc trò chuyện"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full px-4">
          <div className="max-w-3xl mx-auto py-8">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary/70 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary/20 dark:shadow-none mb-6">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Xin chào yêu trà!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs text-sm">
                  Hôm nay bạn muốn khám phá hương vị trà nào? Hãy bắt đầu bằng một gợi ý bên dưới.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-md px-4">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="p-4 text-xs font-medium text-left bg-white dark:bg-slate-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all hover:border-primary/30 active:scale-95 shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar only for AI */}
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 mt-auto mb-1">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col">
                          <div
                            className={`px-4 py-3 rounded-[1.25rem] text-sm shadow-sm leading-relaxed ${
                              message.role === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-bl-none'
                            }`}
                          >
                            {message.role === 'assistant' ? (
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                              </div>
                            ) : (
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            )}
                          </div>
                          <span className={`text-[10px] mt-1 px-1 text-slate-400 font-medium ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {new Date(message.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center self-end mb-5">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-800 shadow-sm">
                       <div className="flex gap-1.5">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                       </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>
      </main>

      {/* Input Area - Floating Style */}
      <footer className="p-4 md:p-6 bg-transparent">
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="relative group"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-[1.5rem] opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-500" />
            
            <div className="relative flex items-end gap-2 bg-white dark:bg-slate-900 rounded-[1.5rem] p-2 shadow-xl border border-slate-200/50 dark:border-slate-800 group-focus-within:border-primary/50 transition-colors duration-300">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về các loại trà..."
                rows={1}
                style={{ minHeight: '46px', maxHeight: '150px' }}
                className="w-full flex-1 bg-transparent border-none focus:ring-0 focus:outline-none resize-none py-3 px-4 text-sm placeholder:text-slate-400 dark:text-slate-200"
                disabled={isLoading}
              />
              
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isLoading}
                className={`h-10 w-10 rounded-xl transition-all duration-300 ${
                  inputValue.trim() 
                  ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 dark:shadow-none text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </form>
          <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
             <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Enhanced</span>
             <span className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="flex items-center gap-1"><Bot className="w-3 h-3" /> Groq Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeaAssistantPage;