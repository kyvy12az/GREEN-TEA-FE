import { motion } from "framer-motion";
import { Leaf, Coffee, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeaLeafAnalyzer } from "@/components/TeaLeafAnalyzer";
import { TeaTypeAnalyzer } from "@/components/TeaTypeAnalyzer";
import { FloatingLeaves } from "@/components/FloatingLeaves";

const Identify = () => {
  return (
    <motion.div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={"https://file.hstatic.net/1000075078/article/2_40694d37404e49319f9d46392cebdf28.jpg"}
            alt="Đồi trà xanh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-tea-900/80 via-tea-800/60 to-transparent" />
        </motion.div>

      <FloatingLeaves />

      {/* Hero Section */}
      <header className="relative z-10 pt-12 pb-8 px-4 mt-14">
        <div className="max-w-4xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-decoration font-semibold mb-4 drop-shadow-lg"
          >
            Nhận diện{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tea-600 to-tea-800 drop-shadow-sm">
              Trà thông minh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-tea-10 font-medium max-w-3xl mx-auto drop-shadow-md italic"
          >
            Chụp ảnh lá trà để phát hiện bệnh hoặc nhận diện loại trà với công nghệ AI tiên tiến.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="disease" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/80 backdrop-blur-md shadow-lg border border-tea-200">
              <TabsTrigger
                value="disease"
                className="data-[state=active]:bg-tea-500 data-[state=active]:text-white data-[state=active]:shadow-md gap-2"
              >
                <Leaf className="w-4 h-4" />
                Nhận diện bệnh
              </TabsTrigger>
              <TabsTrigger
                value="type"
                className="data-[state=active]:bg-tea-500 data-[state=active]:text-white gap-2"
              >
                <Coffee className="w-4 h-4" />
                Nhận diện loại trà
              </TabsTrigger>
            </TabsList>

            <TabsContent value="disease">
              <TeaLeafAnalyzer />
            </TabsContent>

            <TabsContent value="type">
              <TeaTypeAnalyzer />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Identify;
