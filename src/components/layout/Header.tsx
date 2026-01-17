import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Leaf, Home, Wind, Users, Phone, User, LogOut, PenSquare, FileText, Library, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: "Trang chủ", path: "/", icon: <Home className="w-5 h-5" /> },
  { name: "Sản phẩm", path: "/products", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Blog", path: "/blog", icon: <Leaf className="w-5 h-5" /> },
  { name: "AI nhận diện", path: "/identify", icon: <Wind className="w-5 h-5" /> },
  { name: "Thư viện bệnh", path: "/diseases", icon: <Library className="w-5 h-5" /> },
  { name: "Về chúng tôi", path: "/about", icon: <Users className="w-5 h-5" /> },
];
export const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const screenVariants = {
    closed: {
      opacity: 0,
      y: "-100%", // Trượt từ trên xuống
      transition: {
        duration: 0.5,
        ease: [0.3, 0, 0.2, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.3, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    opened: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-card/95 backdrop-blur-md shadow-md'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group transition-all duration-300">
            {/* ICON CONTAINER - Enso + Lá trà V */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.98 }}
              className="relative md:w-14 w-12 md:h-14 h-12"
            >
              {/* Glow xanh lá nhẹ */}
              <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/20 group-hover:bg-emerald-400/40 transition-all duration-500" />

              {/* Vòng tròn Enso (Japanese zen) + glassmorphism xanh nhạt */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center border border-emerald-200/30 bg-emerald-50/10 backdrop-blur-lg shadow-inner overflow-hidden transition-all duration-400 group-hover:border-emerald-300/50 group-hover:shadow-emerald-500/10">
                {/* Logo SVG hoặc img - thay bằng file logo thực tế của bạn */}
                <img
                  src="/logo2.png"
                  alt="VietNihon Tea"
                  className="w-9 h-9 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* TEXT BRANDING - Hiện đại, fusion Việt-Nhật */}
            <div className="flex flex-col -space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-xl md:text-2xl font-decoration font-semibold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400"
                >
                  Viet<span
                    className="text-xl md:text-2xl font-decoration font-semibold text-emerald-600 dark:text-emerald-400 italic transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
                  >
                    Nihon
                  </span>
                </span>

                <span className="md:text-2xl text-xl font-decoration font-medium text-gray-700 dark:text-gray-300 tracking-wider">
                  Tea
                </span>
              </div>

              {/* Tagline nhỏ, tinh tế */}
              <div className="flex items-center gap-2.5">
                <div className="h-px w-4 bg-emerald-400/60 group-hover:bg-emerald-500 transition-colors duration-400" />
                <span className="md:text-[10px] text-[8px] font-medium tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  Pure Harmony
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary pb-1 group ${location.pathname === link.path
                  ? 'text-primary'
                  : 'text-foreground/80'
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            {/* <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button> */}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu - Authenticated */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-accent transition-colors">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">
                          {getInitials(user.name)}
                        </span>
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Hồ sơ cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center gap-2 cursor-pointer">
                      <Package className="w-4 h-4" />
                      Đơn hàng của tôi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-posts" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      Bài viết của tôi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/create-post" className="flex items-center gap-2 cursor-pointer">
                      <PenSquare className="w-4 h-4" />
                      Viết bài mới
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {/* Login - Desktop */}
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Đăng nhập
                </Link>

                {/* Login - Mobile */}
                <Link
                  to="/login"
                  className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label="Đăng nhập"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-accent transition-colors md:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {/* {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-card shadow-lg p-4 animate-slide-up">
            <div className="container mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={screenVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 bg-white z-[100] flex flex-col md:hidden"
          >
            {/* TOP BAR - Chứa nút đóng */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span className="font-serif italic text-emerald-950 tracking-widest font-bold">TRÀ XANH</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-full bg-neutral-50 text-neutral-900 transition-transform active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* LIST ITEMS - Căn giữa màn hình */}
            <nav className="flex-1 flex flex-col justify-center px-10 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-5 border-b border-neutral-50 group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon được thu nhỏ lại và tinh tế */}
                        <span className={`transition-colors duration-300 ${isActive ? 'text-emerald-600' : 'text-neutral-400 group-hover:text-emerald-600'}`}>
                          {link.icon}
                        </span>
                        <span
                          className={`text-xl font-serif tracking-wide transition-all duration-300 ${isActive ? 'text-emerald-950 font-bold' : 'text-neutral-500 group-hover:text-emerald-950'
                            }`}
                        >
                          {link.name}
                        </span>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeCircle"
                          className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* BOTTOM INFO */}
            <motion.div
              variants={itemVariants}
              className="p-10 bg-neutral-50 flex flex-col gap-6"
            >
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Liên hệ với chúng tôi</p>
                <p className="text-emerald-950 font-serif italic text-sm">hotline@traxanhviet.com</p>
              </div>

              <div className="flex gap-6">
                {['Facebook', 'Instagram', 'Zalo'].map((social) => (
                  <span key={social} className="text-xs font-bold text-neutral-400 hover:text-emerald-600 transition-colors cursor-pointer">
                    {social}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
