import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { FloatingLeaves } from "@/components/FloatingLeaves";
// import { Navbar } from "@/components/Navbar";
import { DiseaseLibrary } from "@/components/DiseaseLibrary";

const Diseases = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingLeaves />

      {/* Hero Section */}
      <header className="relative z-10 pt-12 pb-8 px-4 mt-14">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-decoration font-semibold mb-4"
          >
            Thư viện{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tea-500 to-tea-700">
              Bệnh lá trà
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-tea-500 max-w-3xl mx-auto"
          >
            Tìm hiểu chi tiết về các bệnh phổ biến trên cây trà, triệu chứng nhận biết và cách phòng trị hiệu quả.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <DiseaseLibrary />
        </div>
      </main>
    </div>
  );
};

export default Diseases;
