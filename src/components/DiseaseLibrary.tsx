import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DiseaseCard } from "@/components/DiseaseCard";
import { DiseaseModal } from "@/components/DiseaseModal";
import { teaDiseases, TeaDisease } from "@/data/teaDiseases";

export function DiseaseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<TeaDisease | null>(null);

  const filteredDiseases = teaDiseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.causativeAgent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-md mx-auto"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tea-500" />
        <Input
          type="text"
          placeholder="Tìm kiếm bệnh..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-tea-300 focus:border-tea-500"
        />
      </motion.div>

      {/* Results count */}
      <p className="text-center text-tea-500 text-sm">
        Hiển thị {filteredDiseases.length} / {teaDiseases.length} bệnh
      </p>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease, index) => (
          <DiseaseCard
            key={disease.id}
            disease={disease}
            index={index}
            onClick={() => setSelectedDisease(disease)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDiseases.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-tea-600 text-lg font-decoration">Không tìm thấy bệnh phù hợp</p>
          <p className="text-tea-500 text-sm mt-1">
            Thử tìm kiếm với từ khóa khác
          </p>
        </motion.div>
      )}

      {/* Modal */}
      <DiseaseModal
        disease={selectedDisease}
        isOpen={!!selectedDisease}
        onClose={() => setSelectedDisease(null)}
      />
    </div>
  );
}
