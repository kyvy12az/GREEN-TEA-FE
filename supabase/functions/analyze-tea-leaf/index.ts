const GEMINI_API_KEY = Deno.env.get("ANALYZE_API_KEY");
const HF_SPACE_URL = "https://kyvy2006-tea-disease-detector.hf.space/predict"; 

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "Vui lòng cung cấp hình ảnh lá trà" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. CHUẨN BỊ ẢNH (Binary cho HF và Base64 cho Gemini)
    const base64Data = imageBase64.startsWith("data:") ? imageBase64.split(",")[1] : imageBase64;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const imageBlob = new Blob([new Uint8Array(byteNumbers)], { type: "image/jpeg" });

    // ===== BƯỚC 1: HUGGING FACE - CHẨN ĐOÁN QUA API RIÊNG =====
    console.log("📊 Bước 1: Gọi Custom HF Space...");
    let hfAnalysis = "Không xác định";

    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "image.jpg");

      const hfResponse = await fetch(HF_SPACE_URL, {
        method: "POST",
        body: formData,
      });

      if (hfResponse.ok) {
        const hfResults = await hfResponse.json();
        // Giả sử API trả về { "disease": "Anthracnose", "confidence": 0.95 }
        hfAnalysis = `Bệnh: ${hfResults.disease} (Độ tin cậy: ${Math.round(hfResults.confidence * 100)}%)`;
      }
    } catch (e) {
      console.warn("⚠️ Lỗi HF Space, chuyển sang nhờ Gemini tự chẩn đoán:", e.message);
    }

    // ===== BƯỚC 2: GEMINI - PHÁC ĐỒ ĐIỀU TRỊ =====
    return await consultGemini(base64Data, hfAnalysis);

  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function consultGemini(base64Data: string, hfPredictions: string) {
  console.log("🤖 Bước 2: Gọi Gemini phân tích phác đồ...");

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `Bạn là Chuyên gia Bảo vệ Thực vật chuyên về cây trà (Camellia sinensis).
  
Dữ liệu chẩn đoán sơ bộ từ máy học: ${hfPredictions}

Nhiệm vụ:
1. Nhìn vào hình ảnh và kết quả sơ bộ để đưa ra chẩn đoán cuối cùng.
2. Nếu là bệnh, hãy liệt kê hoạt chất đặc trị mạnh nhất hiện nay (ưu tiên các loại phổ biến ở Việt Nam).
3. Trả về kết quả hoàn toàn bằng tiếng Việt chuyên ngành.`;

  const geminiResponse = await fetch(geminiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: "image/jpeg", data: base64Data } }
        ]
      }],
      generationConfig: { temperature: 0.1 },
      tools: [{
        function_declarations: [{
          name: "analyze_tea_leaf",
          description: "Phân tích bệnh trà và trả về phác đồ",
          parameters: {
            type: "object",
            properties: {
              isHealthy: { type: "boolean" },
              diseaseName: { type: "string", description: "Tên bệnh tiếng Việt + tên khoa học" },
              severity: { type: "string", enum: ["none", "mild", "moderate", "severe"] },
              symptoms: { type: "array", items: { type: "string" } },
              cause: { type: "string" },
              treatment: { 
                type: "array", 
                items: { type: "string" },
                description: "Liệt kê thuốc, liều lượng và cách phun" 
              },
              prevention: { type: "array", items: { type: "string" } },
              additionalNotes: { type: "string" }
            },
            required: ["isHealthy", "diseaseName", "severity", "treatment"]
          }
        }]
      }],
      tool_config: { function_calling_config: { mode: "ANY", allowed_function_names: ["analyze_tea_leaf"] } }
    }),
  });

  const data = await geminiResponse.json();
  const functionCall = data.candidates?.[0]?.content?.parts?.[0]?.functionCall;

  if (functionCall?.args) {
    return new Response(
      JSON.stringify(functionCall.args),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  throw new Error("Gemini không thể phản hồi đúng định dạng.");
}