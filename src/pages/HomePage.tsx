import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Shield, Sparkles, Truck, Award, RotateCcw, CheckCircle2, Quote, Star, Droplets, Flame, CheckCircle, ShieldCheck, Zap, Box, PieChart, Calendar, Clock } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { CustomButton } from '@/components/ui/custom-button';
import heroImage from '@/assets/hero-tea-plantation.jpg';
import { Cell, Pie, ResponsiveContainer } from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blogs';
import { formatDate } from '@/lib/utils';
import { AIRecommendationButton, AIRecommendationModal } from '@/components/ai/AIRecommendation';
import { TeaTrendsSection } from '@/components/home/TeaTrendsSection';

const latestBlogs = blogPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const cardVariants = (isLeft) => ({
  hidden: { opacity: 0, x: isLeft ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
});

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }, // Ease-out mượt mà
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
};

const barVariants = (value) => ({
  hidden: { width: 0 },
  visible: {
    width: `${value}%`,
    transition: { duration: 1.5, ease: "circOut", delay: 0.5 }
  }
});

const benefits = [
  {
    icon: Heart,
    title: 'Tốt cho tim mạch',
    description: 'Chất chống oxy hóa trong trà xanh giúp bảo vệ tim mạch và cải thiện tuần hoàn máu.',
    color: 'text-white',
    bg: 'bg-rose-400',
    shadow: 'shadow-rose-500/20',
  },
  {
    icon: Sparkles,
    title: 'Làm đẹp da',
    description: 'Polyphenol giúp chống lão hóa, làm sáng da và giảm mụn một cách tự nhiên.',
    color: 'text-white',
    bg: 'bg-amber-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Tăng miễn dịch',
    description: 'Catechin và vitamin giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi bệnh tật.',
    color: 'text-white',
    bg: 'bg-blue-400',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: Leaf,
    title: 'Hỗ trợ giảm cân',
    description: 'Thúc đẩy trao đổi chất, đốt cháy mỡ thừa hiệu quả khi kết hợp với vận động.',
    color: 'text-white',
    bg: 'bg-emerald-400',
    shadow: 'shadow-emerald-500/20',
  },
];

const steps = [
  {
    title: "Chọn lọc nguyên liệu",
    description: "Tuyển chọn những búp trà non tơ, tươi ngon từ những vườn trà chất lượng cao, đạt tiêu chuẩn VietGAP.",
    icon: <Leaf className="w-5 h-5" />,
  },
  {
    title: "Sơ chế",
    description: "Làm héo, vò trà theo phương pháp truyền thống để tạo hương vị đặc trưng, đảm bảo vệ sinh an toàn thực phẩm.",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    title: "Chế biến",
    description: "Sao trà ở nhiệt độ phù hợp để giữ được hương vị và dưỡng chất tốt nhất, tuân thủ quy trình VietGAP nghiêm ngặt.",
    icon: <Flame className="w-5 h-5" />,
  },
  {
    title: "Kiểm tra chất lượng",
    description: "Đánh giá kỹ lưỡng về hương vị, màu sắc và độ an toàn của sản phẩm trước khi đóng gói.",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

const teaValues = [
  { label: "Nguyên liệu tự nhiên", value: 100 },
  { label: "Thu hái thủ công", value: 95 },
  { label: "Không hương liệu", value: 100 },
  { label: "Khách hàng quay lại", value: 92 },
];

const HomePage = () => {
  const { data: allProducts = [], isLoading: isLoadingProducts } = useProducts({ category: 'all' });
  const featuredProducts = allProducts.filter(p => p.id).slice(1, 5);

  const COLORS = ["#4ade80", "#d1fae5"];

  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) observer.observe(chartRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Đồi trà xanh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-tea-900/80 via-tea-800/60 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                100% Nguyên Chất Từ Thiên Nhiên
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-decoration italic text-primary-foreground leading-tight mb-6"
            >
              Khám Phá Hương Vị{' '}
              <span className="text-tea-300">Tinh Túy</span>{' '}
              Của Trà Xanh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm md:text-lg text-tea-100 italic leading-relaxed mb-8"
            >
              Mang đến cho bạn những sản phẩm trà xanh nguyên chất từ vùng cao Việt Nam
              và Nhật Bản, được chọn lọc kỹ lưỡng để đảm bảo chất lượng tốt nhất.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <CustomButton variant="hero" size="lg" className='bg-primary text-white hover:bg-primary/80'>
                    Khám Phá Ngay
                    <ArrowRight className="w-5 h-5" />
                  </CustomButton>
                </motion.div>
              </Link>
              <AIRecommendationButton />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-primary-foreground/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Strip*/}
      <section className="bg-tea-900 border-y border-tea-800/50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Miễn phí vận chuyển", desc: "Cho đơn hàng từ 500K" },
              { icon: Award, title: "Chất lượng cao", desc: "Cam kết chính hãng 100%" },
              { icon: Shield, title: "Bảo mật thanh toán", desc: "An toàn tuyệt đối" },
              { icon: RotateCcw, title: "Đổi trả dễ dàng", desc: "Trong vòng 7 ngày" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center md:flex-row gap-4 text-primary-foreground group cursor-pointer"
              >
                <motion.div
                  className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <feature.icon className="w-6 h-6 text-tea-300" />
                </motion.div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-sm uppercase tracking-wider">{feature.title}</p>
                  <p className="text-tea-200/70 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Modal */}
      <AIRecommendationModal />

      {/* Benefits Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/60" />
        <div className="absolute inset-0">
          {/* soft glows */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-emerald-200/40 blur-[90px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-40 -right-40 w-[620px] h-[620px] rounded-full bg-lime-300/20 blur-[110px]"
          />
        </div>

        {/* subtle noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage:
              "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E)",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto mb-14 md:mb-20"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur border border-emerald-100 text-emerald-700 text-xs font-medium tracking-[0.28em] uppercase shadow-sm">
                Health · Ritual · Value
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-decoration font-semibold text-tea-950 leading-tight">
              Tinh Hoa{" "}
              <span className="italic text-emerald-700">Trà Xanh</span>{" "}
              Được Tạo Nên
            </h2>

            <p className="mt-5 text-tea-800/65 font-decoration text-base md:text-xl leading-relaxed italic">
              Trà không chỉ là thức uống, mà là một nghi lễ nuôi dưỡng thân – tâm – trí.
            </p>
          </motion.div>

          {/* 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-24">
            {/* Image side */}
            <motion.div
              variants={fadeInLeft}
              className="relative"
            >
              <div className="relative rounded-[2.75rem] overflow-hidden border border-emerald-100 bg-white shadow-[0_40px_90px_-55px_rgba(0,0,0,0.35)]">
                <img
                  src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/12/22/photo-1640156148046-1640156148191631657468.jpg"
                  alt="Tea Ritual"
                  className="w-full h-[360px] md:h-[440px] object-cover"
                />

                {/* overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7"
                >
                  <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 px-6 py-5 shadow-xl">
                    <p className="text-tea-950/80 italic font-decoration text-sm md:text-base leading-relaxed">
                      “Mỗi chén trà là một khoảnh khắc trở về với chính mình.”
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* small decorative badge */}
              <div className="absolute -top-4 -right-4 hidden md:block">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg rotate-6">
                  🍵
                </div>
              </div>
            </motion.div>

            {/* Values side */}
            <motion.div
              variants={fadeInUp}
              className="rounded-[2.75rem] border border-emerald-100 bg-white/70 backdrop-blur-xl shadow-[0_30px_90px_-60px_rgba(0,0,0,0.25)] p-7 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-tea-950 font-decoration">
                  Giá trị của trà xanh
                </h3>
                <p className="mt-2 text-tea-800/60 text-sm md:text-base leading-relaxed">
                  Tập trung vào sức khỏe, sự thư giãn và thói quen thưởng trà mỗi ngày.
                </p>
              </div>

              <div className="space-y-7">
                {teaValues.map((item, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-tea-950 font-medium text-base md:text-lg">
                        {item.label}
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        {item.value}%
                      </span>
                    </div>

                    <div className="relative w-full h-3.5 rounded-full bg-emerald-100 overflow-hidden">
                      {/* glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/60 to-lime-200/40 opacity-70" />

                      <motion.div
                        variants={barVariants(item.value)}
                        className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700"
                      />

                      {/* little shine */}
                      <div className="absolute top-0 left-0 h-full w-16 bg-white/25 blur-md rotate-12" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA mini */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-tea-800/60 text-sm italic font-decoration">
                  Một thói quen nhỏ – lợi ích lớn cho cơ thể.
                </p>

                <button
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 bg-emerald-700 text-white text-sm font-medium shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition"
                >
                  Khám phá trà xanh
                </button>
              </div>
            </motion.div>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative rounded-[2.25rem] border border-emerald-100 bg-white/70 backdrop-blur-xl p-7 shadow-[0_25px_70px_-55px_rgba(0,0,0,0.35)] hover:shadow-[0_35px_90px_-60px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden"
              >
                {/* soft hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-lime-400/10" />
                </div>

                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center shadow-md ${benefit.shadow} 
              group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <benefit.icon
                      className={`w-7 h-7 ${benefit.color}`}
                    />
                  </div>

                  <h3 className="mt-6 text-lg lg:text-xl font-semibold text-tea-950 group-hover:text-emerald-700 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-tea-800/60 text-sm leading-relaxed italic font-decoration">
                    {benefit.description}
                  </p>

                  {/* tiny divider */}
                  <div className="mt-6 h-px w-full bg-emerald-100" />

                  <p className="mt-4 text-emerald-700/80 text-xs font-medium tracking-wide">
                    Learn more →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <TeaTrendsSection />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative py-24 md:py-32 overflow-hidden mb-10"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            whileInView={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src="https://file.hstatic.net/1000075078/article/2_40694d37404e49319f9d46392cebdf28.jpg"
              alt="Tea leaves background"
              className="w-full h-full object-cover brightness-[1.15] contrast-100 saturate-110"

            />
          </motion.div>

          {/* overlay: giúp ảnh rõ nhưng text vẫn nổi */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07140f]/75 via-[#0b241a]/55 to-[#0b241a]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

          {/* glow accents */}
          <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-emerald-500/20 blur-[110px]" />
          <div className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full bg-lime-300/10 blur-[120px]" />

          {/* noise */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT */}
            <motion.div variants={fadeInUp} className="text-white">
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-white/85 text-xs font-medium tracking-[0.28em] uppercase shadow-lg">
                  Vietnamese Tea · Craft · Ritual
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={fadeInUp}
                className="leading-tight font-decoration"
              >
                <span className="block text-4xl md:text-5xl lg:text-6xl font-semibold">
                  Khám Phá Hương Vị
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-semibold italic text-tea-300 mt-3 drop-shadow-[0_12px_35px_rgba(0,0,0,0.45)]">
                  Trà Việt Nam
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="mt-7 max-w-xl text-white/75 text-base md:text-lg leading-relaxed"
              >
                Chúng tôi chọn lọc những búp trà tinh khiết từ các vùng núi cao,
                nơi thiên nhiên, con người và thời gian cùng nhau tạo nên hương vị trà
                thuần khiết của Việt Nam.
              </motion.p>

              {/* Mini stats */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 grid grid-cols-3 gap-4 max-w-xl"
              >
                {[
                  { value: "100%", label: "Búp trà non" },
                  { value: "3+", label: "Vùng trà nổi tiếng" },
                  { value: "24h", label: "Giữ hương tươi" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4"
                  >
                    <p className="text-xl md:text-2xl font-semibold text-white">
                      {s.value}
                    </p>
                    <p className="text-xs md:text-sm text-white/60 mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp} className="mt-10 flex gap-4 flex-wrap">
                <button className="rounded-2xl px-6 py-3 bg-primary text-white font-semibold shadow-xl shadow-emerald-500/20 hover:bg-primary/100 transition">
                  Xem bộ sưu tập trà
                </button>
                <button className="rounded-2xl px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-xl text-white/85 hover:bg-white/10 transition">
                  Tìm hiểu trà đạo
                </button>
              </motion.div>
            </motion.div>

            {/* RIGHT - Masonry Premium */}
            <motion.div variants={fadeInUp} className="w-full">
              <div className="grid grid-cols-2 gap-5 md:gap-7">
                {[
                  {
                    src: "https://vienhuyethoc.vn/wp-content/uploads/2023/01/tra-xanh-117.jpg",
                    label: "Trà xanh núi cao",
                  },
                  {
                    src: "https://chantamtra.vn/public/upload/kham-pha-tra-ngon-nhat-viet-nam-chan-tam-tra%20(4).jpg",
                    label: "Hương trà nguyên bản",
                  },
                  {
                    src: "https://bantradienthongminh.vn/wp-content/uploads/chen-tra-bat-trang.jpg",
                    label: "Nghi lễ thưởng trà",
                  },
                  {
                    src: "https://image-us.24h.com.vn/upload/4-2019/images/2019-12-26/1577343027-764-5-cong-thuc-duong-da-lam-dep-it-biet-cua-tra-xanh-giup-nang-tiet-kiem-hau-bao-2-1576492426-width650height433.jpg",
                    label: "Tinh chất từ trà",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={imageVariant}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35 }}
                    className={`group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_35px_90px_-65px_rgba(0,0,0,0.75)]
                ${i % 2 !== 0 ? "mt-10" : ""}`}
                  >
                    <div className="aspect-[4/5]">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-90" />

                    {/* shine */}
                    <div className="absolute -left-24 top-0 w-24 h-full bg-white/10 blur-xl rotate-12 translate-x-0 group-hover:translate-x-[520px] transition-transform duration-1000" />

                    {/* caption */}
                    <div className="absolute left-5 right-5 bottom-5">
                      <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl px-4 py-3">
                        <p className="text-white text-sm font-medium">
                          {item.label}
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">
                          Khám phá chi tiết →
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* Featured Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Decor nền nhẹ */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-tea-50 rounded-full blur-3xl -z-10 opacity-50" />

        <div className="container mx-auto px-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">

            <div className="max-w-2xl">
              <span className="inline-block text-primary uppercase tracking-[0.35em] text-xs mb-5">
                OUR COLLECTION
              </span>

              <h2
                className="text-4xl md:text-5xl leading-tight text-tea-950 font-decoration font-semibold mb-4"
              >
                Sản Phẩm{" "}
                <span className="italic text-primary">
                  Nổi Bật
                </span>
                <br />
                Được Yêu Thích Nhất
              </h2>
            </div>

            <p
              className="text-tea-800/70 text-base max-w-md border-l-2 border-tea-200 pl-6 italic font-decoration leading-loose"
            >
              “Những búp trà tinh túy nhất được chọn lọc thủ công,
              mang hương vị đặc trưng của vùng cao.”
            </p>

          </div>

          {/* GRID SẢN PHẨM */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-tea-100 rounded-3xl h-80 mb-4"></div>
                  <div className="h-4 bg-tea-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-tea-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-tea-100 mb-6">
                <Leaf className="w-10 h-10 text-tea-400" />
              </div>
              <h3 className="text-xl font-semibold text-tea-900 mb-2">Chưa có sản phẩm nổi bật</h3>
              <p className="text-tea-600 mb-8">Vui lòng quay lại sau hoặc xem tất cả sản phẩm</p>
              <Link to="/products">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300">
                  Xem tất cả sản phẩm
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          )}

          {/* CTA */}
          {!isLoadingProducts && featuredProducts.length > 0 && (
            <div className="text-center mt-20">
              <Link to="/products">
                <button className="inline-flex items-center gap-3 px-12 py-4 bg-primary text-white rounded-full hover:bg-primary/500 transition-all duration-300 font-medium tracking-wider font-sans group">
                  XEM TẤT CẢ SẢN PHẨM
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          )}

        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative py-24 md:py-20 overflow-hidden"
      >
        {/* BACKGROUND - Hiệu ứng Zoom chậm */}
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://bizweb.dktcdn.net/100/025/663/files/tour-du-lich-vuon-tra-2.jpg?v=1625753598645"
            alt="Green tea plantation"
            className="w-full h-full object-cover brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#14382a]/90 via-[#1f5a40]/60 to-[#14382a]/90" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          {/* HEADER */}
          <motion.div
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-24 text-white"
          >
            <span className="text-tea-400 tracking-[0.30em] text-xs font-semibold uppercase block mb-6">
              Quy trình sản xuất
            </span>
            <h2 className="text-4xl md:text-5xl font-decoration font-semibold mb-6">
              Từ Lá Trà Đến <span className="italic text-tea-300">Tách Trà</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-loose ">
              Khám phá quy trình sản xuất trà thượng hạng, nơi con người, thiên nhiên và thời gian cùng tạo nên hương vị trà thuần khiết.
            </p>
          </motion.div>

          {/* TIMELINE */}
          <div className="max-w-5xl mx-auto relative">
            {/* LINE ANIMATION - Vẽ từ trên xuống */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-emerald-300/0 via-emerald-300 to-emerald-300/0 hidden md:block origin-top"
            />

            <div className="space-y-24">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`relative flex flex-col md:flex-row items-center gap-10 ${!isEven ? "md:flex-row-reverse" : ""}`}>

                    {/* CONTENT CARD */}
                    <motion.div
                      className="w-full md:w-1/2"
                      variants={cardVariants(isEven)}
                      whileHover={{ y: -10 }}
                    >
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl hover:bg-white/10 transition-all duration-500 group">
                        <h3
                          className="text-xl md:text-2xl font-decoration font-semibold text-white mb-4 group-hover:text-emerald-300 transition-colors"
                        >
                          {step.title}
                        </h3>
                        <p className="text-emerald-100/70 text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* NODE - Điểm nút popping */}
                    <motion.div
                      variants={nodeVariants}
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1f5a40] border-2 border-emerald-300 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(110,231,183,0.4)]"
                    >
                      <div className="text-emerald-300 scale-110">
                        {step.icon}
                      </div>
                    </motion.div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER INFO - Staggered fade up */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
          >
            {[
              { icon: <ShieldCheck />, title: "Chất Lượng Đảm Bảo", desc: "Mỗi mẻ trà đều được kiểm tra kỹ lưỡng trước khi đến tay người thưởng trà." },
              { icon: <Zap />, title: "Nguyên Liệu Tự Nhiên", desc: "100% búp trà tự nhiên, canh tác bền vững, không hóa chất." },
              { icon: <Box />, title: "Bao Bì Sinh Thái", desc: "Bao bì thân thiện môi trường, dễ tái chế." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="text-emerald-300 mb-6 scale-150">
                  {item.icon}
                </div>
                <h4 className="text-white md:text-2xl text-xl font-decoration font-semibold mb-3">
                  {item.title}
                </h4>
                <p className="text-emerald-100/60 md:text-base text-sm leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Latest Blog Posts */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">

          {/* HEADER CHUNG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className=" text-emerald-600 font-semibold font-medium uppercase tracking-[0.30em] text-[10px] md:text-xs">
              Kiến thức về trà
            </span>

            <h2 className="text-4xl md:text-5xl font-decoration font-semibold text-neutral-900 mt-6 md:mb-6 mb-4 leading-tight"
            >
              Bài Viết{' '}
              <span className="italic font-normal text-emerald-600">
                Mới Nhất
              </span>
            </h2>

            <div className="w-12 h-[1px] bg-emerald-200 mx-auto mb-3" />
            <p className="max-w-2xl mx-auto text-neutral-500 md:text-lg text-base leading-loose">
              Khám phá những câu chuyện tâm tình về trà, từ nghệ thuật pha chế đến
              những giá trị tinh tế cho sức khỏe.
            </p>

          </motion.div>

          {/* GRID BÀI VIẾT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {latestBlogs.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-1.5 rounded-full bg-primary backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[11px] text-neutral-400 tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{post.readTime} phút đọc</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>

                    <p className="text-neutral-500 text-sm line-clamp-2 mb-6 leading-relaxed font-light">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all">
                      Đọc chi tiết
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* NÚT XEM TẤT CẢ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-20"
          >
            <Link to="/blog">
              <CustomButton
                variant="outline"
                size="lg"
                className="
                  bg-primary text-white border border-primary transition-all duration-500 ease-out 
                  hover:bg-primary/90 hover:text-emerald-50 hover:shadow-[0_8px_20px_-8px_rgba(16,120,87,0.6)]"
              >
                Xem tất cả bài viết
                <ArrowRight className="w-5 h-5" />
              </CustomButton>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
