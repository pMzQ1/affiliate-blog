import { Post } from '@/lib/types';

interface CategoryBadgeProps {
  postType: Post['post_type'];
}

const labels: Record<Post['post_type'], string> = {
  top10_gifts: 'Cadeaus',
  tech_gadgets: 'Tech',
  kids_family: 'Kinderen',
  review: 'Review',
};

export default function CategoryBadge({ postType }: CategoryBadgeProps) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-[#6C63FF]">
      {labels[postType]}
    </span>
  );
}
