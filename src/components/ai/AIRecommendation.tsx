import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf, ArrowRight, ArrowLeft, Loader2, ShoppingCart, Eye, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecommendationStore, type QuizAnswers, type Recommendation } from '@/store/recommendationStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// Quiz Questions Configuration
const quizQuestions = [
  {
    key: 'flavor' as keyof QuizAnswers,
    question: 'Hương vị bạn thích?',
    options: [
      { value: 'Đắng nhẹ & thanh', icon: '🍃', label: 'Đắng nhẹ & thanh' },
      { value: 'Đậm đà matcha', icon: '🍵', label: 'Đậm đà matcha' },
      { value: 'Thơm thảo & dễ uống', icon: '🌿', label: 'Thơm thảo & dễ uống' },
      { value: 'Ngọt dịu', icon: '🍯', label: 'Ngọt dịu' },
    ],
  },
  {
    key: 'healthGoal' as keyof QuizAnswers,
    question: 'Mục tiêu sức khỏe?',
    options: [
      { value: 'Giảm stress & thư giãn', icon: '😌', label: 'Giảm stress & thư giãn' },
      { value: 'Giảm cân & detox', icon: '💪', label: 'Giảm cân & detox' },
      { value: 'Tăng năng lượng', icon: '⚡', label: 'Tăng năng lượng' },
      { value: 'Chống oxy hóa & đẹp da', icon: '✨', label: 'Chống oxy hóa & đẹp da' },
    ],
  },
  {
    key: 'frequency' as keyof QuizAnswers,
    question: 'Tần suất uống trà?',
    options: [
      { value: '1-2 lần/ngày', icon: '☕', label: '1-2 lần/ngày' },
      { value: '3+ lần/ngày', icon: '🍵', label: '3+ lần/ngày' },
      { value: 'Thỉnh thoảng', icon: '🌙', label: 'Thỉnh thoảng' },
    ],
  },
  {
    key: 'drinkTime' as keyof QuizAnswers,
    question: 'Thời gian uống chính?',
    options: [
      { value: 'Sáng sớm', icon: '🌅', label: 'Sáng sớm' },
      { value: 'Buổi chiều', icon: '☀️', label: 'Buổi chiều' },
      { value: 'Tối muộn', icon: '🌙', label: 'Tối muộn' },
    ],
  },
  {
    key: 'teaType' as keyof QuizAnswers,
    question: 'Dạng trà bạn thích?',
    options: [
      { value: 'Nguyên lá', icon: '🍃', label: 'Nguyên lá' },
      { value: 'Bột matcha', icon: '🍵', label: 'Bột matcha' },
      { value: 'Túi lọc tiện lợi', icon: '📦', label: 'Túi lọc tiện lợi' },
    ],
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// Trigger Button Component
export const AIRecommendationButton = () => {
  const { openModal } = useRecommendationStore();

  return (
    <motion.button
      onClick={openModal}
      className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary border border-primary rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
      <span>Gợi ý trà cho tôi</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  );
};

// Loading Animation Component
const LoadingAnimation = () => {
  const leaves = [0, 1, 2, 3, 4];
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative w-32 h-32 mb-8">
        {leaves.map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${20 + i * 15}%` }}
            initial={{ y: -20, rotate: 0, opacity: 0 }}
            animate={{
              y: [0, 80, 120],
              rotate: [0, 45, 90],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <Leaf className="w-6 h-6 text-primary" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Đang pha chế gợi ý dành riêng cho bạn...
        </h3>
        <p className="text-muted-foreground">
          AI đang phân tích sở thích của bạn
        </p>
      </motion.div>
      
      <motion.div
        className="mt-6 flex gap-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary/70" />
        <div className="w-2 h-2 rounded-full bg-primary/40" />
      </motion.div>
    </motion.div>
  );
};

// Quiz Step Component
const QuizStep = ({ 
  question, 
  onSelect, 
  selectedValue 
}: { 
  question: typeof quizQuestions[0];
  onSelect: (value: string) => void;
  selectedValue?: string;
}) => {
  return (
    <motion.div
      key={question.key}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-foreground text-center">
        {question.question}
      </h3>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {question.options.map((option) => (
          <motion.button
            key={option.value}
            variants={fadeInUp}
            onClick={() => onSelect(option.value)}
            className={`p-5 rounded-2xl border-2 font-sans transition-all duration-300 text-left group hover:border-primary hover:bg-primary/5 ${
              selectedValue === option.value 
                ? 'border-primary bg-primary/10 shadow-md' 
                : 'border-border bg-card'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{option.icon}</span>
              <span className="font-medium text-foreground group-hover:text-primary">
                {option.label}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({ 
  recommendation, 
  index 
}: { 
  recommendation: Recommendation;
  index: number;
}) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: recommendation.id,
      name: recommendation.name,
      price: recommendation.price,
      image: '/placeholder.svg',
      variant: 'Mặc định',
    });
    toast.success(`Đã thêm ${recommendation.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Match Score Badge */}
      <div className="relative p-4 pb-0">
        <motion.div
          className="absolute top-6 right-6 z-10 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        >
          {recommendation.matchScore}% phù hợp
        </motion.div>
        
        {/* Product Image */}
        <div className="aspect-square rounded-xl bg-gradient-to-br from-tea-100 to-tea-200 flex items-center justify-center overflow-hidden">
          {recommendation.image ? (
            <img 
              src={recommendation.image} 
              alt={recommendation.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <Leaf className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <h4 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {recommendation.name}
        </h4>
        
        <p className="text-sm text-muted-foreground font-sans line-clamp-3">
          {recommendation.reason}
        </p>
        
        <p className="text-xl font-bold font-sans text-primary">
          {formatPrice(recommendation.price)}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 gap-2 font-sans"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Thêm vào giỏ
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <Link to={`/product/${recommendation.slug}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Results Component
const RecommendationResults = () => {
  const { recommendations, reset, closeModal } = useRecommendationStore();

  const handleRetry = () => {
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground">
          Trà dành riêng cho bạn!
        </h3>
        <p className="text-muted-foreground font-sans mt-2">
          Dựa trên sở thích của bạn, đây là những lựa chọn hoàn hảo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.id} recommendation={rec} index={index} />
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Button
          onClick={handleRetry}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Thử lại quiz
        </Button>
        <Button onClick={closeModal}>
          Tiếp tục mua sắm
        </Button>
      </div>
    </motion.div>
  );
};

// Error Component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <X className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Có lỗi xảy ra
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {error}
      </p>
      <Button onClick={onRetry} className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Thử lại
      </Button>
    </motion.div>
  );
};

// Main Modal Component
export const AIRecommendationModal = () => {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    answers,
    recommendations,
    isLoading,
    error,
    nextStep,
    prevStep,
    setAnswer,
    setRecommendations,
    setLoading,
    setError,
    reset,
  } = useRecommendationStore();

  const currentQuestion = quizQuestions[currentStep];
  const totalSteps = quizQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;
  const canProceed = currentQuestion && answers[currentQuestion.key];

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tea-recommendation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ quizAnswers: answers }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể lấy gợi ý');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      console.error('Recommendation error:', err);
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (value: string) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.key, value);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      nextStep();
      fetchRecommendations();
    } else {
      nextStep();
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchRecommendations();
  };

  const showQuiz = currentStep < totalSteps && !isLoading && !error && recommendations.length === 0;
  const showLoading = isLoading;
  const showError = error && !isLoading;
  const showResults = recommendations.length > 0 && !isLoading;

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 font-decoration">
        <VisuallyHidden>
          <DialogTitle>AI Gợi Ý Trà</DialogTitle>
        </VisuallyHidden>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-tea-600 text-primary-foreground p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Gợi Ý Trà</h2>
              <p className="text-sm opacity-90">
                {showQuiz ? `Bước ${currentStep + 1}/${totalSteps}` : 
                 showLoading ? 'Đang phân tích...' :
                 showResults ? 'Hoàn thành!' : 'Lỗi'}
              </p>
            </div>
          </div>
          
          {showQuiz && (
            <Progress 
              value={progress} 
              className="h-2 bg-white/30"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {showQuiz && currentQuestion && (
              <QuizStep
                question={currentQuestion}
                onSelect={handleOptionSelect}
                selectedValue={answers[currentQuestion.key]}
              />
            )}
            
            {showLoading && <LoadingAnimation />}
            
            {showError && <ErrorState error={error} onRetry={handleRetry} />}
            
            {showResults && <RecommendationResults />}
          </AnimatePresence>
        </div>

        {/* Footer - Only show during quiz */}
        {showQuiz && (
          <div className="sticky bottom-0 bg-background font-sans border-t p-4 flex justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="gap-2"
            >
              {isLastStep ? (
                <>
                  Xem gợi ý
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Tiếp theo
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Combined Export
export const AIRecommendation = () => {
  return (
    <>
      <AIRecommendationButton />
      <AIRecommendationModal />
    </>
  );
};

export default AIRecommendation;
