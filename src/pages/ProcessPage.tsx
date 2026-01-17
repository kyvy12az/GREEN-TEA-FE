import { motion } from 'framer-motion';
import { 
  Leaf, 
  Sun, 
  Flame, 
  HandMetal, 
  Wind, 
  Shield, 
  Package, 
  Heart,
  Award,
  Users,
  Eye,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data cho 8 bước quy trình
const processSteps = [
  {
    step: 1,
    title: 'Thu hái thủ công',
    description: 'Hái bằng tay vào sáng sớm, chỉ lấy 1 tôm 2–3 lá non từ đồi trà Thái Nguyên/Mộc Châu.',
    icon: HandMetal,
    image: 'https://cerafoods.com/wp-content/uploads/2023/12/tra-xanh-moc-chau-3.png',
  },
  {
    step: 2,
    title: 'Làm héo tự nhiên',
    description: 'Lá được làm héo nhẹ trong bóng râm 4–8 giờ để giảm độ ẩm, giữ hương vị tươi.',
    icon: Sun,
    image: 'https://www.tea-machines.com/uploads/tea-withering-machine-1.png',
  },
  {
    step: 3,
    title: 'Diệt men (Fixing)',
    description: 'Sao hoặc hấp ở nhiệt độ cao để dừng oxy hóa, giữ màu xanh và dưỡng chất.',
    icon: Flame,
    image: 'https://vitas.org.vn/wp-content/uploads/2021/08/diet-men-op-che-Tan-Cuong-Cong-nghe-cao-01-1.jpg',
  },
  {
    step: 4,
    title: 'Vò / Xào trà',
    description: 'Vò nhẹ để phá vỡ tế bào, giải phóng tinh dầu, tạo hình que cong đẹp mắt.',
    icon: Leaf,
    image: 'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20170913/05c65778ac0949a3a6faf42a0f545ea1.jpeg',
  },
  {
    step: 5,
    title: 'Sấy khô & Làm nguội',
    description: 'Sấy kiểm soát nhiệt độ để giữ hương thơm, sau đó làm nguội tự nhiên.',
    icon: Wind,
    image: 'https://maysayhaitan.com/wp-content/uploads/2020/04/nguyen-ly-say-lanh-tren-may-say-thuc-pham-la-gi-to.jpg',
  },
  {
    step: 6,
    title: 'Phân loại & Kiểm tra',
    description: 'Phân loại bằng tay/máy, kiểm tra chất lượng nghiêm ngặt (VietGAP, hữu cơ).',
    icon: Shield,
    image: '/images/pictures/phanloai-kiemtra.jpg',
  },
  {
    step: 7,
    title: 'Đóng gói & Bảo quản',
    description: 'Đóng gói hút chân không/túi zip, bảo quản nơi khô ráo để giữ độ tươi.',
    icon: Package,
    image: 'https://shintea.com/upload/image/che%20thai%20nguyen%20dong%20goi/phoi%20che%20thai%20nguyen%20truoc%20khi%20che%20bien.jpg',
  },
  {
    step: 8,
    title: 'Đến tay bạn',
    description: 'Từ nông trại đến bạn – cam kết minh bạch và bền vững.',
    icon: Heart,
    image: '/images/pictures/camket.jpg',
  },
];

const commitments = [
  {
    icon: Shield,
    title: 'Không thuốc trừ sâu',
    description: 'Canh tác hữu cơ 100%, an toàn cho sức khỏe',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: Award,
    title: 'VietGAP/Hữu cơ',
    description: 'Chứng nhận chất lượng quốc gia và quốc tế',
    color: 'from-green-500 to-lime-600',
  },
  {
    icon: Users,
    title: 'Hỗ trợ nông dân',
    description: 'Mua trực tiếp, giá công bằng, cải thiện đời sống',
    color: 'from-lime-500 to-emerald-600',
  },
  {
    icon: Eye,
    title: 'Minh bạch nguồn gốc',
    description: 'Truy xuất từng lô hàng, rõ ràng xuất xứ',
    color: 'from-teal-500 to-green-600',
  },
];

// Component ProcessStepCard
const ProcessStepCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className={`flex flex-col lg:flex-row gap-8 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content Card */}
        <div className="flex-1 w-full">
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(21, 128, 61, 0.2)' }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-50 hover:border-green-200 transition-all duration-300"
          >
            {/* Step Number & Icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-decoration font-bold text-white">{step.step}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-green-700" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-decoration font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </div>

        {/* Image */}
        <div className="flex-1 w-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-80 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Timeline Connector (SVG Path) */}
      {index < processSteps.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 top-full -translate-x-1/2 h-24 w-1">
          <svg className="w-full h-full" viewBox="0 0 2 96" fill="none">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
              d="M1 0 Q1 48, 1 96"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const ProcessPage = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.nhatbanaz.com/wp-content/uploads/3322_pixta_30838512_L.jpg"
            alt="Tea plantation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-800/50 to-green-900/70" />
          
          {/* Animated Leaves (optional decoration) */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-20 h-20 opacity-20"
          >
            <Leaf className="w-full h-full text-green-300" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-32 right-20 w-24 h-24 opacity-20"
          >
            <Leaf className="w-full h-full text-green-300" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <Leaf className="w-10 h-10 text-green-300" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl font-decoration font-semibold text-white mb-6 leading-tight"
            >
              Hành Trình Tạo Nên
              <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                Tinh Hoa Trà Xanh
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8 italic leading-relaxed"
            >
              Từ lá non Việt Nam đến tách trà thanh tịnh Nhật Bản
              <br />
              <span className="text-green-200">– mỗi bước đều là sự tôn trọng thiên nhiên</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full shadow-2xl flex items-center gap-2 mx-auto hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
                >
                  Khám phá sản phẩm
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                VietNihon Tea Process
              </div>
              <h2 className="text-4xl md:text-5xl font-decoration font-semibold text-gray-900 mb-6">
                Quy trình là <span className="text-green-600">trái tim</span> của chất lượng
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Tại VietNihon Tea, chúng tôi tin rằng mỗi tách trà xanh tuyệt vời đều bắt đầu từ một quy trình tỉ mỉ. 
                Từ những đồi chà Thái Nguyên và Mộc Châu, chúng tôi thu hái thủ công từng lá non, 
                qua 8 bước sản xuất nghiêm ngặt để đem đến cho bạn hương vị tinh túy nhất.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Chúng tôi cam kết minh bạch 100% về nguồn gốc, hỗ trợ nông dân địa phương với giá công bằng, 
                và đạt chuẩn VietGAP/hữu cơ. Mỗi sản phẩm đều mang theo câu chuyện của người trồng trà, 
                niềm tự hào Việt Nam và sự tinh tế Nhật Bản.
              </p>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Sạch sẽ, an toàn, bền vững</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/pictures/camket.jpg"
                  alt="Farmer picking tea"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold font-decoration text-gray-900">Chứng nhận</p>
                      <p className="text-xs text-gray-600">VietGAP & Hữu cơ</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / Journey Section */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
              8 Bước Quy Trình
            </div>
            <h2 className="text-4xl md:text-5xl font-decoration font-bold text-gray-900 mb-4">
              Từ Đồi Trà Đến <span className="text-green-600">Tách Trà</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mỗi bước là một tâm huyết, mỗi giai đoạn là một nghệ thuật
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto space-y-24">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-decoration font-semibold text-gray-900 mb-4">
              Cam Kết Của Chúng Tôi 
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị cốt lõi làm nên VietNihon Tea
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(21, 128, 61, 0.15)' }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-50 hover:border-green-200 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-decoration font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-green-50/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-decoration font-semibold text-gray-900 mb-4">
                Xem Quy Trình Thực Tế
              </h2>
              <p className="text-lg text-gray-600">
                Video 90 giây đưa bạn đến đồi trà Thái Nguyên
              </p>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
              {!showVideo ? (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?w=1200&auto=format&fit=crop"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowVideo(true)}
                      className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center group hover:bg-green-50 transition-all duration-300"
                    >
                      <Play className="w-8 h-8 text-green-600 ml-1 group-hover:text-green-700" fill="currentColor" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                  <p className="text-center">
                    Video sẽ được nhúng tại đây
                    <br />
                    <span className="text-sm text-gray-400">(YouTube/Vimeo embed)</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;
