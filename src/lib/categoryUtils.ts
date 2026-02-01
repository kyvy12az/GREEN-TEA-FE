// Map category slug to Vietnamese display name
export const categoryMap: Record<string, string> = {
  'kien-thuc': 'Kiến thức trà',
  'cong-thuc': 'Công thức pha trà',
  'suc-khoe': 'Sức khỏe',
  'tin-tuc': 'Tin tức',
};

// Get category display name from slug
export const getCategoryName = (slug: string | null | undefined): string => {
  if (!slug) return '';
  return categoryMap[slug] || slug;
};
