import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Leaf, Loader2, AlertCircle, CheckCircle, XCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface AnalysisResult {
  isHealthy: boolean;
  diseaseName?: string;
  diseaseNameEn?: string;
  severity: "none" | "mild" | "moderate" | "severe";
  symptoms?: string[];
  cause?: string;
  treatment?: string[];
  prevention?: string[];
  additionalNotes?: string;
  rawAnalysis?: string;
}

const severityConfig = {
  none: { label: "Không có bệnh", color: "text-tea-600", bg: "bg-tea-100" },
  mild: { label: "Nhẹ", color: "text-yellow-600", bg: "bg-yellow-100" },
  moderate: { label: "Trung bình", color: "text-orange-600", bg: "bg-orange-100" },
  severe: { label: "Nặng", color: "text-red-600", bg: "bg-red-100" },
};

export function TeaLeafAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cache, setCache] = useState<Map<string, AnalysisResult>>(new Map());
  const { toast } = useToast();

  const handleFileChange = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file hình ảnh",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Lỗi",
        description: "Kích thước file không được vượt quá 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setCurrentFile(file);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleAnalyze = async () => {
    if (!image || !currentFile) return;

    // Tạo cache key từ file metadata
    const cacheKey = `${currentFile.name}-${currentFile.size}-${currentFile.lastModified}`;
    
    // Kiểm tra cache trước
    if (cache.has(cacheKey)) {
      console.log("✅ Sử dụng kết quả từ cache");
      const cachedResult = cache.get(cacheKey)!;
      setResult(cachedResult);
      toast({
        title: "Kết quả từ bộ nhớ đệm",
        description: cachedResult.isHealthy ? "Lá trà khỏe mạnh!" : `Phát hiện: ${cachedResult.diseaseName}`,
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-tea-leaf", {
        body: { imageBase64: image },
      });

      if (error) throw error;

      // Lưu kết quả vào cache
      setCache(new Map(cache.set(cacheKey, data)));
      console.log("💾 Đã lưu kết quả vào cache");

      setResult(data);
      toast({
        title: "Phân tích hoàn tất",
        description: data.isHealthy ? "Lá trà khỏe mạnh!" : `Phát hiện: ${data.diseaseName}`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Lỗi phân tích",
        description: "Không thể phân tích hình ảnh. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setCurrentFile(null);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-dashed border-tea-300 bg-white/80 backdrop-blur-sm hover:border-tea-500 transition-colors">
          <CardContent className="p-0">
            <div
              className={`relative min-h-[300px] flex flex-col items-center justify-center p-8 transition-colors ${
                isDragging ? "bg-tea-100" : "bg-gradient-to-b from-tea-50/50 to-white"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {image ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-md"
                  >
                    <img
                      src={image}
                      alt="Lá trà cần phân tích"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={resetAnalysis}
                    >
                      Đổi ảnh
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-20 h-20 mx-auto rounded-full bg-tea-100 flex items-center justify-center"
                    >
                      <Upload className="w-10 h-10 text-tea-600" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-medium text-tea-800">
                        Kéo thả hình ảnh lá trà vào đây
                      </p>
                      <p className="text-sm text-tea-600 mt-1">
                        hoặc nhấn để chọn file (PNG, JPG, tối đa 10MB)
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileChange(file);
                          }}
                        />
                        <Button variant="default" className="bg-tea-500 hover:bg-tea-600" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Chọn ảnh
                          </span>
                        </Button>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileChange(file);
                          }}
                        />
                        <Button variant="outline" className="border-tea-300 text-tea-700" asChild>
                          <span>
                            <Camera className="w-4 h-4 mr-2" />
                            Chụp ảnh
                          </span>
                        </Button>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analyze Button */}
      {image && !result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-tea-500 hover:bg-tea-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Đang phân tích...
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5 mr-2" />
                Phân tích bệnh
              </>
            )}
          </Button>
        </motion.div>
      )}

      {/* Loading Skeleton */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-tea-100 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-tea-100 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-tea-100 rounded animate-pulse w-1/2" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-24 bg-tea-100 rounded animate-pulse" />
                  <div className="h-24 bg-tea-100 rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Main Result Card */}
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl">
              <div
                className={`p-6 ${
                  result.isHealthy
                    ? "bg-gradient-to-r from-tea-500 to-tea-600"
                    : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`}
              >
                <div className="flex items-center gap-4 text-white">
                  {result.isHealthy ? (
                    <CheckCircle className="w-12 h-12" />
                  ) : (
                    <AlertCircle className="w-12 h-12" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {result.isHealthy ? "Lá trà khỏe mạnh" : result.diseaseName || "Phát hiện bệnh"}
                    </h3>
                    {result.diseaseNameEn && (
                      <p className="text-white/80 italic">({result.diseaseNameEn})</p>
                    )}
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        severityConfig[result.severity].bg
                      } ${severityConfig[result.severity].color}`}
                    >
                      {severityConfig[result.severity].label}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Symptoms */}
                {result.symptoms && result.symptoms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-orange-500" />
                      Triệu chứng
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {result.symptoms.map((symptom, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-tea-700"
                        >
                          <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                          {symptom}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cause */}
                {result.cause && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-2">Nguyên nhân</h4>
                    <p className="text-tea-700 bg-tea-50 p-4 rounded-lg">{result.cause}</p>
                  </div>
                )}

                {/* Treatment */}
                {result.treatment && result.treatment.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-tea-600" />
                      Cách điều trị
                    </h4>
                    <ul className="space-y-2">
                      {result.treatment.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-tea-700 bg-tea-50 p-3 rounded-lg"
                        >
                          <span className="w-6 h-6 rounded-full bg-tea-600 text-white flex items-center justify-center text-sm flex-shrink-0">
                            {i + 1}
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prevention */}
                {result.prevention && result.prevention.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-tea-600" />
                      Phòng ngừa
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {result.prevention.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-tea-700"
                        >
                          <CheckCircle className="w-4 h-4 text-tea-500 mt-1 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Notes */}
                {result.additionalNotes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">💡 Lưu ý thêm</h4>
                    <p className="text-amber-700">{result.additionalNotes}</p>
                  </div>
                )}

                {/* Raw Analysis Fallback */}
                {result.rawAnalysis && (
                  <div className="bg-tea-50 rounded-lg p-4">
                    <p className="text-tea-700 whitespace-pre-wrap">{result.rawAnalysis}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analyze Again Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={resetAnalysis}
                className="border-tea-300 text-tea-700 hover:bg-tea-50"
              >
                Phân tích ảnh khác
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
