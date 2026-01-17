import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight
} from 'lucide-react';

const footerLinkClass =
  "relative inline-block text-tea-200/70 text-sm transition-all duration-300 " +
  "hover:text-emerald-400 hover:translate-x-1 flex items-center gap-1 group";

export const Footer = () => {
  return (
    <footer className="relative text-tea-100 overflow-hidden bg-[#051510]">

      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2318] via-[#051510] to-[#0d1f17]">
          <img
            src="https://cdn3.ivivu.com/2023/02/%C4%90%E1%BB%93i-ch%C3%A8-M%E1%BB%99c-Ch%C3%A2u-ivivu-1.jpg"
            alt="Đồi chè background"
            className="
              w-full h-full 
              object-cover object-[center_35%]
              opacity-40
              scale-105
              brightness-[0.85]
              contrast-[1.1]
              saturate-[0.9]
            "
            loading="lazy"
          />
        </div>

        <div className="
          absolute inset-0
          bg-gradient-to-b
          from-[#051510]/75
          via-[#051510]/50
          to-[#051510]/85
        " />

        <div className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,21,16,0.4)_70%,rgba(5,21,16,0.8)_100%)]
        " />

      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          <div className="space-y-6">
            <div className="flex flex-col items-start gap-6 max-w-fit">
              <Link
                to="/"
                className="flex flex-col items-start gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative md:w-14 md:h-14 w-12 h-12 group"
                  >
                    <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/25 group-hover:bg-emerald-400/45 transition-all duration-500" />

                    <div className="relative w-full h-full rounded-full flex items-center justify-center border border-emerald-200/20 bg-emerald-50/5 backdrop-blur-lg shadow-inner overflow-hidden transition-all duration-400 group-hover:border-emerald-300/40 group-hover:shadow-emerald-500/15">
                      <img
                        src="/logo2.png"
                        alt="VietNihon Tea"
                        className="w-10 h-10 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                      />
                    </div>
                  </motion.div>

                  <div className="flex flex-col -space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-decoration font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300"
                      >
                        Viet<span
                          className="text-2xl font-decoration font-semibold tracking-wide text-emerald-400 italic transition-colors duration-300 group-hover:text-emerald-300"
                        >
                          Nihon
                        </span>
                      </span>
                      <span className="text-2xl font-decoration font-medium text-emerald-200/90 tracking-wider">
                        Tea
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-1">
                      <div className="h-px w-4 bg-emerald-400/50 group-hover:bg-emerald-300 transition-colors duration-400" />
                      <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-emerald-300/70 group-hover:text-emerald-200 transition-colors duration-300">
                        Pure Harmony
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <p className="text-emerald-200/70 text-sm leading-relaxed italic max-w-xs md:max-w-sm font-light">
                "Hòa quyện tinh hoa trà Việt với sự thanh tịnh của Nhật Bản – mỗi tách trà là một hành trình về nguồn."
              </p>
            </div>

            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:text-[#051510] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Cột 2: Danh mục sản phẩm */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Sản phẩm</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products?category=nguyen-la" className={footerLinkClass}>
                  Trà Nguyên Lá <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link to="/products?category=matcha" className={footerLinkClass}>
                  Matcha Cao Cấp <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link to="/products?category=tui-loc" className={footerLinkClass}>
                  Trà Túi Lọc Tiện Lợi <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link to="/products?category=tra-nhat" className={footerLinkClass}>
                  Tinh Hoa Trà Nhật <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Hỗ trợ</h3>
            <ul className="space-y-4">
              <li><Link to="/guide" className={footerLinkClass}>Hướng dẫn mua hàng</Link></li>
              <li><Link to="/return-policy" className={footerLinkClass}>Chính sách đổi trả</Link></li>
              <li><Link to="/shipping-policy" className={footerLinkClass}>Chính sách vận chuyển</Link></li>
              <li><Link to="/faq" className={footerLinkClass}>Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Cột 4: Thông tin liên hệ */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Liên hệ</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-[#051510]" />
                </div>
                <p className="text-sm text-tea-200/70 leading-snug">
                  123 Đường Trà Xanh, Phường Bến Nghé, Quận 1, TP.HCM
                </p>
              </div>

              <a href="tel:19001234" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:text-[#051510]" />
                </div>
                <span className="text-sm text-tea-200/70 font-bold tracking-wider">1900 1234</span>
              </a>

              <a href="mailto:hello@traxanhviet.vn" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-400 group-hover:text-[#051510]" />
                </div>
                <span className="text-sm text-tea-200/70">hello@traxanhviet.vn</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-10 border-t border-emerald-900/20 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-lg">
        <div className="container mx-auto px-6 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm tracking-wide text-emerald-200/60 font-light">
            <p className="flex items-center gap-2">
              © {new Date().getFullYear()} VietNihon Tea
              <span className="text-emerald-400/70">·</span>
              <span className="italic">Pure Harmony of Vietnam & Japan</span>
            </p>

            <div className="flex items-center gap-8 md:gap-10">
              <Link
                to="/privacy"
                className="hover:text-emerald-300 transition-colors duration-300 hover:underline underline-offset-4"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="hover:text-emerald-300 transition-colors duration-300 hover:underline underline-offset-4"
              >
                Điều khoản dịch vụ
              </Link>
              <Link
                to="/contact"
                className="hover:text-emerald-300 transition-colors duration-300 hover:underline underline-offset-4"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};