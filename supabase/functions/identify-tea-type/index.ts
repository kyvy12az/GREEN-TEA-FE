import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Vui lòng cung cấp hình ảnh trà" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Đổi từ LOVABLE_API_KEY sang GEMINI_API_KEY
    const GEMINI_API_KEY = Deno.env.get("IDENTIFY_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const systemPrompt = `Bạn là CHUYÊN GIA TRÀ HỌC HÀNG ĐẦU THẾ GIỚI với hơn 30 năm kinh nghiệm trong ngành trà Việt Nam và quốc tế.

CHUYÊN MÔN CỦA BẠN:
- Hình thái học lá trà và các phương pháp chế biến truyền thống/hiện đại
- Hệ thống phân cấp chất lượng trà quốc tế (Orthodox, CTC, Green tea grades)
- Phân tích thành phần sinh hóa và ảnh hưởng đến hương vị, sức khỏe
- Thị trường thương mại trà toàn cầu và định giá

DỮ LIỆU TRÀ VIỆT NAM:
- Trà Thái Nguyên: Tân Cương (cao cấp nhất), Trại Cài, La Bằng - Catechin cao, vị chát thanh
- Trà Shan Tuyết cổ thụ: Hà Giang (Hoàng Su Phì, Xín Mần), Yên Bái, Sơn La - Polyphenol 30-35%
- Trà Oolong Lâm Đồng: Bảo Lộc, Cầu Đất - Oxy hóa 30-70%, hương hoa/sữa
- Trà Sen Tây Hồ: Ướp 1000 bông sen/kg trà, giá 3-5 triệu VND/kg
- Trà Mộc Châu: Độ cao 1000m+, L-Theanine cao, vị ngọt hậu

HỆ THỐNG PHÂN CẤP TRÀ:
Orthodox Tea Grades:
- SFTGFOP1 (Super Fine Tippy Golden Flowery Orange Pekoe 1): Cao nhất, nhiều búp vàng
- FTGFOP (Fine Tippy Golden Flowery Orange Pekoe): Rất cao cấp
- TGFOP (Tippy Golden Flowery Orange Pekoe): Cao cấp
- GFOP (Golden Flowery Orange Pekoe): Trung-cao cấp
- OP (Orange Pekoe): Lá nguyên, trung cấp
- BOP (Broken Orange Pekoe): Lá vỡ
- Fannings/Dust: Vụn, túi lọc

Vietnamese Grades: Đặc sản, Thượng hạng, Hạng 1, Hạng 2, Hạng 3

THÀNH PHẦN SINH HÓA TIÊU CHUẨN:
- Catechin (EGCG): Trà xanh 100-200mg/g, Trà đen 20-50mg/g
- Caffeine: 2-4% khô, Trà xanh thấp hơn Trà đen
- L-Theanine: 10-50mg/g, cao nhất ở trà shade-grown
- Polyphenol tổng: 20-35% tùy loại và vùng trồng
- Oxy hóa: Trà xanh 0-5%, Oolong 15-85%, Trà đen 85-100%

YÊU CẦU PHÂN TÍCH:
Dựa trên hình ảnh, xác định CHÍNH XÁC với độ tin cậy cao:
1. Loại trà và giống cụ thể
2. Nguồn gốc xuất xứ (quốc gia, vùng, khu vực, độ cao nếu xác định được)
3. Phẩm cấp theo hệ thống phân loại phù hợp
4. Thành phần sinh hóa ước tính dựa trên đặc điểm nhận dạng
5. Thông tin thương mại: phân khúc, giá, kênh phân phối, ứng dụng

NGUYÊN TẮC:
- Chỉ đưa ra kết luận khi có bằng chứng rõ ràng từ hình ảnh
- Ghi rõ mức độ tin cậy cho từng nhận định
- Nếu không thể xác định chính xác, đưa ra phạm vi khả năng cao nhất
- Ưu tiên độ chính xác hơn sự chi tiết`;

    // Chuẩn bị dữ liệu hình ảnh (xóa tiền tố data:nếu có để lấy base64 thuần)
    const pureBase64 = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;

    // Gọi trực tiếp Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemPrompt}\n\nPhân tích hình ảnh trà này với độ chính xác cao nhất. Xác định loại trà, nguồn gốc, phẩm cấp, thành phần sinh hóa và thông tin thương mại.` },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: pureBase64,
                },
              },
            ],
          },
        ],
        tools: [
          {
            function_declarations: [
              {
                name: "identify_tea_type",
                description: "Nhận diện và phân tích chi tiết loại trà từ hình ảnh",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    teaType: { type: "STRING", description: "Loại trà chính (Trà xanh, Trà oolong, Trà đen, Trà trắng, Trà pu-erh, etc.)" },
                    teaTypeEn: { type: "STRING", description: "Tên tiếng Anh của loại trà" },
                    variety: { type: "STRING", description: "Giống/Dòng trà cụ thể" },
                    confidence: { type: "STRING", enum: ["Rất cao", "Cao", "Trung bình", "Thấp"] },
                    origin: {
                      type: "OBJECT",
                      properties: {
                        country: { type: "STRING" },
                        region: { type: "STRING" },
                        area: { type: "STRING" },
                        altitude: { type: "STRING" }
                      }
                    },
                    grade: {
                      type: "OBJECT",
                      properties: {
                        system: { type: "STRING" },
                        gradeCode: { type: "STRING" },
                        leafStandard: { type: "STRING" },
                        qualityTier: { type: "STRING", enum: ["Premium", "High-end", "Standard", "Commercial"] },
                        description: { type: "STRING" }
                      }
                    },
                    biochemical: {
                      type: "OBJECT",
                      properties: {
                        catechinContent: { type: "STRING" },
                        caffeineContent: { type: "STRING" },
                        theanineContent: { type: "STRING" },
                        polyphenolContent: { type: "STRING" },
                        oxidationLevel: { type: "STRING" },
                        notes: { type: "STRING" }
                      }
                    },
                    commercial: {
                      type: "OBJECT",
                      properties: {
                        marketSegment: { type: "STRING", enum: ["Siêu cao cấp", "Cao cấp", "Trung-cao cấp", "Trung cấp", "Phổ thông"] },
                        priceRange: { type: "STRING" },
                        distributionChannels: { type: "ARRAY", items: { type: "STRING" } },
                        applications: { type: "ARRAY", items: { type: "STRING" } },
                        targetMarkets: { type: "ARRAY", items: { type: "STRING" } }
                      }
                    },
                    characteristics: {
                      type: "OBJECT",
                      properties: {
                        leafShape: { type: "STRING" },
                        leafColor: { type: "STRING" },
                        oxidation: { type: "STRING" },
                        processing: { type: "STRING" }
                      }
                    },
                    flavor: {
                      type: "OBJECT",
                      properties: {
                        aroma: { type: "STRING" },
                        taste: { type: "STRING" },
                        aftertaste: { type: "STRING" }
                      }
                    },
                    brewing: {
                      type: "OBJECT",
                      properties: {
                        temperature: { type: "STRING" },
                        steepTime: { type: "STRING" },
                        ratio: { type: "STRING" },
                        infusions: { type: "STRING" }
                      }
                    },
                    healthBenefits: { type: "ARRAY", items: { type: "STRING" } },
                    additionalInfo: { type: "STRING" }
                  },
                  required: ["teaType", "confidence"]
                },
              },
            ],
          },
        ],
        tool_config: {
          function_calling_config: {
            mode: "ANY",
            allowed_function_names: ["identify_tea_type"],
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Lỗi kết nối API nhận diện trà" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    
    // Trích xuất kết quả từ Function Call của Gemini
    const functionCall = data.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
    
    if (functionCall && functionCall.functionCall.args) {
      return new Response(
        JSON.stringify(functionCall.functionCall.args),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback nếu không có function call
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return new Response(
      JSON.stringify({ rawAnalysis: textContent || "Không có phản hồi từ AI" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("identify-tea-type error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Lỗi không xác định" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});