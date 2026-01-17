import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Loader2,
  Camera,
  MapPin,
  Thermometer,
  Clock,
  Coffee,
  Sparkles,
  Leaf,
  Globe,
  Award,
  FlaskConical,
  TrendingUp,
  Mountain,
  Tag,
  ShoppingBag,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Progress } from "@/components/ui/progress";

interface GradeInfo {
  system?: string;
  gradeCode?: string;
  leafStandard?: string;
  qualityTier?: string;
  description?: string;
}

interface BiochemicalInfo {
  catechinContent?: string;
  caffeineContent?: string;
  theanineContent?: string;
  polyphenolContent?: string;
  oxidationLevel?: string;
  notes?: string;
}

interface CommercialInfo {
  marketSegment?: string;
  priceRange?: string;
  distributionChannels?: string[];
  applications?: string[];
  targetMarkets?: string[];
}

interface TeaTypeResult {
  teaType: string;
  teaTypeEn?: string;
  variety?: string;
  confidence?: string;
  origin?: {
    country?: string;
    region?: string;
    area?: string;
    altitude?: string;
  };
  grade?: GradeInfo;
  biochemical?: BiochemicalInfo;
  commercial?: CommercialInfo;
  characteristics?: {
    leafShape?: string;
    leafColor?: string;
    oxidation?: string;
    processing?: string;
  };
  flavor?: {
    aroma?: string;
    taste?: string;
    aftertaste?: string;
  };
  brewing?: {
    temperature?: string;
    steepTime?: string;
    ratio?: string;
    infusions?: string;
  };
  healthBenefits?: string[];
  additionalInfo?: string;
  rawAnalysis?: string;
}

// Helper to extract number from string like "150-200 mg/g" -> 175
function extractAvgNumber(str: string | undefined, maxValue: number): number {
  if (!str) return 0;
  const matches = str.match(/(\d+(?:\.\d+)?)/g);
  if (!matches) return 0;
  const nums = matches.map(Number);
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.min((avg / maxValue) * 100, 100);
}

// Confidence badge color
function getConfidenceBadgeColor(confidence: string | undefined) {
  switch (confidence) {
    case "Rất cao":
      return "bg-emerald-500 text-white";
    case "Cao":
      return "bg-green-500 text-white";
    case "Trung bình":
      return "bg-yellow-500 text-white";
    case "Thấp":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

// Quality tier badge color
function getQualityTierColor(tier: string | undefined) {
  switch (tier) {
    case "Premium":
      return "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900";
    case "High-end":
      return "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
    case "Standard":
      return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
    case "Commercial":
      return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

// Market segment badge color
function getMarketSegmentColor(segment: string | undefined) {
  switch (segment) {
    case "Siêu cao cấp":
      return "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-900";
    case "Cao cấp":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
    case "Trung-cao cấp":
      return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white";
    case "Trung cấp":
      return "bg-gradient-to-r from-teal-400 to-green-500 text-white";
    case "Phổ thông":
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export function TeaTypeAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TeaTypeResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = useCallback(
    (file: File) => {
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
        setResult(null);
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

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
    if (!image) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("identify-tea-type", {
        body: { imageBase64: image },
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Nhận diện hoàn tất",
        description: `Đây là: ${data.teaType}`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Lỗi nhận diện",
        description: "Không thể nhận diện loại trà. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
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
                isDragging
                  ? "bg-tea-100"
                  : "bg-gradient-to-b from-tea-50/50 to-white"
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
                      alt="Trà cần nhận diện"
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
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="w-20 h-20 mx-auto rounded-full bg-tea-100 flex items-center justify-center"
                    >
                      <Coffee className="w-10 h-10 text-tea-600" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-medium text-tea-800">
                        Kéo thả hình ảnh lá trà hoặc trà khô vào đây
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
                        <Button
                          variant="default"
                          className="bg-tea-500 hover:bg-tea-600"
                          asChild
                        >
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
                        <Button
                          variant="outline"
                          className="border-tea-300 text-tea-700"
                          asChild
                        >
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
                Đang nhận diện...
              </>
            ) : (
              <>
                <Coffee className="w-5 h-5 mr-2" />
                Nhận diện loại trà
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
                  <div className="h-32 bg-tea-100 rounded animate-pulse" />
                  <div className="h-32 bg-tea-100 rounded animate-pulse" />
                  <div className="h-32 bg-tea-100 rounded animate-pulse" />
                  <div className="h-32 bg-tea-100 rounded animate-pulse" />
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
              <div className="p-6 bg-gradient-to-r from-tea-500 to-tea-700">
                <div className="flex items-center gap-4 text-white">
                  <Coffee className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-bold">{result.teaType}</h3>
                    {result.teaTypeEn && (
                      <p className="text-white/80 italic">({result.teaTypeEn})</p>
                    )}
                  </div>
                  <div className="ml-auto flex gap-2 flex-wrap justify-end">
                    {result.variety && (
                      <Badge className="bg-white/20 text-white border-white/30">
                        {result.variety}
                      </Badge>
                    )}
                    {result.confidence && (
                      <Badge className={getConfidenceBadgeColor(result.confidence)}>
                        Độ tin cậy: {result.confidence}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Origin with altitude */}
                {result.origin && (
                  <div className="bg-tea-50 rounded-lg p-4">
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-tea-600" />
                      Nguồn gốc
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {result.origin.country && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <MapPin className="w-4 h-4" />
                          <span>Quốc gia: {result.origin.country}</span>
                        </div>
                      )}
                      {result.origin.region && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <MapPin className="w-4 h-4" />
                          <span>Vùng: {result.origin.region}</span>
                        </div>
                      )}
                      {result.origin.area && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <MapPin className="w-4 h-4" />
                          <span>Khu vực: {result.origin.area}</span>
                        </div>
                      )}
                      {result.origin.altitude && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <Mountain className="w-4 h-4" />
                          <span>Độ cao: {result.origin.altitude}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Grade Section - NEW */}
                {result.grade && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200"
                  >
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      Phẩm Cấp
                    </h4>
                    <div className="flex flex-wrap items-start gap-4">
                      {result.grade.gradeCode && (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-amber-700 bg-white/80 rounded-lg px-4 py-2 shadow-sm border border-amber-200">
                            {result.grade.gradeCode}
                          </div>
                          <p className="text-xs text-amber-600 mt-1">Mã phẩm cấp</p>
                        </div>
                      )}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.grade.system && (
                          <InfoItem label="Hệ thống" value={result.grade.system} />
                        )}
                        {result.grade.leafStandard && (
                          <InfoItem label="Tiêu chuẩn lá" value={result.grade.leafStandard} />
                        )}
                        {result.grade.qualityTier && (
                          <div className="bg-white rounded-lg p-3 border border-amber-100">
                            <p className="text-xs text-amber-600 mb-1">Phân hạng</p>
                            <Badge className={`${getQualityTierColor(result.grade.qualityTier)} font-semibold`}>
                              {result.grade.qualityTier}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    {result.grade.description && (
                      <p className="text-sm text-amber-700 mt-3 bg-white/50 rounded p-2">
                        {result.grade.description}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Biochemical Section - NEW */}
                {result.biochemical && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200"
                  >
                    <h4 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-emerald-600" />
                      Thành Phần Sinh Hóa
                    </h4>
                    <div className="space-y-4">
                      {result.biochemical.catechinContent && (
                        <BiochemicalBar
                          label="Catechin (EGCG)"
                          value={result.biochemical.catechinContent}
                          percentage={extractAvgNumber(result.biochemical.catechinContent, 250)}
                          color="bg-green-500"
                        />
                      )}
                      {result.biochemical.caffeineContent && (
                        <BiochemicalBar
                          label="Caffeine"
                          value={result.biochemical.caffeineContent}
                          percentage={extractAvgNumber(result.biochemical.caffeineContent, 5)}
                          color="bg-amber-600"
                        />
                      )}
                      {result.biochemical.theanineContent && (
                        <BiochemicalBar
                          label="L-Theanine"
                          value={result.biochemical.theanineContent}
                          percentage={extractAvgNumber(result.biochemical.theanineContent, 60)}
                          color="bg-blue-500"
                        />
                      )}
                      {result.biochemical.polyphenolContent && (
                        <BiochemicalBar
                          label="Polyphenol tổng"
                          value={result.biochemical.polyphenolContent}
                          percentage={extractAvgNumber(result.biochemical.polyphenolContent, 40)}
                          color="bg-purple-500"
                        />
                      )}
                      {result.biochemical.oxidationLevel && (
                        <BiochemicalBar
                          label="Mức độ oxy hóa"
                          value={result.biochemical.oxidationLevel}
                          percentage={extractAvgNumber(result.biochemical.oxidationLevel, 100)}
                          color="bg-orange-500"
                        />
                      )}
                    </div>
                    {result.biochemical.notes && (
                      <p className="text-sm text-emerald-700 mt-3 bg-white/50 rounded p-2 italic">
                        📝 {result.biochemical.notes}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Commercial Section - NEW */}
                {result.commercial && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
                  >
                    <h4 className="font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Thông Tin Thương Mại
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Market Segment & Price */}
                      <div className="space-y-3">
                        {result.commercial.marketSegment && (
                          <div className="bg-white/80 rounded-lg p-3 border border-indigo-100">
                            <p className="text-xs text-indigo-500 mb-2 flex items-center gap-1">
                              <Target className="w-3 h-3" /> Phân khúc
                            </p>
                            <Badge className={`${getMarketSegmentColor(result.commercial.marketSegment)} text-sm px-3 py-1`}>
                              {result.commercial.marketSegment}
                            </Badge>
                          </div>
                        )}
                        {result.commercial.priceRange && (
                          <div className="bg-white/80 rounded-lg p-3 border border-indigo-100">
                            <p className="text-xs text-indigo-500 mb-1 flex items-center gap-1">
                              <Tag className="w-3 h-3" /> Giá tham khảo
                            </p>
                            <p className="text-lg font-bold text-indigo-700">{result.commercial.priceRange}</p>
                          </div>
                        )}
                      </div>

                      {/* Distribution & Applications */}
                      <div className="space-y-3">
                        {result.commercial.distributionChannels && result.commercial.distributionChannels.length > 0 && (
                          <div className="bg-white/80 rounded-lg p-3 border border-indigo-100">
                            <p className="text-xs text-indigo-500 mb-2 flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" /> Kênh phân phối
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {result.commercial.distributionChannels.map((channel, i) => (
                                <Badge key={i} variant="outline" className="text-xs border-indigo-300 text-indigo-600">
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.commercial.applications && result.commercial.applications.length > 0 && (
                          <div className="bg-white/80 rounded-lg p-3 border border-indigo-100">
                            <p className="text-xs text-indigo-500 mb-2">🎯 Ứng dụng</p>
                            <div className="flex flex-wrap gap-1">
                              {result.commercial.applications.map((app, i) => (
                                <Badge key={i} className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                                  {app}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Target Markets */}
                    {result.commercial.targetMarkets && result.commercial.targetMarkets.length > 0 && (
                      <div className="mt-3 bg-white/80 rounded-lg p-3 border border-indigo-100">
                        <p className="text-xs text-indigo-500 mb-2 flex items-center gap-1">
                          <Globe className="w-3 h-3" /> Thị trường tiêu thụ
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.commercial.targetMarkets.map((market, i) => (
                            <Badge key={i} className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                              {market}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Characteristics */}
                {result.characteristics && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-tea-600" />
                      Đặc điểm
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.characteristics.leafShape && (
                        <InfoItem
                          label="Hình dáng lá"
                          value={result.characteristics.leafShape}
                        />
                      )}
                      {result.characteristics.leafColor && (
                        <InfoItem
                          label="Màu sắc"
                          value={result.characteristics.leafColor}
                        />
                      )}
                      {result.characteristics.oxidation && (
                        <InfoItem
                          label="Mức độ oxy hóa"
                          value={result.characteristics.oxidation}
                        />
                      )}
                      {result.characteristics.processing && (
                        <InfoItem
                          label="Cách chế biến"
                          value={result.characteristics.processing}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Flavor */}
                {result.flavor && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Hương vị
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {result.flavor.aroma && (
                        <InfoItem label="Hương thơm" value={result.flavor.aroma} />
                      )}
                      {result.flavor.taste && (
                        <InfoItem label="Vị" value={result.flavor.taste} />
                      )}
                      {result.flavor.aftertaste && (
                        <InfoItem label="Hậu vị" value={result.flavor.aftertaste} />
                      )}
                    </div>
                  </div>
                )}

                {/* Brewing */}
                {result.brewing && (
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-tea-800 mb-3 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-amber-600" />
                      Cách pha chế
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {result.brewing.temperature && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span>Nhiệt độ: {result.brewing.temperature}</span>
                        </div>
                      )}
                      {result.brewing.steepTime && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Thời gian: {result.brewing.steepTime}</span>
                        </div>
                      )}
                      {result.brewing.ratio && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <Coffee className="w-4 h-4 text-amber-600" />
                          <span>Tỉ lệ: {result.brewing.ratio}</span>
                        </div>
                      )}
                      {result.brewing.infusions && (
                        <div className="flex items-center gap-2 text-tea-700">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span>Số lần pha: {result.brewing.infusions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Health Benefits */}
                {result.healthBenefits && result.healthBenefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-tea-800 mb-3">
                      🌿 Lợi ích sức khỏe
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {result.healthBenefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-tea-700"
                        >
                          <span className="w-2 h-2 rounded-full bg-tea-400 mt-2 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Info */}
                {result.additionalInfo && (
                  <div className="bg-tea-50 border border-tea-200 rounded-lg p-4">
                    <h4 className="font-semibold text-tea-800 mb-2">
                      💡 Thông tin thêm
                    </h4>
                    <p className="text-tea-700">{result.additionalInfo}</p>
                  </div>
                )}

                {/* Raw Analysis Fallback */}
                {result.rawAnalysis && (
                  <div className="bg-tea-50 rounded-lg p-4">
                    <p className="text-tea-700 whitespace-pre-wrap">
                      {result.rawAnalysis}
                    </p>
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
                Nhận diện ảnh khác
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-3 border border-tea-100">
      <p className="text-xs text-tea-500 mb-1">{label}</p>
      <p className="text-tea-700 font-medium">{value}</p>
    </div>
  );
}

function BiochemicalBar({
  label,
  value,
  percentage,
  color,
}: {
  label: string;
  value: string;
  percentage: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-emerald-700">{label}</span>
        <span className="text-sm text-emerald-600">{value}</span>
      </div>
      <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
