export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Lợi Ích Tuyệt Vời Của Trà Xanh Cho Sức Khỏe',
    slug: '10-loi-ich-cua-tra-xanh',
    excerpt: 'Khám phá những lợi ích sức khỏe đáng kinh ngạc của trà xanh, từ hỗ trợ giảm cân đến cải thiện chức năng não.',
    content: `
      <h2>1. Giàu chất chống oxy hóa</h2>
      <p>Trà xanh chứa nhiều polyphenol, đặc biệt là catechin EGCG - một trong những chất chống oxy hóa mạnh nhất. Các chất này giúp bảo vệ tế bào khỏi sự hư hại của các gốc tự do, từ đó làm chậm quá trình lão hóa và giảm nguy cơ mắc nhiều bệnh mãn tính.</p>
      
      <h2>2. Cải thiện chức năng não</h2>
      <p>Caffeine trong trà xanh kết hợp với L-theanine tạo ra hiệu ứng tỉnh táo nhưng không gây hồi hộp như cà phê. Nghiên cứu cho thấy sự kết hợp này giúp cải thiện trí nhớ, tăng cường khả năng tập trung và nâng cao hiệu suất công việc.</p>
      
      <h2>3. Hỗ trợ giảm cân</h2>
      <p>Trà xanh đã được chứng minh là tăng cường trao đổi chất và thúc đẩy quá trình đốt cháy chất béo. Các nghiên cứu cho thấy uống trà xanh thường xuyên có thể giúp giảm mỡ bụng và hỗ trợ kiểm soát cân nặng hiệu quả.</p>
      
      <h2>4. Bảo vệ tim mạch</h2>
      <p>Uống trà xanh thường xuyên giúp giảm cholesterol xấu (LDL) và triglyceride, đồng thời tăng cholesterol tốt (HDL). Điều này giúp giảm nguy cơ mắc bệnh tim mạch và đột quỵ.</p>
      
      <h2>5. Ổn định đường huyết</h2>
      <p>Trà xanh giúp cải thiện độ nhạy insulin và điều hòa lượng đường trong máu, đặc biệt có lợi cho người tiền tiểu đường và tiểu đường type 2.</p>
      
      <h2>6. Tốt cho sức khỏe răng miệng</h2>
      <p>Catechin trong trà xanh có khả năng tiêu diệt vi khuẩn và ức chế virus, giúp giảm nguy cơ nhiễm trùng và cải thiện sức khỏe răng miệng.</p>
      
      <h2>7. Chống viêm và nhiễm trùng</h2>
      <p>Các hợp chất trong trà xanh có đặc tính kháng viêm mạnh, giúp giảm viêm trong cơ thể và hỗ trợ hệ miễn dịch chống lại các tác nhân gây bệnh.</p>
      
      <h2>8. Làm đẹp da</h2>
      <p>Chất chống oxy hóa trong trà xanh giúp bảo vệ da khỏi tác hại của tia UV, giảm mụn và làm chậm quá trình lão hóa da. Nhiều sản phẩm chăm sóc da cao cấp sử dụng chiết xuất trà xanh làm thành phần chính.</p>
      
      <h2>9. Giảm stress và thư giãn</h2>
      <p>L-theanine trong trà xanh có tác dụng thư giãn, giảm lo âu và cải thiện tâm trạng. Uống một tách trà xanh giúp bạn bình tĩnh và tập trung hơn.</p>
      
      <h2>10. Tăng cường tuổi thọ</h2>
      <p>Với tất cả những lợi ích kể trên, không ngạc nhiên khi nghiên cứu cho thấy những người uống trà xanh thường xuyên có tuổi thọ cao hơn và ít mắc các bệnh mãn tính hơn.</p>
    `,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80',
    author: 'Nguyễn Minh Anh',
    date: '2024-01-15',
    category: 'Sức khỏe',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Cách Pha Trà Xanh Đúng Chuẩn Nhật Bản',
    slug: 'cach-pha-tra-xanh-nhat-ban',
    excerpt: 'Hướng dẫn chi tiết cách pha trà xanh theo phong cách Nhật Bản để có được hương vị hoàn hảo nhất.',
    content: `
      <h2>Giới thiệu về nghệ thuật pha trà Nhật Bản</h2>
      <p>Trà đạo Nhật Bản (Chadō hoặc Sadō) là một nghệ thuật văn hóa với lịch sử hàng trăm năm. Việc pha trà không chỉ là kỹ thuật mà còn là thiền định, là cách để tìm kiếm sự thanh tịnh trong tâm hồn.</p>
      
      <h2>Dụng cụ cần chuẩn bị</h2>
      <p><strong>Chawan</strong> - Bát trà: Là dụng cụ quan trọng nhất, thường làm từ gốm với thiết kế đơn giản nhưng tinh tế.</p>
      <p><strong>Chasen</strong> - Chổi tre: Dùng để đánh tan bột matcha, tạo bọt mịn. Một chiếc chasen tốt có từ 80-120 nan tre.</p>
      <p><strong>Chashaku</strong> - Muỗng tre: Dùng để múc bột trà, thường làm từ một đoạn tre nguyên khối.</p>
      
      <h2>Quy trình pha trà Sencha</h2>
      <p><strong>Bước 1:</strong> Đun nước và để nguội xuống 70-80°C. Nước quá nóng sẽ làm trà bị đắng.</p>
      <p><strong>Bước 2:</strong> Cho 2-3g trà vào ấm, tưới nước nóng vào.</p>
      <p><strong>Bước 3:</strong> Đậy nắp và chờ 1-2 phút.</p>
      <p><strong>Bước 4:</strong> Rót trà vào chén, phân bổ đều để đảm bảo mỗi chén có hương vị như nhau.</p>
      
      <h2>Quy trình pha Matcha</h2>
      <p><strong>Bước 1:</strong> Làm nóng bát trà bằng nước nóng, lau khô.</p>
      <p><strong>Bước 2:</strong> Rây 1-2 thìa bột matcha vào bát để tránh vón cục.</p>
      <p><strong>Bước 3:</strong> Thêm 70ml nước 70-80°C.</p>
      <p><strong>Bước 4:</strong> Dùng chasen đánh theo hình chữ W nhanh và đều tay trong 15-20 giây cho đến khi tạo lớp bọt mịn.</p>
      
      <h2>Mẹo để có tách trà hoàn hảo</h2>
      <p>- Luôn sử dụng nước tinh khiết, tránh nước máy có clo.</p>
      <p>- Kiểm soát nhiệt độ nước chính xác - đây là yếu tố quan trọng nhất.</p>
      <p>- Bảo quản trà đúng cách trong hộp kín, tránh ánh sáng và độ ẩm.</p>
      <p>- Thưởng thức trà ngay sau khi pha để có hương vị tốt nhất.</p>
    `,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
    author: 'Trần Văn Hùng',
    date: '2024-01-10',
    category: 'Hướng dẫn',
    readTime: 8,
  },
  {
    id: '3',
    title: 'Sự Khác Biệt Giữa Matcha và Trà Xanh Thường',
    slug: 'su-khac-biet-matcha-tra-xanh',
    excerpt: 'Tìm hiểu những điểm khác biệt cơ bản giữa matcha và trà xanh thông thường về quy trình sản xuất và lợi ích.',
    content: `
      <h2>Nguồn gốc và quy trình trồng trọt</h2>
      <p>Cả matcha và trà xanh thông thường đều được làm từ cây Camellia sinensis, nhưng quy trình trồng và chế biến hoàn toàn khác nhau.</p>
      <p><strong>Trà xanh thường:</strong> Được trồng dưới ánh nắng trực tiếp, lá trà được hái và chế biến thành dạng lá khô hoặc túi lọc.</p>
      <p><strong>Matcha:</strong> Khoảng 3-4 tuần trước thu hoạch, cây trà được che phủ để giảm ánh sáng mặt trời. Điều này làm tăng hàm lượng chlorophyll và L-theanine, tạo ra màu xanh đậm đặc trưng và vị ngọt thanh.</p>
      
      <h2>Quy trình chế biến</h2>
      <p><strong>Trà xanh:</strong> Lá được hấp hoặc rang để ngăn quá trình oxy hóa, sau đó cuộn và sấy khô.</p>
      <p><strong>Matcha:</strong> Sau khi hấp, lá được sấy khô và tách bỏ gân lá, thân lá. Phần lá còn lại (tencha) được nghiền mịn bằng cối đá thành bột với tốc độ rất chậm để giữ nguyên chất lượng.</p>
      
      <h2>Hàm lượng dinh dưỡng</h2>
      <p>Vì khi uống matcha, bạn tiêu thụ toàn bộ lá trà đã nghiền, nên hàm lượng dinh dưỡng cao hơn nhiều so với trà xanh thường:</p>
      <p>- EGCG (chất chống oxy hóa): Matcha cao gấp 3 lần</p>
      <p>- Caffeine: Matcha ~70mg/cốc, trà xanh ~35mg/cốc</p>
      <p>- L-theanine: Matcha cao gấp 5 lần</p>
      
      <h2>Hương vị</h2>
      <p><strong>Trà xanh:</strong> Vị thanh nhẹ, có thể hơi đắng nhẹ nếu pha ở nhiệt độ quá cao.</p>
      <p><strong>Matcha:</strong> Vị đậm đà, ngọt thanh, có hậu vị umami đặc trưng. Matcha chất lượng cao sẽ có vị ngọt tự nhiên mà không cần thêm đường.</p>
      
      <h2>Cách sử dụng</h2>
      <p>Trà xanh thường được pha như trà truyền thống, trong khi matcha có thể pha trực tiếp hoặc sử dụng trong nhiều món ăn, thức uống như latte, smoothie, bánh ngọt, kem...</p>
    `,
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=800&q=80',
    author: 'Lê Thị Hương',
    date: '2024-01-05',
    category: 'Kiến thức',
    readTime: 6,
  },
  {
    id: '4',
    title: 'Vùng Trà Thái Nguyên - Lịch Sử và Văn Hóa',
    slug: 'vung-tra-thai-nguyen',
    excerpt: 'Khám phá lịch sử hàng trăm năm của vùng trà nổi tiếng nhất Việt Nam và văn hóa thưởng trà đặc sắc.',
    content: `
      <h2>Thái Nguyên - Thủ phủ trà Việt Nam</h2>
      <p>Thái Nguyên là tỉnh miền núi phía Bắc Việt Nam, được mệnh danh là "Thủ phủ trà" của cả nước. Với điều kiện khí hậu, thổ nhưỡng lý tưởng, nơi đây đã sản xuất trà từ hàng trăm năm trước và hiện chiếm hơn 40% sản lượng trà cả nước.</p>
      
      <h2>Lịch sử hình thành</h2>
      <p>Trà được du nhập vào Thái Nguyên từ đầu thế kỷ 20 bởi người Pháp. Tuy nhiên, chính người dân bản địa đã phát triển và hoàn thiện kỹ thuật trồng, chế biến trà theo phương pháp truyền thống độc đáo.</p>
      <p>Sau năm 1954, ngành trà Thái Nguyên được đầu tư phát triển mạnh với nhiều nông trường lớn. Đến nay, trà Thái Nguyên đã trở thành thương hiệu quốc gia, được xuất khẩu đến nhiều nước trên thế giới.</p>
      
      <h2>Đặc điểm vùng trà</h2>
      <p><strong>Khí hậu:</strong> Nhiệt độ trung bình 22-27°C, độ ẩm cao 80-85%, rất phù hợp cho cây trà phát triển.</p>
      <p><strong>Thổ nhưỡng:</strong> Đất feralit đỏ vàng, giàu dinh dưỡng, thoát nước tốt.</p>
      <p><strong>Độ cao:</strong> Vùng trồng trà nằm ở độ cao 200-400m so với mực nước biển.</p>
      
      <h2>Các vùng trà nổi tiếng</h2>
      <p><strong>Tân Cương:</strong> Vùng trà nổi tiếng nhất, nằm cách trung tâm thành phố Thái Nguyên khoảng 10km. Trà Tân Cương được đánh giá là ngon nhất với hương thơm đặc trưng và vị đậm đà.</p>
      <p><strong>La Bằng:</strong> Nổi tiếng với trà búp tím, một giống trà quý hiếm có hàm lượng anthocyanin cao.</p>
      <p><strong>Trại Cài:</strong> Vùng trà cổ với những cây trà hàng chục năm tuổi, cho ra sản phẩm có hương vị đặc biệt.</p>
      
      <h2>Văn hóa uống trà</h2>
      <p>Người Thái Nguyên có câu "Trà tam, rượu tứ" - uống trà thì 3 người, uống rượu thì 4 người. Trà là thức uống không thể thiếu trong các dịp quan trọng: tiếp khách, cưới hỏi, giỗ chạp...</p>
      <p>Nghệ thuật pha trà ở đây cũng rất cầu kỳ: phải tráng ấm trước, châm nước sôi vừa đủ, chờ đúng thời gian rồi mới rót. Người sành trà có thể nhận ra ngay trà Thái Nguyên chính hiệu chỉ qua hương thơm.</p>
    `,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
    author: 'Phạm Đức Thành',
    date: '2023-12-28',
    category: 'Văn hóa',
    readTime: 10,
  },
  {
    id: '5',
    title: 'Trà Xanh Và Làm Đẹp - Bí Quyết Từ Thiên Nhiên',
    slug: 'tra-xanh-lam-dep',
    excerpt: 'Những công dụng làm đẹp tuyệt vời của trà xanh và cách sử dụng trà xanh trong chăm sóc da hàng ngày.',
    content: `
      <h2>Trà xanh - Siêu thực phẩm cho làn da</h2>
      <p>Trà xanh từ lâu đã được biết đến như một nguyên liệu làm đẹp tự nhiên tuyệt vời. Với hàm lượng chất chống oxy hóa cao, trà xanh giúp bảo vệ da khỏi các tác nhân gây hại và duy trì vẻ tươi trẻ.</p>
      
      <h2>Công dụng của trà xanh cho da</h2>
      <p><strong>Chống lão hóa:</strong> EGCG trong trà xanh trung hòa các gốc tự do, ngăn chặn sự phân hủy collagen và elastin - hai protein quan trọng giúp da săn chắc và đàn hồi.</p>
      <p><strong>Giảm mụn:</strong> Đặc tính kháng khuẩn và chống viêm của trà xanh giúp giảm viêm, thu nhỏ lỗ chân lông và kiểm soát bã nhờn.</p>
      <p><strong>Làm sáng da:</strong> Trà xanh ức chế enzyme tyrosinase, từ đó giảm sản xuất melanin và làm mờ các vết thâm, nám.</p>
      <p><strong>Bảo vệ khỏi tia UV:</strong> Các polyphenol trong trà xanh hoạt động như một lớp bảo vệ tự nhiên chống lại tác hại của ánh nắng mặt trời.</p>
      
      <h2>Mặt nạ trà xanh tại nhà</h2>
      <h3>Mặt nạ trà xanh + mật ong</h3>
      <p>- 1 thìa bột trà xanh (hoặc matcha)</p>
      <p>- 1 thìa mật ong nguyên chất</p>
      <p>Trộn đều và thoa lên mặt 15-20 phút, rửa sạch với nước ấm. Công thức này phù hợp với da khô và nhạy cảm.</p>
      
      <h3>Mặt nạ trà xanh + sữa chua</h3>
      <p>- 1 thìa bột trà xanh</p>
      <p>- 2 thìa sữa chua không đường</p>
      <p>Thích hợp cho da dầu và mụn. Acid lactic trong sữa chua giúp tẩy tế bào chết nhẹ nhàng.</p>
      
      <h2>Toner trà xanh DIY</h2>
      <p>Pha trà xanh đậm, để nguội và cho vào bình xịt. Bảo quản trong tủ lạnh và sử dụng trong 1 tuần. Xịt lên mặt sau khi rửa mặt để se khít lỗ chân lông và cấp ẩm.</p>
      
      <h2>Uống trà xanh để đẹp da từ bên trong</h2>
      <p>Ngoài việc sử dụng bên ngoài, uống 2-3 tách trà xanh mỗi ngày cũng giúp làn da khỏe mạnh từ bên trong. Lưu ý không uống trà xanh quá đậm hoặc khi đói để tránh ảnh hưởng đến dạ dày.</p>
    `,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80',
    author: 'Nguyễn Thị Mai',
    date: '2023-12-20',
    category: 'Làm đẹp',
    readTime: 7,
  },
  {
    id: '6',
    title: 'Cách Bảo Quản Trà Xanh Đúng Cách',
    slug: 'cach-bao-quan-tra-xanh',
    excerpt: 'Hướng dẫn bảo quản trà xanh đúng cách để giữ nguyên hương vị và chất lượng trong thời gian dài.',
    content: `
      <h2>Tại sao bảo quản trà đúng cách quan trọng?</h2>
      <p>Trà xanh là sản phẩm nhạy cảm với môi trường. Nếu không bảo quản đúng cách, trà sẽ nhanh chóng mất hương vị, phai màu và giảm chất lượng. Các yếu tố chính ảnh hưởng đến trà bao gồm: ánh sáng, độ ẩm, không khí, nhiệt độ và mùi lạ.</p>
      
      <h2>5 nguyên tắc bảo quản trà</h2>
      <p><strong>1. Tránh ánh sáng:</strong> Ánh sáng, đặc biệt là tia UV, phá hủy các chất chống oxy hóa trong trà. Luôn giữ trà trong hộp kín không trong suốt.</p>
      <p><strong>2. Kiểm soát độ ẩm:</strong> Độ ẩm làm trà ẩm mốc và mất hương. Lý tưởng nhất là giữ trà ở môi trường có độ ẩm dưới 50%.</p>
      <p><strong>3. Cách ly không khí:</strong> Oxy gây oxy hóa và làm trà mất hương vị. Sử dụng hộp có nắp kín hoặc túi hút chân không.</p>
      <p><strong>4. Nhiệt độ phù hợp:</strong> Nhiệt độ cao đẩy nhanh quá trình phân hủy. Bảo quản trà ở nhiệt độ mát, ổn định (15-25°C).</p>
      <p><strong>5. Tránh mùi lạ:</strong> Trà rất dễ hấp thụ mùi từ môi trường xung quanh. Không để trà gần gia vị, mỹ phẩm hoặc thực phẩm có mùi mạnh.</p>
      
      <h2>Dụng cụ bảo quản trà</h2>
      <p><strong>Hộp thiếc:</strong> Lựa chọn phổ biến và hiệu quả, cản sáng tốt và đóng kín.</p>
      <p><strong>Hộp gốm:</strong> Đẹp mắt và truyền thống, thích hợp để trưng bày.</p>
      <p><strong>Túi nhôm kín:</strong> Tiện lợi, nhẹ và cản sáng tốt.</p>
      <p><strong>Hộp thủy tinh:</strong> Chỉ nên dùng nếu để trong tủ kín, tránh ánh sáng.</p>
      
      <h2>Có nên bảo quản trà trong tủ lạnh?</h2>
      <p>Đối với trà thường uống trong 1-2 tháng: Không cần thiết, chỉ cần bảo quản ở nơi khô ráo, thoáng mát.</p>
      <p>Đối với trà muốn giữ lâu hơn (matcha, trà cao cấp): Có thể bảo quản trong tủ lạnh hoặc tủ đông, nhưng phải đảm bảo hộp kín 100% để tránh hấp thụ mùi và độ ẩm.</p>
      <p><strong>Lưu ý:</strong> Khi lấy trà từ tủ lạnh ra, để nguyên hộp ở nhiệt độ phòng 30 phút trước khi mở để tránh đọng sương.</p>
      
      <h2>Thời hạn sử dụng</h2>
      <p>- Trà xanh lá: 6-12 tháng</p>
      <p>- Matcha: 3-6 tháng (sau khi mở)</p>
      <p>- Trà túi lọc: 12-18 tháng</p>
      <p>Sau thời hạn này, trà vẫn có thể uống được nhưng chất lượng sẽ giảm đáng kể.</p>
    `,
    image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80',
    author: 'Trần Minh Đức',
    date: '2023-12-15',
    category: 'Hướng dẫn',
    readTime: 4,
  },
];

export const getBlogBySlug = (slug: string) => blogPosts.find(b => b.slug === slug);
