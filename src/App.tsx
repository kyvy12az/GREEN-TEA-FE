import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallback from './pages/AuthCallback';
import EmailVerificationPage from './pages/EmailVerificationPage';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import MyPostsPage from './pages/MyPostsPage';
import CreatePostPage from './pages/CreatePostPage';
import ProcessPage from './pages/ProcessPage';
import Diseases from './pages/Diseases';
import Identify from './pages/Identify';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AboutPage from './pages/AboutPage';
import { useAuthStore } from './store/authStore';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import TeaAssistantPage from './pages/TeaAssistantPage';
// import { Toaster as HotToaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        {/* <HotToaster /> */}
        <Routes>
          {/* Auth pages without Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Main pages with Layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/product/:slug" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogDetailPage /></Layout>} />
          <Route path="/process" element={<Layout><ProcessPage /></Layout>} />
          <Route path="/diseases" element={<Layout><Diseases /></Layout>} />
          <Route path='/identify' element={<Layout><Identify /></Layout>} />
          <Route path='/about' element={<Layout><AboutPage /></Layout>} />
          <Route path="/tea-assistant" element={<TeaAssistantPage></TeaAssistantPage>} />

          {/* Protected pages */}
          <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Layout><OrderHistoryPage /></Layout></ProtectedRoute>} />
          <Route path="/orders/:orderId" element={<ProtectedRoute><Layout><OrderDetailPage /></Layout></ProtectedRoute>} />
          <Route path="/my-posts" element={<ProtectedRoute><Layout><MyPostsPage /></Layout></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><Layout><CreatePostPage /></Layout></ProtectedRoute>} />
          <Route path="/edit-post/:id" element={<ProtectedRoute><Layout><CreatePostPage /></Layout></ProtectedRoute>} />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
