export interface TeaDisease {
  id: string;
  name: string;
  nameEn: string;
  scientificName: string;
  causativeAgent: string;
  severity: "mild" | "moderate" | "severe";
  imageUrl: string;
  shortDescription: string;
  symptoms: string[];
  causes: string[];
  conditions: string[];
  treatment: string[];
  prevention: string[];
  affectedParts: string[];
}

export const teaDiseases: TeaDisease[] = [
  {
    id: "blister-blight",
    name: "Bệnh phồng lá",
    nameEn: "Blister Blight",
    scientificName: "Exobasidium vexans",
    causativeAgent: "Nấm Exobasidium vexans Massee",
    severity: "severe",
    imageUrl: "https://jksus.org/content/185/2020/32/8/img/10.1016_j.jksus.2020.09.008-fig4.png",
    shortDescription: "Bệnh nghiêm trọng nhất trên cây trà, gây thiệt hại năng suất lớn",
    symptoms: [
      "Xuất hiện các đốm tròn nhỏ, trong suốt trên lá non",
      "Đốm bệnh phồng lên, mặt dưới lá có lớp phấn trắng",
      "Lá bị xoăn, biến dạng và khô héo",
      "Chồi non bị nhiễm có thể chết hoàn toàn"
    ],
    causes: [
      "Do nấm Exobasidium vexans gây ra",
      "Bào tử nấm lây lan qua gió và nước mưa",
      "Nhiễm bệnh chủ yếu vào lá non và chồi non"
    ],
    conditions: [
      "Thời tiết ẩm ướt, mát mẻ (15-25°C)",
      "Độ ẩm không khí cao (>80%)",
      "Mưa nhiều và sương mù",
      "Mùa xuân và đầu hè là thời kỳ cao điểm"
    ],
    treatment: [
      "Phun thuốc gốc đồng (Bordeaux mixture) khi phát hiện bệnh",
      "Sử dụng thuốc trừ nấm như Hexaconazole, Propiconazole",
      "Thu hái kịp thời để loại bỏ lá bệnh",
      "Phun thuốc phòng ngừa trước mùa mưa"
    ],
    prevention: [
      "Trồng cây ở nơi thoáng gió, thoát nước tốt",
      "Duy trì khoảng cách cây hợp lý",
      "Cắt tỉa cành tạo độ thông thoáng",
      "Phun thuốc phòng ngừa định kỳ vào mùa mưa"
    ],
    affectedParts: ["Lá non", "Chồi non", "Cành non"]
  },
  {
    id: "brown-blight",
    name: "Bệnh đốm nâu",
    nameEn: "Brown Blight",
    scientificName: "Colletotrichum camelliae",
    causativeAgent: "Nấm Colletotrichum spp.",
    severity: "moderate",
    imageUrl: "https://static.vikaspedia.in/media/images_en/agriculture/crop-production/integrated-pest-managment/ipm-for-commercial-crops/ipm-strategies-for-tea/brown-blight-grey-blighttest.png",
    shortDescription: "Bệnh phổ biến gây đốm nâu và làm khô lá trà",
    symptoms: [
      "Đốm nâu tròn hoặc bất định trên lá",
      "Đốm có viền đậm và tâm nhạt hơn",
      "Lá bị khô và rụng sớm",
      "Cành non có thể bị khô chết"
    ],
    causes: [
      "Do nấm Colletotrichum camelliae gây ra",
      "Lây lan qua bào tử trong nước mưa",
      "Vết thương cơ học tạo điều kiện xâm nhập"
    ],
    conditions: [
      "Thời tiết nóng ẩm",
      "Mưa nhiều và gió mạnh",
      "Cây bị stress do thiếu nước hoặc dinh dưỡng"
    ],
    treatment: [
      "Cắt bỏ và tiêu hủy lá, cành bị bệnh",
      "Phun thuốc trừ nấm Carbendazim, Mancozeb",
      "Bón phân cân đối tăng sức đề kháng"
    ],
    prevention: [
      "Cắt tỉa thường xuyên tạo thông thoáng",
      "Tránh gây tổn thương cơ học khi thu hái",
      "Phun thuốc phòng ngừa vào đầu mùa mưa"
    ],
    affectedParts: ["Lá", "Cành non"]
  },
  {
    id: "grey-blight",
    name: "Bệnh thối xám",
    nameEn: "Grey Blight",
    scientificName: "Pestalotiopsis theae",
    causativeAgent: "Nấm Pestalotiopsis spp.",
    severity: "moderate",
    imageUrl: "https://onlinelibrary.wiley.com/cms/asset/649191cf-fade-4aea-9f09-dbdaaa1a37b8/cone7876302-fig-0002-m.jpg",
    shortDescription: "Bệnh gây đốm xám và làm lá rụng sớm",
    symptoms: [
      "Đốm xám bạc với viền nâu trên lá",
      "Đốm thường xuất hiện ở mép và chóp lá",
      "Các đốm có thể liên kết thành mảng lớn",
      "Lá già thường bị nặng hơn lá non"
    ],
    causes: [
      "Do nấm Pestalotiopsis theae gây ra",
      "Xâm nhập qua vết thương trên lá",
      "Lan truyền qua nước mưa văng"
    ],
    conditions: [
      "Độ ẩm cao kéo dài",
      "Thiếu ánh sáng do cây che phủ quá dày",
      "Đất nghèo dinh dưỡng"
    ],
    treatment: [
      "Thu gom và tiêu hủy lá bệnh rụng",
      "Phun thuốc trừ nấm Copper oxychloride",
      "Tăng cường bón phân potassium"
    ],
    prevention: [
      "Cắt tỉa để ánh sáng xuyên qua tán",
      "Bón phân cân đối NPK",
      "Quản lý cỏ dại và thoát nước tốt"
    ],
    affectedParts: ["Lá già", "Lá trưởng thành"]
  },
  {
    id: "algal-leaf-spot",
    name: "Bệnh đốm tảo",
    nameEn: "Algal Leaf Spot",
    scientificName: "Cephaleuros virescens",
    causativeAgent: "Tảo Cephaleuros virescens",
    severity: "mild",
    imageUrl: "https://www.gardenia.net/wp-content/uploads/2023/09/Algal-Leaf-Spot-Scot-Nelson2-1.jpg",
    shortDescription: "Bệnh do tảo gây đốm xanh cam trên lá",
    symptoms: [
      "Đốm tròn xanh xám hoặc cam trên mặt lá",
      "Bề mặt đốm hơi nhám như nhung",
      "Đốm có thể nổi lên trên bề mặt lá",
      "Lá bị nặng có thể vàng và rụng"
    ],
    causes: [
      "Do tảo Cephaleuros virescens gây ra",
      "Tảo sống ký sinh trên bề mặt lá",
      "Lây lan qua bào tử trong không khí ẩm"
    ],
    conditions: [
      "Độ ẩm cao quanh năm",
      "Vườn trà ở vùng thấp, ẩm thấp",
      "Thiếu ánh sáng và thông gió kém"
    ],
    treatment: [
      "Phun dung dịch Bordeaux 1%",
      "Sử dụng thuốc gốc đồng",
      "Tăng cường thoát nước vườn trà"
    ],
    prevention: [
      "Cắt tỉa tạo thông thoáng cho vườn",
      "Cải thiện hệ thống thoát nước",
      "Tránh trồng quá dày"
    ],
    affectedParts: ["Mặt trên lá", "Cành"]
  },
  {
    id: "red-rust",
    name: "Bệnh gỉ sắt đỏ",
    nameEn: "Red Rust",
    scientificName: "Cephaleuros parasiticus",
    causativeAgent: "Tảo Cephaleuros parasiticus",
    severity: "moderate",
    imageUrl: "https://agriculturistmusa.com/wp-content/uploads/2020/03/Symptoms-and-Management-of-Red-Rust-of-tea.png",
    shortDescription: "Bệnh do tảo gây lớp phủ màu gỉ sắt trên cành",
    symptoms: [
      "Lớp phủ màu gỉ sắt (cam-nâu) trên cành và thân",
      "Vỏ cành bị nứt và sần sùi",
      "Cành có thể bị yếu và gãy",
      "Lá trên cành bệnh thường vàng úa"
    ],
    causes: [
      "Do tảo Cephaleuros parasiticus gây ra",
      "Tảo xâm nhập qua vỏ cành",
      "Phát triển mạnh trong điều kiện ẩm ướt"
    ],
    conditions: [
      "Vườn trà ẩm thấp, ít nắng",
      "Mùa mưa kéo dài",
      "Cây già yếu, kém phát triển"
    ],
    treatment: [
      "Cắt bỏ cành bị bệnh nặng",
      "Phun thuốc gốc đồng lên cành",
      "Bón phân tăng cường sức khỏe cây"
    ],
    prevention: [
      "Duy trì vườn trà thông thoáng",
      "Tránh tưới nước lên tán cây",
      "Cắt tỉa định kỳ loại bỏ cành yếu"
    ],
    affectedParts: ["Cành", "Thân", "Vỏ cây"]
  },
  {
    id: "anthracnose",
    name: "Bệnh thán thư",
    nameEn: "Anthracnose",
    scientificName: "Gloeosporium theae-sinensis",
    causativeAgent: "Nấm Gloeosporium theae-sinensis",
    severity: "severe",
    imageUrl: "https://map-data.maxapress.com//map-data//bpr/2025/1/PIC/bpr-0025-0005-1.jpg",
    shortDescription: "Bệnh nấm nghiêm trọng gây chết lá và cành",
    symptoms: [
      "Đốm nâu đen có viền rõ trên lá",
      "Đốm lõm, có thể thủng lỗ",
      "Lá xoăn, biến dạng và khô đen",
      "Chồi non và cành có thể chết khô"
    ],
    causes: [
      "Do nấm Gloeosporium theae-sinensis gây ra",
      "Bào tử lây lan qua nước mưa và gió",
      "Nhiễm bệnh qua vết thương và mô non"
    ],
    conditions: [
      "Thời tiết nóng ẩm kéo dài",
      "Mưa nhiều trong mùa sinh trưởng",
      "Vườn trà thâm canh, bón đạm cao"
    ],
    treatment: [
      "Phun thuốc trừ nấm Difenoconazole, Azoxystrobin",
      "Cắt bỏ và tiêu hủy phần bị bệnh",
      "Giảm lượng đạm, tăng kali trong bón phân"
    ],
    prevention: [
      "Cắt tỉa tạo thông thoáng cho tán cây",
      "Bón phân cân đối, tránh thừa đạm",
      "Thu hái đúng kỹ thuật, tránh làm tổn thương",
      "Phun phòng định kỳ vào mùa mưa"
    ],
    affectedParts: ["Lá", "Chồi non", "Cành non"]
  }
];

export const getSeverityConfig = (severity: TeaDisease["severity"]) => {
  const config = {
    mild: { label: "Nhẹ", color: "text-yellow-700", bg: "bg-yellow-100", border: "border-yellow-300" },
    moderate: { label: "Trung bình", color: "text-orange-700", bg: "bg-orange-100", border: "border-orange-300" },
    severe: { label: "Nặng", color: "text-red-700", bg: "bg-red-100", border: "border-red-300" },
  };
  return config[severity];
};
