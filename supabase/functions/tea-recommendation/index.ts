import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  origin: string | null;
  size: string | null;
  ingredients: string | null;
  brewing_instructions: string | null;
  image: string | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quizAnswers } = await req.json();

    if (!quizAnswers) {
      return new Response(
        JSON.stringify({ error: "Quiz answers are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY chua duoc cau hinh");
    }

    // Ket noi Supabase de lay danh sach san pham thuc te
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, category, origin, size, ingredients, brewing_instructions, image')
      .eq('status', 'active')
      .order('name');

    if (productsError) {
      console.error("Loi lay danh sach san pham:", productsError);
      throw new Error("Khong the lay danh sach san pham tu database");
    }

    console.log(`Da tai ${products?.length || 0} san pham tu database`);

    // Mapping category names
    const categoryNames: Record<string, string> = {
      'original': 'Tra Nguyen Chat',
      'matcha': 'Matcha',
      'teabag': 'Tra Tui Loc'
    };

    // Tao danh sach san pham cho AI
    const productList = (products || []).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: categoryNames[p.category] || p.category,
      origin: p.origin === 'vietnam' ? 'Viet Nam' : p.origin === 'japan' ? 'Nhat Ban' : 'Khac',
      size: p.size || 'Chuan',
      teaType: p.category === 'teabag' ? 'Tui loc tien loi' : p.category === 'matcha' ? 'Bot matcha' : 'Nguyen la'
    }));

    const systemPrompt = `Bạn là chuyên gia tư vấn trà tại VietNihon Tea - cửa hàng trà xanh uy tín.

Nhiệm vụ: Dựa trên sở thích của khách hàng, gợi ý 3-4 sản phẩm trà PHÙ HỢP NHẤT từ danh sách có sẵn.

Danh sách sản phẩm THỰC TẾ từ database (CHỈ chọn từ danh sách này):
${productList.map(p => `- ID: ${p.id}, Tên: ${p.name}, Giá: ${p.price.toLocaleString()}đ, Danh mục: ${p.category}, Nguồn gốc: ${p.origin}, Dạng: ${p.teaType}`).join('\n')}

Quy tắc QUAN TRỌNG:
1. CHỈ chọn sản phẩm có ID trong danh sách trên
2. Mỗi sản phẩm phải có lý do gợi ý 2-3 câu, thân thiện
3. Sử dụng TIẾNG VIỆT CÓ DẤU (ví dụ: "Trà này", "phù hợp", "tốt", "đậm đà")
4. matchScore từ 75-98 dựa trên độ phù hợp
5. Trả về CHÍNH XÁC JSON format (không markdown, không code block):
[
  {
    "id": "product_id_chính_xác_từ_danh_sách",
    "name": "Tên sản phẩm",
    "reason": "Lý do gợi ý thân thiện 2-3 câu BẰNG TIẾNG VIỆT CÓ DẤU",
    "matchScore": 95
  }
]

Lưu ý: 
- ID phải là UUID chính xác từ danh sách, không tự nghĩ ra ID mới
- Reason phải bằng tiếng Việt có dấu đầy đủ (á, à, ả, ã, ạ, â, ấ, ầ, ẩ, ẫ, ậ, ă, ắ, ằ, ẳ, ẵ, ặ...)`;

    const userPrompt = `Khách hàng có sở thích sau:
- Hương vị thích: ${quizAnswers.flavor}
- Mục tiêu sức khỏe: ${quizAnswers.healthGoal}
- Tần suất uống: ${quizAnswers.frequency}
- Thời gian uống chính: ${quizAnswers.drinkTime}
- Dạng trà thích: ${quizAnswers.teaType}

Hãy gợi ý 3-4 sản phẩm trà phù hợp nhất từ danh sách THỰC TẾ. Nhớ viết lý do bằng TIẾNG VIỆT CÓ DẤU đầy đủ.`;

    console.log("Calling Groq API...");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5,
        max_tokens: 4096,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Groq API dang qua tai, vui long thu lai sau 1 phut." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 400 || response.status === 401) {
        return new Response(
          JSON.stringify({ error: "GROQ_API_KEY khong hop le. Vui long kiem tra cau hinh." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`Groq API error ${response.status}: ${errorText}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Khong co noi dung tu AI response");
    }

    console.log("Groq Response:", content);

    // Parse JSON from AI response
    let recommendations;
    try {
      // Loai bo markdown code blocks neu co
      let jsonText = content.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*\n?/, '').replace(/\n?```\s*$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*\n?/, '').replace(/\n?```\s*$/, '');
      }
      
      // Try to extract JSON array
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Khong tim thay JSON array trong response");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Fallback: lay 3 san pham dau tien
      recommendations = productList.slice(0, 3).map((p, index) => ({
        id: p.id,
        name: p.name,
        reason: `Sản phẩm ${index === 0 ? 'phổ biến' : index === 1 ? 'chất lượng' : 'giá tốt'} nhất của chúng tôi. Phù hợp với nhiều khách hàng.`,
        matchScore: 85 - (index * 5)
      }));
    }

    // Validate va enrich recommendations voi du lieu thuc te tu database
    const enrichedRecommendations = recommendations
      .map((rec: { id: string; reason: string; matchScore: number; name?: string }) => {
        const product = products?.find(p => p.id === rec.id);
        if (product) {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            reason: rec.reason,
            matchScore: rec.matchScore,
            category: product.category,
            image: product.image,
          };
        }
        return null;
      })
      .filter((rec): rec is NonNullable<typeof rec> => rec !== null);

    console.log(`Groq AI goi y ${enrichedRecommendations.length} san pham`);

    return new Response(
      JSON.stringify({ 
        recommendations: enrichedRecommendations,
        quizAnswers 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error in tea-recommendation:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Da co loi xay ra, vui long thu lai." 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
