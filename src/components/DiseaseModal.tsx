import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Bug,
  CloudRain,
  Shield,
  Stethoscope,
  Leaf,
} from "lucide-react";
import { TeaDisease, getSeverityConfig } from "@/data/teaDiseases";

interface DiseaseModalProps {
  disease: TeaDisease | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DiseaseModal({ disease, isOpen, onClose }: DiseaseModalProps) {
  if (!disease) return null;

  const severityConfig = getSeverityConfig(disease.severity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-white">
        <div className="relative h-56">
          <img
            src={disease.imageUrl}
            alt={disease.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {disease.name}
              </DialogTitle>
              <p className="text-white/80 italic">{disease.nameEn}</p>
            </DialogHeader>
          </div>
          <Badge
            className={`absolute top-4 left-4 ${severityConfig.bg} ${severityConfig.color} ${severityConfig.border} border`}
          >
            Mức độ: {severityConfig.label}
          </Badge>
        </div>

        <ScrollArea className="max-h-[calc(90vh-14rem)]">
          <div className="p-6 space-y-6">
            {/* Scientific Info */}
            <div className="bg-tea-50 rounded-lg p-4">
              <p className="text-sm text-tea-700">
                <span className="font-semibold">Tên khoa học:</span>{" "}
                <span className="italic">{disease.scientificName}</span>
              </p>
              <p className="text-sm text-tea-700 mt-1">
                <span className="font-semibold">Tác nhân gây bệnh:</span>{" "}
                {disease.causativeAgent}
              </p>
            </div>

            {/* Symptoms */}
            <Section
              icon={AlertCircle}
              title="Triệu chứng"
              items={disease.symptoms}
              iconColor="text-orange-500"
            />

            <Separator />

            {/* Causes */}
            <Section
              icon={Bug}
              title="Nguyên nhân"
              items={disease.causes}
              iconColor="text-red-500"
            />

            <Separator />

            {/* Conditions */}
            <Section
              icon={CloudRain}
              title="Điều kiện phát sinh"
              items={disease.conditions}
              iconColor="text-blue-500"
            />

            <Separator />

            {/* Treatment */}
            <Section
              icon={Stethoscope}
              title="Cách điều trị"
              items={disease.treatment}
              iconColor="text-tea-600"
              numbered
            />

            <Separator />

            {/* Prevention */}
            <Section
              icon={Shield}
              title="Phòng ngừa"
              items={disease.prevention}
              iconColor="text-tea-500"
            />

            {/* Affected Parts */}
            <div className="flex items-center gap-2 flex-wrap">
              <Leaf className="w-4 h-4 text-tea-600" />
              <span className="text-sm font-medium text-tea-700">
                Bộ phận bị ảnh hưởng:
              </span>
              {disease.affectedParts.map((part, i) => (
                <Badge key={i} variant="outline" className="text-tea-600 border-tea-300">
                  {part}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface SectionProps {
  icon: React.ElementType;
  title: string;
  items: string[];
  iconColor: string;
  numbered?: boolean;
}

function Section({ icon: Icon, title, items, iconColor, numbered }: SectionProps) {
  return (
    <div>
      <h4 className="flex items-center gap-2 font-semibold text-tea-800 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 text-tea-700"
          >
            {numbered ? (
              <span className="w-6 h-6 rounded-full bg-tea-600 text-white flex items-center justify-center text-sm flex-shrink-0">
                {i + 1}
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-tea-400 mt-2 flex-shrink-0" />
            )}
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
