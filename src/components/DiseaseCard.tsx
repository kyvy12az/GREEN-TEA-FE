import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeaDisease, getSeverityConfig } from "@/data/teaDiseases";

interface DiseaseCardProps {
  disease: TeaDisease;
  onClick: () => void;
  index: number;
}

export function DiseaseCard({ disease, onClick, index }: DiseaseCardProps) {
  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-tea-200 hover:border-tea-400"
        onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={disease.imageUrl}
            alt={disease.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <Badge className={`${severityConfig.bg} ${severityConfig.color} ${severityConfig.border} border`}>
              {severityConfig.label}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-tea-800 mb-1 group-hover:text-tea-600 transition-colors">
            {disease.name}
          </h3>
          <p className="text-sm text-tea-600 italic mb-2">{disease.nameEn}</p>
          <p className="text-sm text-tea-700 line-clamp-2">{disease.shortDescription}</p>
          <p className="text-xs text-tea-500 mt-2">
            Tác nhân: {disease.causativeAgent}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
