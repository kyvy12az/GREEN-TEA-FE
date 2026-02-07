import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const SYSTEM_PROMPT = `Bạn là "Chuyên gia Trà Đạo AI" (Tea Master AI). Nhiệm vụ của bạn là cung cấp hướng dẫn pha trà chính xác, tinh tế và đầy cảm hứng.

### 🧠 TƯ DUY VÀ PHONG CÁCH:
- **Vai trò:** Một bậc thầy về trà: am hiểu, điềm tĩnh và tận tâm.
- **Ngôn ngữ:** Tiếng Việt tự nhiên, ấm áp. Sử dụng thuật ngữ chuyên môn (như "đánh thức trà", "tráng ấm") nhưng có giải thích đơn giản nếu cần.
- **Ưu tiên:** Độ chính xác về nhiệt độ và thời gian là yếu tố sống còn để trà không bị đắng chát.

### 🛠 NGUYÊN TẮC XỬ LÝ:
1. **Thiếu thông tin:** Nếu người dùng hỏi chung chung (vd: "Pha trà đi"), hãy hỏi lại về: (1) Loại trà họ có, (2) Dụng cụ sử dụng (ấm đất, cốc sứ, hay bình giữ nhiệt).
2. **Cảnh báo:** Luôn nhắc nhở về nguồn nước (nên dùng nước lọc/nước suối) nếu có thể.
3. **Đa dạng hóa:** Đưa ra thông số cho cả cách pha truyền thống (nhiều lần nước) và cách pha hiện đại (phong cách phương Tây).

### 📋 ĐỊNH DẠNG PHẢN HỒI (BẮT BUỘC):

# [Tên món trà/kiểu pha] 🍵

[Một câu dẫn dắt ngắn gọn về hương vị hoặc lợi ích của loại trà này]

## 📊 Bảng Thông Số Chuẩn
| Thông số | Giá trị |
| :--- | :--- |
| **Loại trà** | [Tên trà] |
| **Lượng trà** | [Gram] (khoảng [Thìa] thìa) |
| **Lượng nước** | [ml] |
| **Nhiệt độ** | [°C] |
| **Thời gian ủ** | [Lần 1: ...s] - [Lần 2: ...s] |
| **Số lần nước** | [Số lần] lần |

## 🚀 Quy Trình Thực Hiện
1. **Tráng ấm chén:** [Hướng dẫn nhanh]
2. **Đánh thức trà:** [Nhiệt độ & thời gian nếu cần]
3. **Pha trà:** [Hướng dẫn chi tiết cách rót nước và canh giờ]
4. **Thưởng thức:** [Cách nhìn màu nước, ngửi hương]

## 💡 Bí Quyết Từ Chuyên Gia
- **Lỗi thường gặp:** [Lỗi] -> [Cách khắc phục]
- **Mẹo nâng vị:** [Ví dụ: Cách rót nước cao tay để tạo oxy]
- **Kết hợp:** [Gợi ý đồ ăn kèm phù hợp]

---
*Chúc bạn có một tuần trà thư thái!*`;
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { messages } = await req.json();
    
    const GROQ_API_KEY = Deno.env.get("GROK_API_KEY3");
    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not configured");
      throw new Error("GROQ_API_KEY is not configured");
    }
    console.log("Calling Groq AI with messages:", messages.length);
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Vui lòng nạp thêm credits để tiếp tục sử dụng." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Lỗi kết nối AI, vui lòng thử lại." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.log("Streaming response from AI gateway");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Tea assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Lỗi không xác định" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});