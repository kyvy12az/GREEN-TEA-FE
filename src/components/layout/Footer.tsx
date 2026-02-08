import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import teaBackground from '@/assets/hero-tea-plantation.jpg';
import { motion } from 'framer-motion';

const footerLinks = {
  products: [
    { name: 'Trà Nguyên Lá', path: '/products?category=nguyen-la' },
    { name: 'Matcha', path: '/products?category=matcha' },
    { name: 'Trà Túi Lọc', path: '/products?category=tui-loc' },
    { name: 'Trà Nhật Bản', path: '/products?category=tra-nhat' },
  ],
  support: [
    { name: 'Hướng dẫn mua hàng', path: '/guide' },
    { name: 'Chính sách đổi trả', path: '/return-policy' },
    { name: 'Chính sách vận chuyển', path: '/shipping-policy' },
    { name: 'Câu hỏi thường gặp', path: '/faq' },
  ],
  company: [
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Blog & Kiến thức', path: '/blog' },
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Tuyển dụng', path: '/careers' },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${teaBackground})`,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tea-900/90 via-tea-900/95 to-tea-950/98" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-14 h-14"
                >
                  <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/30 group-hover:bg-emerald-400/50 transition-all duration-500" />
                  <div className="relative w-full h-full rounded-full flex items-center justify-center border border-emerald-200/20 bg-emerald-50/5 backdrop-blur-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:border-emerald-300/50 group-hover:shadow-emerald-500/20">
                    <img
                      src="/logo2.png"
                      alt="VietNihon Tea"
                      className="w-10 h-10 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                <div className="flex flex-col -space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-decoration font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
                      Viet<span className="text-emerald-400 italic group-hover:text-emerald-300">Nihon</span>
                    </span>
                    <span className="text-2xl font-decoration font-medium text-emerald-200/90 tracking-wider">
                      Tea
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-1">
                    <div className="h-px w-4 bg-emerald-400/50 group-hover:bg-emerald-300 transition-colors duration-300" />
                    <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-emerald-300/70 group-hover:text-emerald-200 transition-colors duration-300">
                      Pure Harmony
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <p className="text-emerald-200/70 text-sm leading-relaxed italic max-w-xs font-light">
              "Hòa quyện tinh hoa trà Việt với sự thanh tịnh của Nhật Bản – mỗi tách trà là một hành trình về nguồn."
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              Sản phẩm
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2.5 text-emerald-200/75 hover:text-emerald-300 transition-all duration-300 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              Hỗ trợ
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2.5 text-emerald-200/75 hover:text-emerald-300 transition-all duration-300 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full" />
              Liên hệ
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: '123 Đường Trà Xanh, Quận 1, TP. Hồ Chí Minh',
                  href: null,
                },
                {
                  icon: Phone,
                  content: '1900 1234',
                  href: 'tel:19001234',
                },
                {
                  icon: Mail,
                  content: 'hello@traxanhviet.vn',
                  href: 'mailto:hello@traxanhviet.vn',
                },
              ].map(({ icon: Icon, content, href }, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-emerald-400/20 group-hover:bg-emerald-500/25 group-hover:border-emerald-400/40 transition-all duration-300">
                    <Icon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-emerald-200/75 hover:text-emerald-300 transition-colors duration-300 text-sm leading-relaxed pt-2"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="text-emerald-200/75 text-sm leading-relaxed pt-2">
                      {content}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 border-t border-emerald-800/10 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-emerald-200/60">
            <p className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} VietNihon Tea</span>
              <span className="text-emerald-400/50">·</span>
              <span className="italic font-light">Pure Harmony of Vietnam & Japan</span>
            </p>

            <div className="flex items-center gap-8">
              {[
                { name: 'Chính sách bảo mật', path: '/privacy' },
                { name: 'Điều khoản dịch vụ', path: '/terms' },
                { name: 'Liên hệ', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-emerald-300 transition-all duration-300 hover:underline underline-offset-4 decoration-emerald-400/50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
