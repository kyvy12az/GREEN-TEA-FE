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
      <section className="relative py-32 bg-tea-50/50 overflow-hidden">

        {/* Animated Background Decorations */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]"
        />

        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block text-primary tracking-[0.35em] uppercase text-xs mb-4 font-medium"
            >
              Health · Ritual · Value
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-decoration font-semibold text-tea-950 mb-6"
            >
              Tinh Hoa{" "}
              <span className="italic text-primary">Trà Xanh</span>{" "}
              Được Tạo Nên
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-tea-700/70 font-decoration text-lg md:text-xl leading-loose italic"
            >
              Trà không chỉ là thức uống,
              mà là một nghi lễ nuôi dưỡng thân – tâm – trí.
            </motion.p>
          </motion.div>

          {/* ===== 2 CỘT: ẢNH + BIỂU ĐỒ ===== */}
          <div
            // ref={chartRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32"
          >
            {/* CỘT ẢNH */}
            <motion.div className="relative group" variants={fadeInLeft}>
              <div>
                <img
                  src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/12/22/photo-1640156148046-1640156148191631657468.jpg"
                  alt="Tea Ritual"
                  className="rounded-[3rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)]"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-lg"
              >
                <p
                  className="italic font-decoration text-tea-800 md:text-sm text-xs"
                >
                  “Mỗi chén trà là một khoảnh khắc
                  trở về với chính mình.”
                </p>
              </motion.div>
            </motion.div>

            {/* CỘT BIỂU ĐỒ */}
            <div className="space-y-10">
              {teaValues.map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <div className="flex justify-between mb-3">
                    <span
                      className="text-tea-900 text-lg"
                    >
                      {item.label}
                    </span>
                    <span className="text-primary font-medium">
                      {item.value}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-emerald-100 overflow-hidden">
                    <motion.div
                      variants={barVariants(item.value)}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-primary transition-all duration-[1400ms] ease-out"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative bg-white p-8 lg:p-10 rounded-[2.5rem]
                  shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]
                  transition-all duration-500 group border border-tea-100/50
                  cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${benefit.bg}`} />

                <div className={`relative w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center mb-8 
                  group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 
                  shadow-lg ${benefit.shadow}`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-tea-950 mb-4 
                  group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>

                <p className="text-tea-800/60 text-sm leading-relaxed italic font-decoration">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative py-28 md:py-36 overflow-hidden mb-10 bg-[#0a1f16]"
      >
        {/* BACKGROUND LÁ TRÀ - Có hiệu ứng Zoom nhẹ khi cuộn tới */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://file.hstatic.net/1000075078/article/2_40694d37404e49319f9d46392cebdf28.jpg"
            alt="Tea leaves background"
            className="w-full h-full object-cover brightness-[0.7] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#163a2a]/95 via-[#1f5a40]/70 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">

            {/* CỘT TRÁI – NỘI DUNG */}
            <motion.div
              variants={fadeInUp}
              className="w-full lg:w-1/2 text-white"
            >
              <motion.h2 variants={fadeInUp} className="leading-snug mb-8 tracking-wide font-decoration">
                <span className="block text-3xl md:text-5xl font-light font-semibold text-white">
                  Khám Phá Hương Vị
                </span>
                <span className="block text-3xl md:text-5xl font-semibold italic text-tea-300 mt-3 drop-shadow-lg">
                  Trà Việt Nam
                </span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="max-w-xl text-white/80 text-base md:text-lg leading-loose">
                Chúng tôi chọn lọc những búp trà tinh khiết từ các vùng núi cao,
                nơi thiên nhiên, con người và thời gian cùng nhau tạo nên
                hương vị trà thuần khiết của Việt Nam.
              </motion.p>
            </motion.div>

            {/* CỘT PHẢI – ẢNH TRÀ ĐẠO (Hiệu ứng thác đổ cho Grid) */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {[
                  "https://vienhuyethoc.vn/wp-content/uploads/2023/01/tra-xanh-117.jpg",
                  "https://chantamtra.vn/public/upload/kham-pha-tra-ngon-nhat-viet-nam-chan-tam-tra%20(4).jpg",
                  "https://bantradienthongminh.vn/wp-content/uploads/chen-tra-bat-trang.jpg",
                  "https://image-us.24h.com.vn/upload/4-2019/images/2019-12-26/1577343027-764-5-cong-thuc-duong-da-lam-dep-it-biet-cua-tra-xanh-giup-nang-tiet-kiem-hau-bao-2-1576492426-width650height433.jpg",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    variants={imageVariant}
                    whileHover={{
                      scale: 1.05,
                      rotate: i % 2 === 0 ? -1 : 1,
                      transition: { duration: 0.3 }
                    }}
                    className={`aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 
                             ${i % 2 !== 0 ? 'mt-8' : ''} /* Tạo layout lệch so le đẹp mắt */`}
                  >
                    <img
                      src={src}
                      alt="Vietnam tea ceremony"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

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
