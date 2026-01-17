import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Heart, 
  Award, 
  Users, 
  Target, 
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import type { Easing } from 'framer-motion';

// Animation variants
const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: easeOut }
  }
};

// Data
const coreValues = [
  {
    icon: Heart,
    title: 'Tận Tâm',
    description: 'Chúng tôi đặt tâm huyết vào từng sản phẩm, từ khâu chọn lựa nguyên liệu đến quy trình chế biến tỉ mỉ.',
    color: 'bg-rose-500/10 text-rose-600'
  },
  {
    icon: Award,
    title: 'Chất Lượng',
    description: 'Cam kết mang đến những sản phẩm trà đạt tiêu chuẩn cao nhất, được kiểm định nghiêm ngặt.',
    color: 'bg-amber-500/10 text-amber-600'
  },
  {
    icon: Leaf,
    title: 'Tự Nhiên',
    description: 'Sử dụng 100% nguyên liệu tự nhiên, không chất bảo quản, an toàn cho sức khỏe người tiêu dùng.',
    color: 'bg-tea-500/10 text-tea-600'
  },
  {
    icon: Users,
    title: 'Cộng Đồng',
    description: 'Hỗ trợ nông dân địa phương, phát triển bền vững và xây dựng cộng đồng yêu trà Việt.',
    color: 'bg-blue-500/10 text-blue-600'
  }
];

const milestones = [
  { year: '2010', title: 'Khởi Nguồn', description: 'Thành lập với niềm đam mê trà Việt và mong muốn lan tỏa văn hóa trà.' },
  { year: '2015', title: 'Mở Rộng', description: 'Khai trương chuỗi cửa hàng đầu tiên và xây dựng hệ thống phân phối toàn quốc.' },
  { year: '2018', title: 'Đổi Mới', description: 'Ra mắt dòng sản phẩm trà hữu cơ cao cấp, đạt chứng nhận quốc tế.' },
  { year: '2020', title: 'Số Hóa', description: 'Phát triển nền tảng thương mại điện tử, mang trà Việt đến gần hơn với khách hàng.' },
  { year: '2024', title: 'Vươn Xa', description: 'Xuất khẩu sang 10 quốc gia, khẳng định vị thế trà Việt trên thị trường quốc tế.' }
];

const teamMembers = [
  {
    name: 'Nguyễn Minh Hoàng',
    role: 'Nhà Sáng Lập & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: '15 năm kinh nghiệm trong ngành trà, tốt nghiệp Đại học Nông Lâm TP.HCM.'
  },
  {
    name: 'Trần Thu Hà',
    role: 'Giám Đốc Sản Phẩm',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Chuyên gia thẩm trà với chứng chỉ Tea Sommelier quốc tế.'
  },
  {
    name: 'Lê Văn Đức',
    role: 'Trưởng Phòng R&D',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Tiến sĩ Công nghệ Thực phẩm, nghiên cứu về chiết xuất hoạt chất từ trà.'
  },
  {
    name: 'Phạm Thị Mai',
    role: 'Giám Đốc Trải Nghiệm',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: '10 năm trong lĩnh vực F&B, chuyên gia về trải nghiệm khách hàng.'
  }
];

const stats = [
  { value: '14+', label: 'Năm Kinh Nghiệm' },
  { value: '50K+', label: 'Khách Hàng' },
  { value: '100+', label: 'Sản Phẩm' },
  { value: '10', label: 'Quốc Gia Xuất Khẩu' }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-tea-50 via-background to-earth-50 dark:from-tea-950/20 dark:via-background dark:to-earth-950/20" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-tea-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tea-100 dark:bg-tea-900/30 text-tea-700 dark:text-tea-300 text-sm font-medium">
                <Leaf className="w-4 h-4" />
                Về Trà Xanh Việt
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Lan Tỏa Tinh Hoa 
              <span className="text-tea-600 dark:text-tea-400"> Trà Việt </span>
              Đến Mọi Nhà
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Hơn 14 năm đồng hành cùng người yêu trà, chúng tôi tự hào mang đến những sản phẩm 
              trà chất lượng cao, kết hợp tinh hoa truyền thống và công nghệ hiện đại.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/products">
                  Khám Phá Sản Phẩm
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/process">Xem Quy Trình</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-tea-600 dark:bg-tea-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-tea-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInLeft}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop"
                  alt="Đồi trà xanh Việt Nam"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -right-4 md:right-8 bg-card p-6 rounded-xl shadow-lg border border-border max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-tea-100 dark:bg-tea-900/50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Sứ Mệnh</div>
                    <div className="text-sm text-muted-foreground">Của chúng tôi</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Đưa trà Việt Nam vươn tầm thế giới, trở thành biểu tượng của chất lượng và văn hóa.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInRight}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-300 text-sm font-medium mb-4">
                Câu Chuyện Của Chúng Tôi
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Từ Đam Mê Đến <span className="text-tea-600">Sứ Mệnh</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Trà Xanh Việt được thành lập vào năm 2010 bởi một nhóm những người đam mê trà, 
                  với mong muốn mang đến cho người tiêu dùng Việt Nam những sản phẩm trà chất lượng cao, 
                  an toàn và mang đậm hương vị truyền thống.
                </p>
                <p>
                  Chúng tôi hợp tác trực tiếp với các vùng trà nổi tiếng như Thái Nguyên, Lâm Đồng, 
                  Hà Giang... để đảm bảo nguồn nguyên liệu tươi ngon nhất. Mỗi lá trà đều được 
                  chọn lựa kỹ càng, chế biến theo quy trình khép kín, giữ trọn hương vị tự nhiên.
                </p>
                <p>
                  Sau hơn 14 năm phát triển, Trà Xanh Việt tự hào là thương hiệu được hàng chục 
                  nghìn khách hàng tin tưởng, với mạng lưới phân phối rộng khắp cả nước và xuất 
                  khẩu sang 10 quốc gia trên thế giới.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-tea-600" />
                  100% Tự Nhiên
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-tea-600" />
                  Chứng Nhận ISO
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-tea-600" />
                  Organic Certified
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-tea-100 dark:bg-tea-900/30 text-tea-700 dark:text-tea-300 text-sm font-medium mb-4">
              Giá Trị Cốt Lõi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Những Giá Trị Chúng Tôi <span className="text-tea-600">Theo Đuổi</span>
            </h2>
            <p className="text-muted-foreground">
              Mỗi sản phẩm của Trà Xanh Việt đều được tạo ra dựa trên những giá trị cốt lõi, 
              định hướng mọi hoạt động của chúng tôi.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-5`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-earth-100 dark:bg-earth-900/30 text-earth-700 dark:text-earth-300 text-sm font-medium mb-4">
              Hành Trình Phát Triển
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cột Mốc <span className="text-tea-600">Quan Trọng</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-tea-200 dark:bg-tea-800 -translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-tea-600 border-4 border-background -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <span className="inline-block px-3 py-1 rounded-full bg-tea-100 dark:bg-tea-900/30 text-tea-700 dark:text-tea-300 text-sm font-bold mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-tea-100 dark:bg-tea-900/30 text-tea-700 dark:text-tea-300 text-sm font-medium mb-4">
              Đội Ngũ Của Chúng Tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Những Người <span className="text-tea-600">Tâm Huyết</span>
            </h2>
            <p className="text-muted-foreground">
              Gặp gỡ những con người đứng sau thành công của Trà Xanh Việt - 
              những chuyên gia đam mê và tận tâm với nghề.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-tea-600 dark:text-tea-400 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInLeft}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-tea-100 dark:bg-tea-900/30 text-tea-700 dark:text-tea-300 text-sm font-medium mb-4">
                Liên Hệ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Kết Nối Với <span className="text-tea-600">Chúng Tôi</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Bạn có câu hỏi hoặc muốn hợp tác? Đừng ngần ngại liên hệ với chúng tôi. 
                Đội ngũ Trà Xanh Việt luôn sẵn sàng hỗ trợ bạn.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tea-100 dark:bg-tea-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Địa Chỉ</h4>
                    <p className="text-muted-foreground text-sm">
                      123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tea-100 dark:bg-tea-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Hotline</h4>
                    <p className="text-muted-foreground text-sm">1900 1234 56</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tea-100 dark:bg-tea-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">info@traxanhviet.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tea-100 dark:bg-tea-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Giờ Làm Việc</h4>
                    <p className="text-muted-foreground text-sm">
                      Thứ 2 - Thứ 7: 8:00 - 18:00<br />
                      Chủ nhật: 9:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInRight}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-tea-100 dark:bg-tea-900/30 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-tea-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Gửi Tin Nhắn</h3>
                    <p className="text-sm text-muted-foreground">Chúng tôi sẽ phản hồi trong 24h</p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Họ và tên</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-tea-500/20 focus:border-tea-500 transition-all"
                      placeholder="Nhập họ và tên..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-tea-500/20 focus:border-tea-500 transition-all"
                      placeholder="Nhập email..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nội dung</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-tea-500/20 focus:border-tea-500 transition-all resize-none"
                      placeholder="Nhập nội dung tin nhắn..."
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-xl py-6">
                    Gửi Tin Nhắn
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-tea-600 to-tea-700 dark:from-tea-700 dark:to-tea-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sẵn Sàng Trải Nghiệm Trà Việt Đích Thực?
            </h2>
            <p className="text-tea-100 text-lg mb-8">
              Khám phá bộ sưu tập trà đa dạng của chúng tôi và tìm hương vị phù hợp với bạn.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                <Link to="/products">
                  Mua Sắm Ngay
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link to="/#ai-recommendation">Tư Vấn AI</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
